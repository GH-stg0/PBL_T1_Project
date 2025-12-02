"use client";

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatButton from '../../components/ChatButton';

const sampleItems = [
  {
    id: 1,
    type: '財布',
    location: '共通講義棟北',
    date: '2025/11/11',
    status: '保管中',
  },
  { id: 2, type: '鍵', location: '', date: '', status: '' },
  { id: 3, type: 'ノートPC', location: '', date: '', status: '' },
  { id: 4, type: '', location: '', date: '', status: '' },
];

function IconBox({ type }: { type?: string }) {
  return (
    <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center shadow-sm">
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
      {!type && (
        <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="6" width="18" height="12" rx="2" />
        </svg>
      )}
    </div>
  );
}

export default function SeachPage() {
  const searchParams = useSearchParams();
  const paramOrder = searchParams?.get('order');
  const [order, setOrder] = useState<'new' | 'old'>(() => (paramOrder === 'old' ? 'old' : 'new'));

  const toTime = (s?: string) => {
    if (!s) return Number.NEGATIVE_INFINITY;
    const [y, m, d] = s.split('/').map(Number);
    if (!y || !m || !d) return Number.NEGATIVE_INFINITY;
    return new Date(y, m - 1, d).getTime();
  };

  const items = useMemo(() => {
    const arr = [...sampleItems];
    arr.sort((a, b) => {
      const ta = toTime(a.date);
      const tb = toTime(b.date);
      if (ta === tb) return 0;
      return order === 'new' ? tb - ta : ta - tb;
    });
    return arr;
  }, [order]);
  return (
    <main className="min-h-screen bg-yellow-50 flex justify-center">
      <div className="relative w-full max-w-md pb-24">
        {/* ヘッダーエリア（タイトルのみ） */}
        <div className="bg-lime-300 rounded-t-lg pt-6 pb-6 px-6 shadow-sm">
          <h1 className="text-center text-2xl font-bold text-gray-800">落とし物一覧</h1>
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
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* リスト領域（背景を薄黄色に） */}
        <div className="px-4 mt-4" style={{ backgroundColor: '#f3f3d3', paddingTop: 12, paddingBottom: 24 }}>
          {items.map((item) => (
            <div key={item.id} className="mb-4 rounded-xl p-4" style={{ backgroundColor: '#e9e8e8' }}>
              <div className="flex items-start gap-4">
                <IconBox type={item.type} />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-700">{item.type || '—'}</h3>
                    {item.status && (
                      <div className="text-xs bg-violet-200 text-violet-800 px-2 py-1 rounded-full">{item.status}</div>
                    )}
                  </div>
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    {item.location && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7.5-4.5 7.5-10.5A7.5 7.5 0 0 0 4.5 10.5C4.5 16.5 12 21 12 21z" />
                        </svg>
                        <span>{item.location}</span>
                      </div>
                    )}
                    {item.date && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5M3 8.25v9A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25v-9" />
                        </svg>
                        <span>{item.date}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ChatButton />
      </div>
    </main>
  );
}
