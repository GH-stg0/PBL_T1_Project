"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

export default function SearchForm() {
  const router = useRouter();

  const [date, setDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // SVGコンポーネントとして定義しておくと再利用しやすいです（ファイル内で定義してもOK）
  const SearchIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );

  return (
    <div className="space-y-6 text-gray-700">
      
      {/* カテゴリーセクション */}
      <section>
        <h2 className="font-bold mb-2 ml-1">カテゴリー</h2>
        <div className="grid grid-cols-3 gap-3">
          {/* 財布 */}
          <button className="flex items-center justify-center gap-2 bg-app-input border border-gray-400 rounded-full py-2 px-1 shadow-sm active:scale-95 transition">
             <SearchIcon className="w-4 h-4 text-gray-500" />
             <span className="text-sm font-bold">財布</span>
          </button>
          
          {/* 空ボタン */}
          {[...Array(5)].map((_, i) => (
            <button key={i} className="flex items-center justify-center bg-app-input border border-gray-300 rounded-full py-2 shadow-sm">
              <SearchIcon className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* 発見場所セクション */}
      <section>
        <h2 className="font-bold mb-2 ml-1">発見場所</h2>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon className="w-5 h-5" />
          </div>
          <select className="w-full appearance-none bg-app-input border border-gray-400 rounded-full py-2 pl-10 pr-10 text-gray-700 focus:outline-none">
            <option>共通講義棟北</option>
            <option>講義棟南</option>
            <option>食堂</option>
          </select>
          {/* 下矢印アイコン */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </section>

      <hr className="border-gray-400" />

      {/* 発見日時セクション */}
      <section>
        <h2 className="font-bold mb-2 ml-1">発見日時</h2>
        <div className="relative w-full">
          <button
    onClick={() => setShowCalendar(true)}
  className="w-full flex items-center bg-app-input border border-gray-400 rounded-full py-2 px-3 text-gray-600 shadow-sm"
>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    strokeWidth={1.5} stroke="currentColor"
    className="h-6 w-6 mr-3 text-gray-700"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5
         7.5h15a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-15A2.25
         2.25 0 0 1 2.25 18.75v-9A2.25 2.25 0 0 1 4.5 7.5z"
    />
  </svg>

  <span>
    {date ? date.toLocaleDateString("ja-JP") : "カレンダーから選択"}
  </span>
</button>
        </div>
      </section>

      {/* カレンダーモーダル */}
      {showCalendar && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={() => setShowCalendar(false)}  // 背景クリックで閉じる
        >
          <div
            className="bg-white p-4 rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()} // カレンダー押した時に閉じない
          >
            <DatePicker
              selected={date}
              onChange={(selected) => {
                setDate(selected);
                setShowCalendar(false); // 選択後閉じる
              }}
              inline
              locale="ja"
            />
          </div>
        </div>
      )}

      <hr className="border-gray-400" />

      {/* 検索ボタン */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => router.push('/seachpage')}
          className="bg-app-blue w-4/5 py-3 rounded-full shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          <SearchIcon className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700 font-bold">この条件で検索</span>
        </button>
      </div>

    </div>
  );
}