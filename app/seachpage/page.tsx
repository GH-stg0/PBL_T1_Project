"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatButton from '../../components/ChatButton';
import { ensureAnonSession, supabase } from '../../lib/supabase';

type LostItem = {
  id: number;
  type: string;
  location: string;
  date: string;
  status: string;
};

// ---------------------------
// IconBox（アイコンだけ返す）
// ---------------------------
function IconBox({ type }: { type?: string }) {
  return (
    <div>
      {type === '財布' && (
        <svg className="w-10 h-10 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18v9a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 16.5v-9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
        </svg>
      )}

      {type === '鍵' && (
        <svg className="w-10 h-10 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 1 0-4 2.83V16l-2 2v1h3l2-2h1.17A3 3 0 0 0 15 11z" />
        </svg>
      )}
    </div>
  );
}

// ---------------------------
// ページ本体
// ---------------------------
export default function SeachPage() {
  const searchParams = useSearchParams();
  const paramOrder = searchParams?.get('order');

  const [order, setOrder] = useState<'new' | 'old'>(() =>
    paramOrder === 'old' ? 'old' : 'new'
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

        await ensureAnonSession();

        const { data, error } = await supabase
          .from('lost_items')
          .select('*');

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
    const [y, m, d] = s.split('/').map(Number);
    if (!y || !m || !d) return Number.NEGATIVE_INFINITY;
    return new Date(y, m - 1, d).getTime();
  };

  // 並び替え
  const sortedItems = useMemo(() => {
    const arr = [...items];
    arr.sort((a, b) => {
      const ta = toTime(a.date);
      const tb = toTime(b.date);
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
        <div className="bg-app-green rounded-t-lg pt-6 pb-6 px-6 shadow-sm">
          <h1 className="text-center text-xl font-bold text-gray-800 mb-4 tracking-wide">
            落とし物一覧
          </h1>

          {/* ソート */}
          <div className="mt-4 flex justify-end">
            <div className="relative w-32">
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value as 'new' | 'old')}
                className="w-full appearance-none bg-white/80 text-gray-700 border border-gray-200 rounded-full py-1 px-3 text-sm shadow-sm focus:outline-none"
              >
                <option value="new">新着順</option>
                <option value="old">古い順</option>
              </select>

              <svg
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
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

        {/* リスト */}
        <div
          className="px-4 mt-4"
          style={{ backgroundColor: '#f3f3d3', paddingTop: 12, paddingBottom: 24 }}
        >
          {loading ? (
            <div className="text-center py-8 text-gray-600">読み込み中...</div>
          ) : sortedItems.length === 0 ? (
            <div className="text-center py-8 text-gray-600">落とし物が見つかりません</div>
          ) : (
            sortedItems.map((item) => (
              <div
                key={item.id}
                className="mb-4 rounded-xl p-4"
                style={{ backgroundColor: '#e9e8e8' }}
              >
                <div className="flex items-start gap-4">
                  <IconBox type={item.type} />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {item.type || '—'}
                      </h3>

                      {item.status && (
                        <div className="text-xs bg-violet-200 text-violet-800 px-2 py-1 rounded-full">
                          {item.status}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      {item.location && (
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7.5-4.5 7.5-10.5A7.5 7.5 0 0 0 4.5 10.5C4.5 16.5 12 21 12 21z" />
                          </svg>
                          <span>{item.location}</span>
                        </div>
                      )}

                      {item.date && (
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5M3 8.25v9A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25v-9" />
                          </svg>
                          <span>{item.date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <ChatButton />
      </div>
    </main>
  );
}