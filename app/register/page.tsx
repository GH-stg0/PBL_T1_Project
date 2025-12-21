"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "../../components/AuthCard";
import { createClient } from "../../utils/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [registered, setRegistered] = useState(false);

  // ① 登録後の表示（ここが「メッセージ表示を追加」の正体）
  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f6d6]">
        <div className="bg-white px-6 py-4 rounded-xl shadow text-center text-gray-800 font-bold">
          登録しました
        </div>
      </div>
    );
  }

  // ② 通常時は登録フォームを表示
  return (
    <div className="min-h-screen bg-[#f3f6d6]">
      <div className="bg-[#bfdf66] pt-10 pb-4 px-4 sticky top-0 z-10 shadow-sm flex items-center">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-gray-800"
        >
          ←戻る
        </button>
      </div>
      <AuthCard
        title="管理者登録"
        buttonText="登録する"
        footerText="ログインはこちら"
        footerHref="/login"
        requireConfirmPassword
        confirmPasswordLabel="パスワード（確認）"
        onSubmit={async (email, password) => {
          const supabase = createClient();

          const { error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) throw error;

          // ③ 成功したらメッセージ表示に切り替え
          setRegistered(true);

          // ④ 少し待ってログイン画面へ
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        }}
      />
    </div>
  );
}
