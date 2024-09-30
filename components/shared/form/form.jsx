import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import LoadingDots from '@/components/utils/loading-dots';
import Link from 'next/link';
import GoogleIcon from '@/components/utils/google-icon';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Share2, GithubIcon } from 'lucide-react';

export default function Form({ type }) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isCredentialsLoading, setIsCredentialsLoading] = useState(false); // Yeni eklendi
  const [email, setEmail] = useState(""); // Yeni eklendi
  const [password, setPassword] = useState(""); // Yeni eklendi
  const searchParams = useSearchParams();
  const next = searchParams?.get('next');

  useEffect(() => {
    const error = searchParams?.get('error');
    error && toast.error(error);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCredentialsLoading(true); // Giriş işlemi başladığında yükleme durumu
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    setIsCredentialsLoading(false); // Giriş tamamlandığında yükleme durumu biter

    if (res?.error) {
      toast.error(res.error); // Hata varsa gösterilir
    } else {
      window.location.href = next || '/'; // Başarılı girişte yönlendirme yapılır
    }
  };

  return (
    <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
      {type === 'login' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className={`${
              isCredentialsLoading
                ? 'cursor-not-allowed border-gray-200 bg-gray-100'
                : 'border-black bg-black text-white hover:bg-white hover:text-black'
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {isCredentialsLoading ? <LoadingDots color="#808080" /> : 'Giriş Yap'}
          </button>
        </form>
      )}

      <button
        onClick={() => {
          setIsGoogleLoading(true);
          signIn('google', {
            ...(next && next.length > 0 ? { callbackUrl: next } : {}),
          });
        }}
        className={`${
          isGoogleLoading
            ? 'cursor-not-allowed border-gray-200 bg-gray-100'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {isGoogleLoading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p className="flex gap-2 items-center font-semibold">
            <GoogleIcon /> Continue with Google
          </p>
        )}
      </button>
      <button
        onClick={() => {
          setIsGithubLoading(true);
          signIn('github', {
            ...(next && next.length > 0 ? { callbackUrl: next } : {}),
          });
        }}
        className={`${
          isGithubLoading
            ? 'cursor-not-allowed border-gray-200 bg-gray-100'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {isGithubLoading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p className="flex gap-2 items-center font-semibold">
            <GithubIcon /> Continue with Github
          </p>
        )}
      </button>

      {type === 'login' ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-gray-800">
            Sign up
          </Link>
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}
