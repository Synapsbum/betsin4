/* eslint-disable @next/next/no-img-element */
import GithubStar from '@/components/utils/github-star';
import { GithubIcon, GlobeIcon, TwitterIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useSession } from 'next-auth/react';

export const metadata = {
  title: 'Giriş.bio',
  description:
    'Size veya İşletmenize ait linkleri kolayca düzenleyip yayınlayın. Tamamen Ücretsiz!',
};

const Home = () => {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated' ? true : false;

  return (
    <>
      <Head>
        <title>Giriş.bio | Ücretsiz Link Yönetim Uygulaması</title>
        {/* <!-- Open Graph (OG) meta tags --> */}
        <meta property="og:url" content="https://giris.bio/" />
        <meta property="og:url" content="https://giris.bio/" />
        <meta property="og:url" content="https://www.giris.bio/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Giriş.bio | Ücretsiz Link Yönetim Uygulaması"
        />
        <meta property="og:title" content="Giriş.bio" />
        <meta
          property="og:description"
          content="Kendi Bio sayfanı hemen oluştur. Üstelik tamamen Ücretsiz!"
        />
        <meta
          property="og:image"
          itemprop="image"
          content="https://giris.bio/og2.png"
        />
        <meta
          property="og:image"
          itemprop="image"
          content="https://giris.bio/og2.png"
        />
        <meta
          property="og:image"
          itemprop="image"
          content="https://www.giris.bio/og2.png"
        />

        {/* <!-- Twitter Card meta tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Giriş.bio" />
        <meta name="twitter:creator" content="Betsin" />
        <meta
          property="twitter:domain"
          content="https://www.giris.bio/"
        />
        <meta property="twitter:domain" content="https://www.giris.bio/" />
        <meta property="twitter:domain" content="https://www.giris.bio/" />
        <meta property="twitter:url" content="https://www.giris.bio/" />
        <meta name="twitter:title" content="Giriş.bio" />
        <meta
          name="twitter:description"
          content="Kendi Bio sayfanı hemen oluştur. Üstelik tamamen Ücretsiz!"
        />
        <meta
          name="twitter:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta name="twitter:image" content="https://www.giris.bio/og2.png" />
        <meta name="twitter:image" content="https://www.giris.bio/og2.png" />
        <meta
          data-rh="true"
          name="twitter:image:alt"
          content="Kendi Bio sayfanı hemen oluştur. Üstelik tamamen Ücretsiz!"
        />

        {/* <!-- LinkedIn meta tags --> */}
        <meta
          property="og:linkedin:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta
          property="og:linkedin:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta
          property="og:linkedin:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta property="og:linkedin:title" content="Giris.bio" />
        <meta
          property="og:linkedin:description"
          content="Kendi Bio sayfanı hemen oluştur. Üstelik tamamen Ücretsiz!"
        />

        {/* <!-- Facebook meta tags --> */}
        <meta
          property="og:facebook:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta
          property="og:facebook:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta
          property="og:facebook:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta property="og:facebook:title" content="Giris.bio" />
        <meta
          property="og:facebook:description"
          content="Kendi Bio sayfanı hemen oluştur. Üstelik tamamen Ücretsiz!"
        />

        {/* <!-- Instagram meta tags --> */}
        <meta
          property="og:instagram:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta
          property="og:instagram:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta
          property="og:instagram:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta property="og:instagram:title" content="Giris.bio" />
        <meta
          property="og:instagram:description"
          content="Kendi Bio sayfanı hemen oluştur. Üstelik tamamen Ücretsiz!"
        />

        {/* <!-- Pinterest meta tags --> */}
        <meta
          property="og:pinterest:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta
          property="og:pinterest:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta
          property="og:pinterest:image"
          content="https://www.giris.bio/og2.png"
        />
        <meta property="og:pinterest:title" content="Giris.bio" />
        <meta
          property="og:pinterest:description"
          content="Kendi Bio sayfanı hemen oluştur. Üstelik tamamen Ücretsiz!"
        />
      </Head>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-y-0 w-full h-full"
            aria-hidden="true"
          ></div>
          <div className="relative pt-6 pb-16 sm:pb-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6">
              <nav
                className="relative flex items-center justify-between md:justify-start"
                aria-label="Global"
              >
                <Link
                  className="flex items-center gap-2 font-bold text-xl"
                  href="/"
                >
                  <h3 className="lg:block">Giriş.bio</h3>
                </Link>

                <div className="relative items-center w-28 z-10 md:absolute md:inset-y-0 md:right-0">
                  <Link
                    className="group inline-flex items-center gap-2 px-4 text-sm  bg-slate-900 border rounded-3xl text-white w-[116px] h-[35px] justify-center font-semibold transition-colors hover:bg-slate-700"
                    rel="noopener noreferrer"
                    href="/admin"
                  >
                    {isAuthenticated ? 'Admin' : 'Giriş Yap'}
                  </Link>
                </div>
              </nav>
            </div>
            <div className="px-4 mx-auto mt-24 max-w-7xl sm:mt-16 sm:px-6">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Tüm linkleriniz için</span>
                  <span className="hero-title block ">Giriş.bio</span>
                </h1>
                <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Size veya İşletmenize ait linkleri kolayca düzenleyip yayınlayın. Tamamen Ücretsiz!
                </p>
              </div>
              <div className="flex justify-center mt-6">
                <div className="flex flex-col items-center">
                  <span className="inline-flex rounded-xl shadow">
                    <Link legacyBehavior href="/register">
                      <a className="inline-flex items-center px-4 py-2 font-medium text-lg gradient-btn border border-transparent rounded-xl text-white w-[190px] h-[50px] justify-center hover:shadow-lg">
                        Hemen Başla
                      </a>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex flex-col" aria-hidden="true">
              <div className="flex-1" />
              <div className="flex-1 w-full bg-slate-900 " />
            </div>
            <div className="px-4 mx-auto max-w-7xl sm:px-6">
              <Image
                className="relative rounded-lg shadow-lg"
                src="/assets/new_shot.png"
                alt="App screenshot"
                height={700}
                width={1200}
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-900">
          <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold tracking-wide text-center text-gray-400">
              <a
                className="hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
                href="https://betsin.link"
              >
                Betsin
              </a> tarafından geliştirilmiştir.
            </h2>
            <div className="flex items-center gap-4 justify-center mt-4">
              <a
                href="https://betsin.link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="twitter logo"
              >
                <TwitterIcon color="white" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="github logo"
              >
                <GithubIcon color="white" />
              </a>
              <a
                href="https://betsin.link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="insta logo"
              >
                <GlobeIcon color="white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
