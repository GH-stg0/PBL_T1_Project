"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

type LostItemDetail = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  found_location: string;
  found_date: string;
  status: string;
  created_at: string;
  map_url?: string | null;
  room?: string | null;
};

export default function ItemDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  // params が一瞬 undefined 扱いになるケースにも耐えるため，ここで正規化
  const idStr = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const [item, setItem] = useState<LostItemDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      const id = Number(idStr);

      if (!idStr || Number.isNaN(id)) {
        setItem(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("lost_items")
          .select(
            "id,name,description,image_url,found_location,found_date,status,created_at,map_url,room"
          )
          .eq("id", id)
          .single();

        if (error) throw error;
        setItem(data);
      } catch (err) {
        console.error(err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [idStr]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#f3f3d3] pt-20 text-center text-gray-600">
        読み込み中...
      </div>
    );

  if (!item)
    return (
      <div className="min-h-screen bg-[#f3f3d3] pt-20 text-center text-gray-600">
        アイテムが見つかりません
      </div>
    );

  return (
    <main className="min-h-screen bg-[#e8ecbd] flex justify-center font-sans text-gray-800">
      <div className="w-full max-w-md bg-[#f3f3d3] min-h-screen relative pb-24">
        <div className="bg-[#bfdf66] pt-12 pb-4 px-4 sticky top-0 z-10 shadow-sm flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-blue-600"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-xl font-bold text-gray-800 pr-8">
            落とし物情報
          </h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center shadow-sm aspect-[4/3] relative">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-32 h-32 object-contain"
              />
            ) : (
              <svg
                className="w-32 h-32 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            <div className="absolute bottom-4 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start gap-2 mb-2">
              <h2 className="text-xl font-bold leading-tight">
                {item.name || "詳細"}
              </h2>
              <span className="bg-[#a78bfa] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                {item.status || "保管中"}
              </span>
            </div>

            <div className="text-sm space-y-1 text-gray-700 mt-3 font-medium">
              <p>
                <span className="opacity-70 mr-2">概要 :</span>{" "}
                {item.description || "特になし"}
              </p>
            </div>
          </div>

          <hr className="border-gray-400 opacity-50" />

          <div>
            <h3 className="text-sm text-gray-600 mb-2 font-bold opacity-80">
              発見場所
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-bold text-lg text-gray-800 mr-4">
                {item.found_location}
              </span>

              <svg
                className="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>
              <span className="font-bold text-lg text-gray-800">
                {item.room || "不明"}
              </span>
            </div>

            <div className="w-full bg-white p-2 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-gray-100 w-full h-40 rounded flex items-center justify-center text-gray-400 text-xs overflow-hidden">
                {item.map_url ? (
                  <img
                    src={item.map_url}
                    alt="map"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "Map Image Area"
                )}
              </div>
            </div>
          </div>

          <hr className="border-gray-400 opacity-50" />

          <div>
            <h3 className="text-sm text-gray-600 mb-2 font-bold opacity-80">
              発見日時
            </h3>
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
              <span className="text-xl font-bold text-gray-700 font-mono tracking-wide">
                {item.found_date}
              </span>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 left-0 right-0 flex justify-center px-6 pointer-events-none">
          <button className="bg-[#a3d6a3] text-gray-800 font-bold py-3 px-12 rounded-full shadow-lg border border-[#8bc48b] pointer-events-auto active:scale-95 transition-transform">
            管理者に連絡
          </button>
        </div>
      </div>
    </main>
  );
}
