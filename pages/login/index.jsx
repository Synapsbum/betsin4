import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Wand } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      setMessage(res.data.message);

      // Oturumu başlatmak için token'ı local storage'da sakla
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard'); // Giriş başarılıysa yönlendirme
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Bir hata oluştu');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Giriş Yap</title>
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Hesabına Giriş Yap</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Giriş Yap
          </button>
        </form>
        <p className="mt-4">
          Henüz bir hesabınız yok mu?{' '}
          <Link href="/register">
            <a className="text-blue-500">Kayıt Ol</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
