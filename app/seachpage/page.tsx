"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type LostItem = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  found_location: string;
  found_date: string; // '2025-12-16' 形式
  status: string;
  created_at: string;
};

// ---------------------------
// IconBox（アイコンサイズを少し調整可能に）
// ---------------------------
function IconBox({ type }: { type?: string }) {
  // グリッド内でバランスが良いサイズ感のアイコン
  const iconClass = "w-12 h-12 text-gray-700";

  return (
    <div>
      {type === '財布' && (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          {/* Fillを使ったアイコンの方が画像に近い見た目になりますが、元のパスを使用します */}
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
          {/* 仮のアイコンパス：元のSVGパスに戻す場合は以下を使用してください */}
        </svg>
      )}
      
      {/* 注: 実際の表示を画像に近づけるため、アイコンは少し大きめにしています。
         元のSVGパスを維持しつつ、視認性を高めています。
      */}
       {(type === '財布' || !type) && (
         /* デフォルトまたは財布アイコン（画像に合わせて塗りつぶし風に調整） */
         <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
           <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
           <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-6 3.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
         </svg>
       )}

      {type === '鍵' && (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
        </svg>
      )}

      {type === 'PC' && (
         <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
         </svg>
      )}
    </div>
  );
}

// ---------------------------
// ページ本体
// ---------------------------
export default function SeachPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramOrder = searchParams?.get('order');

  const [order, setOrder] = useState<'new' | 'old' | 'type'>(() =>
    paramOrder === 'old' ? 'old' : paramOrder === 'type' ? 'type' : 'new'
  );
  const [items, setItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Supabaseからデータ取得
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('lost_items')
          .select('id,name,description,image_url,found_location,found_date,status,created_at');

        if (error) throw error;

        setItems(data || []);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Failed to fetch items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // 日付をタイムスタンプに変換
  const toTime = (s?: string) => {
    if (!s) return Number.NEGATIVE_INFINITY;
    const [y, m, d] = s.split('-').map(Number);
    if (!y || !m || !d) return Number.NEGATIVE_INFINITY;
    return new Date(y, m - 1, d).getTime();
  };

  // 並び替え
  const sortedItems = useMemo(() => {
    const arr = [...items];
    arr.sort((a, b) => {
      if (order === 'type') {
        // 「種類別」：name を種類として50音順（日本語もだいたいOK）
        return (a.name ?? '').localeCompare(b.name ?? '', 'ja');
      }
      const ta = toTime(a.found_date);
      const tb = toTime(b.found_date);
      if (ta === tb) return 0;
      return order === 'new' ? tb - ta : ta - tb;
    });
    return arr;
  }, [items, order]);

  // ---------------------------
  // レンダリング
  // ---------------------------
  if (error) {
    return (
      <main className="min-h-screen bg-app-bg flex justify-center">
        <div className="relative w-full max-w-md pb-24">
          <div className="bg-app-green rounded-t-lg pt-6 pb-6 px-6 shadow-sm">
            <h1 className="text-center text-xl font-bold text-gray-800 tracking-wide">落とし物一覧</h1>
          </div>
          <div className="px-4 mt-4 text-center py-8">
            <p className="text-red-600">エラーが発生しました: {error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-app-bg flex justify-center">
      <div className="relative w-full max-w-md pb-24">
        {/* ヘッダー */}
        <div className="bg-[#bfdf66] rounded-t-lg pt-6 pb-6 px-6 shadow-sm">
          <button
            onClick={() => router.back()}
            className="absolute left-4 top-6 text-gray-700 text-sm font-medium"
          >
            ← 戻る
          </button>
          
          <h1 className="text-center text-xl font-bold text-gray-800 mb-4 tracking-wide">
            落とし物一覧
          </h1>

          {/* ソート */}
          <div className="mt-4 flex justify-end">
            <div className="relative w-32">
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as 'new' | 'old'| 'type')}
                className="w-full appearance-none bg-white/60 text-gray-700 border-none rounded-full py-1.5 px-3 text-sm shadow-sm focus:outline-none text-center"
              >
                <option value="new">新着順</option>
                <option value="old">古い順</option>
                <option value="type">種類別</option>
              </select>

              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* リスト表示エリア */}
        <div
          className="px-3 mt-0"
          style={{ backgroundColor: '#e8ecbd', minHeight: 'calc(100vh - 150px)', paddingTop: 16 }}
        >
          {loading ? (
            <div className="text-center py-8 text-gray-600">読み込み中...</div>
          ) : sortedItems.length === 0 ? (
            <div className="text-center py-8 text-gray-600">落とし物が見つかりません</div>
          ) : (
            /* グリッドレイアウトに変更: 3列 (grid-cols-3) */
            <div className="grid grid-cols-3 gap-3">
              {sortedItems.map((item) => (
                <Link
                  href={`/items/${item.id}`} // ここで詳細ページへリンク
                  key={item.id}
                  className="block" // Linkはデフォルトでinlineなのでblockにする
                >
                  <div
                    className="rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm aspect-[3/5] transition-transform active:scale-95"
                    style={{ backgroundColor: '#e6e6e6' }}
                  >
                    {/* アイコン部分 */}
                    <div className="mb-3 flex-1 flex items-center justify-center">
                      <IconBox type={item.name} />
                    </div>

                    {/* テキスト部分 */}
                    <div className="w-full">
                      <h3 className="text-xs font-medium text-gray-700 leading-tight mb-1">
                        {item.name || '不明'}
                      </h3>
                      <p className="text-[10px] text-gray-500 line-clamp-2 leading-tight">
                        {item.found_location || '詳細なし'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}