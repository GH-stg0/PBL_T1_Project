"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

type LostItemDetail = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  found_location: string | null;
  found_date: string | null; // date型は string で受ける
  status: string | null;
  created_at: string;
};

export default function ItemDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const supabase = createClient();

  const idStr = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const [item, setItem] = useState<LostItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!idStr) {
        setItem(null);
        setFetchError("IDが不正です");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setFetchError(null);

        const { data, error } = await supabase
          .from("lost_items")
          .select(
            "id,name,description,image_url,found_location,found_date,status,created_at"
          )
          .eq("id", idStr)
          .maybeSingle();

        if (error) {
          console.error("Supabase error:", error);
          setFetchError(error.message);
          setItem(null);
          return;
        }

        if (!data) {
          setFetchError("該当データがありません");
          setItem(null);
          return;
        }

        setItem(data);
      } catch (err) {
        console.error(err);
        setFetchError(err instanceof Error ? err.message : "取得に失敗しました");
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [idStr, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3d3] pt-20 text-center text-gray-600">
        読み込み中...
      </div>
    );
  }

  const display: LostItemDetail = item ?? {
    id: Number.isFinite(Number(idStr)) ? Number(idStr) : 0,
    name: "不明",
    description: null,
    image_url: null,
    found_location: null,
    found_date: null,
    status: null,
    created_at: "",
  };

  return (
    <main className="min-h-screen bg-[#e8ecbd] flex justify-center text-gray-800">
      <div className="w-full max-w-md bg-[#f3f3d3] min-h-screen relative pb-28">
        {/* ヘッダー */}
        <div className="bg-[#bfdf66] pt-10 pb-4 px-4 sticky top-0 z-10 shadow-sm flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-gray-800"
          >
            ←戻る
          </button>
          <h1 className="flex-1 text-center text-lg font-bold pr-8">
            落とし物情報
          </h1>
        </div>

        <div className="p-4 space-y-4">
          {/* 取得エラーでもページは表示する */}
          {fetchError && (
            <div className="bg-white/70 border border-black/10 rounded-xl px-4 py-3 text-sm text-gray-700">
              データの取得に失敗しました．一部は仮表示です．（{fetchError}）
            </div>
          )}
          {/* 画像 */}
          <div className="bg-white rounded-2xl p-6 flex items-center justify-center shadow-sm aspect-[4/3]">
            {display.image_url ? (
              <img
                src={display.image_url}
                alt={display.name}
                className="w-36 h-36 object-contain"
              />
            ) : (
              <div className="w-36 h-36 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                No Image
              </div>
            )}
          </div>

          {/* 名前・特徴 */}
          <div className="bg-[#e8ecbd] rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-base font-bold">
                {display.name}
              </h2>
              <span className="bg-[#a78bfa] text-white text-xs px-3 py-1 rounded-full">
                {display.status ?? "保管中"}
              </span>
            </div>

            <p className="text-sm text-gray-700">
              <span className="opacity-70 mr-2">特徴 :</span>
              {display.description || "特になし"}
            </p>
          </div>

          {/* 発見場所 */}
          <div className="bg-[#e8ecbd] rounded-xl p-4">
            <h3 className="text-sm font-bold mb-2">発見場所</h3>
            <p className="text-sm text-gray-800">
              {display.found_location || "不明"}
            </p>

            {/* マップ（見た目だけ） */}
            <div className="mt-3 w-full h-86 bg-gray-100 rounded overflow-hidden">
              <img
                src="/images/map.png"
                alt="map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 発見日時 */}
          <div className="bg-[#e8ecbd] rounded-xl p-4">
            <h3 className="text-sm font-bold mb-2">発見日時</h3>
            <p className="text-sm font-mono text-gray-800">
              {display.found_date || "不明"}
            </p>
          </div>
        </div>

        {/* 管理者に連絡（見た目のみ） */}
        <div className="fixed bottom-6 left-0 right-0 flex justify-center px-6">
          <button
            type="button"
            className="bg-[#a3d6a3] text-gray-800 font-bold py-3 px-12 rounded-full shadow-lg border border-[#8bc48b]"
          >
            管理者に連絡
          </button>
        </div>
      </div>
    </main>
  );
}
