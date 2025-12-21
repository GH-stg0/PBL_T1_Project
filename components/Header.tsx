import Link from "next/link";

export default function Header() {
  return (
    <header className="relative bg-app-green px-4 py-6 rounded-b-sm shadow-sm">
      {/* 管理者ログインリンク（右上） */}
      <div className="absolute right-4 top-4">
        <Link 
          href="/login" 
          className="text-sm text-gray-700 hover:underline"
        >
          管理者ログイン
        </Link>
      </div>

      <h1 className="text-center text-xl font-bold text-gray-800 mb-4 tracking-wide">
        落とし物検索
      </h1>
      
      {/* キーワード検索バー */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        
        <input 
          type="text" 
          placeholder="キーワード検索" 
          className="w-full bg-white/60 border border-gray-300 rounded-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
    </header>
  );
}
