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
  const searchParams = useSearchParams();
  const next = searchParams?.get('next');

  useEffect(() => {
    const error = searchParams?.get('error');
    error && toast.error(error);
  }, [searchParams]);

  return (
    <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
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
