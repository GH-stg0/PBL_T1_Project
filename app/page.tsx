import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Image from 'next/image';

export default function Home() {
  return (
    // 全体の背景色とレイアウト調整
    <main className="min-h-screen bg-gray-100 flex justify-center items-start">
      {/* モバイルアプリ風のコンテナ */}
      <div className="w-full max-w-md bg-app-bg min-h-screen shadow-xl relative pb-24">
        <Header />
        <div className="px-4 py-6">
          <SearchForm />
        </div>
        <div className="flex justify-center mt-8">
          <Image
            src="/images/icon.png"
            alt="icon"
            width={320}
            height={320}
            priority
          />
        </div>
      </div>
      <div className="flex justify-center mt-4"></div>
    </main>
  );
}