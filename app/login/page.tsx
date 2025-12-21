"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "../../components/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

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
        title="管理者ログイン"
        buttonText="ログイン"
        footerText="新規登録はこちら"
        footerHref="#"
        onSubmit={async (email, password) => {
          setError("");

          // ★ MVP用ベタ書き認証
          if (email === "admin@gmail.com" && password === "testtest") {
            router.push("/admin");
            return;
          }

          // それ以外は弾く
          setError("メールアドレスまたはパスワードが違います");
          throw new Error("login failed");
        }}
      />
    </div>
  );
}
