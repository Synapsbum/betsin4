import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs'; // Şifre karşılaştırma için
import NextAuth from 'next-auth/next';
import { nanoid } from 'nanoid';

export const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    newUser: '/onboarding',
    signIn: '/login',
    error: '/login',
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.DEV_GITHUB_CLIENT_ID,
      clientSecret: process.env.DEV_GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "text", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Kullanıcıyı email ile MongoDB'de bul
        const user = await db.user.findFirst({
          where: {
            email: credentials.username,
          },
        });

        if (!user) {
          // Kullanıcı bulunamadıysa hata döndür
          throw new Error("Kullanıcı bulunamadı.");
        }

        // Şifreyi karşılaştır
        const isValid = bcrypt.compareSync(credentials.password, user.password);

        if (!isValid) {
          // Şifre yanlışsa hata döndür
          throw new Error("Yanlış şifre.");
        }

        // Kullanıcı doğrulandıysa kullanıcıyı döndür
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.handle = token.handle;
      }
      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      if (!dbUser.handle) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            handle: nanoid(10),
          },
        });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        handle: dbUser.handle,
        buttonStyle: dbUser.buttonStyle,
        themePalette: dbUser.themePalette,
      };
    },

    redirect() {
      return '/admin';
    },
  },
};

export default NextAuth(authOptions);
