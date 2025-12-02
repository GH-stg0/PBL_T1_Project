"use client";

import { useState } from 'react';

const PREDEFINED_CATEGORIES = [
  "財布", "スマートフォン", "鍵", "イヤホン", 
  "学生証", "教科書", "ノート", "筆箱", 
  "傘", "水筒", "眼鏡", "時計", 
  "指輪", "ネックレス", "帽子", "手袋", "マフラー",
  "黒いもの", "白いもの", "赤いもの", "青いもの",
  "リュック", "トートバッグ", "ポーチ", "充電器",
  "定期入れ", "ハンカチ", "ジャケット", "書類"
];

const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

// ×アイコン
const XMarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
  </svg>
);

type Props = {
  // 配列を受け取る形に変更
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
};

export default function CategoryInput({ selectedCategories, onChange }: Props) {
  const [inputText, setInputText] = useState(""); // 入力中の文字
  const [showSuggestions, setShowSuggestions] = useState(false);

  // フィルタリング: 入力値を含み、かつ「まだ選ばれていないもの」を表示
  const filteredCategories = inputText === "" 
    ? [] 
    : PREDEFINED_CATEGORIES.filter(cat => 
        cat.includes(inputText) && !selectedCategories.includes(cat)
      );

  // カテゴリー追加処理
  const handleSelectCategory = (category: string) => {
    // 重複チェック（念のため）
    if (!selectedCategories.includes(category)) {
      onChange([...selectedCategories, category]);
    }
    setInputText(""); // 入力欄をクリア
    setShowSuggestions(false);
  };

  // カテゴリー削除処理
  const handleRemoveCategory = (categoryToRemove: string) => {
    onChange(selectedCategories.filter(cat => cat !== categoryToRemove));
  };

  return (
    <section className="relative z-20">
      <h2 className="font-bold mb-2 ml-1">カテゴリー (AND検索)</h2>
      
      {/* 選択済みタグの表示エリア */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 px-1">
          {selectedCategories.map((cat) => (
            <span key={cat} className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              {cat}
              <button
                type="button"
                onClick={() => handleRemoveCategory(cat)}
                className="hover:text-blue-600 focus:outline-none"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <div className="flex items-center bg-app-input border border-gray-400 rounded-full py-2 px-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-300 focus-within:border-transparent transition-all">
          <SearchIcon className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
          <input 
            type="text"
            className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400 font-bold"
            placeholder={selectedCategories.length > 0 ? "さらに追加..." : "カテゴリーを検索 (例: 黒...)"}
            value={inputText} // ここは inputText をバインド
            onChange={(e) => {
              setInputText(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              if(inputText) setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {/* 入力中の文字がある時だけクリアボタンを表示 */}
          {inputText && (
            <button 
              onClick={() => setInputText("")}
              className="text-gray-400 hover:text-gray-600 p-1"
              type="button"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 検索候補リスト */}
        {showSuggestions && inputText !== "" && filteredCategories.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto z-50 divide-y divide-gray-100">
            {filteredCategories.map((cat) => (
              <li 
                key={cat}
                className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-700 font-medium transition-colors flex items-center gap-2"
                onMouseDown={(e) => {
                  e.preventDefault(); 
                  handleSelectCategory(cat);
                }}
              >
                <SearchIcon className="w-4 h-4 text-gray-400" />
                {cat}
              </li>
            ))}
          </ul>
        )}
        
        {/* 候補なしメッセージ */}
        {showSuggestions && inputText !== "" && filteredCategories.length === 0 && (
           <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl p-3 text-center text-gray-500 text-sm z-50">
             候補が見つかりません
           </div>
        )}
      </div>
    </section>
  );
}