import { db } from '@/lib/db';
import bcrypt from 'bcryptjs'; // bcrypt import edildi

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, password } = req.body;

    // Şifreyi hash'liyoruz
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Kullanıcıyı email ve hashlenmiş şifre ile kaydediyoruz
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword, // Şifreyi hashlenmiş şekilde kaydediyoruz
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
