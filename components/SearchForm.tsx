"use client";

import { useState } from 'react';
import CategoryInput from './CategoryInput';

export default function SearchForm() {
  // ▼ 変更点: 配列で管理する
  const [categories, setCategories] = useState<string[]>([]);
  
  const [dateStr, setDateStr] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateStr(e.target.value);
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    try {
      const target = e.currentTarget as any;
      if (typeof target.showPicker === 'function') {
        target.showPicker();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const SearchIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );

  return (
    <div className="space-y-6 text-gray-700">
      
      {/* カテゴリーセクション */}
      <section>
        {/* ▼ Props名と型を変更 */}
        <CategoryInput 
          selectedCategories={categories} 
          onChange={setCategories} 
        />
      </section>

      <hr className="border-gray-400" />

      {/* 発見場所セクション (変更なし) */}
      <section>
        <h2 className="font-bold mb-2 ml-1">発見場所</h2>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon className="w-5 h-5" />
          </div>
          <select className="w-full appearance-none bg-app-input border border-gray-400 rounded-full py-2 pl-10 pr-10 text-gray-700 focus:outline-none">
            <option>すべて</option>
            <option>N棟</option>
            <option>E棟</option>
            <option>S棟</option>
            <option>食堂</option>
            <option>R3</option>
            <option>R4</option>
            <option>体育館</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* 発見日時セクション (変更なし) */}
      <section>
        <h2 className="font-bold mb-2 ml-1">発見日時</h2>
        <div className="relative w-full">
          <input
            type="date"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={handleDateChange}
            onClick={handleInputClick}
            value={dateStr}
          />
          <div className="w-full flex items-center bg-app-input border border-gray-400 rounded-full py-2 px-3 text-gray-600 shadow-sm pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-3 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span>{dateStr ? dateStr.replace(/-/g, '/') : "カレンダーから選択"}</span>
          </div>
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* 検索ボタン */}
      <div className="pt-4 flex justify-center">
        <button 
          className="bg-app-blue w-4/5 py-3 rounded-full shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition"
          // クリック時に categories 配列をログ出力などで確認できます
          onClick={() => console.log("検索条件:", { categories, location: "N棟", dateStr })}
        >
          <SearchIcon className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-bold">この条件で検索</span>
        </button>
      </div>

    </div>
  );
}