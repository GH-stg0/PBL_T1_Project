"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "../../components/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  return (
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
  );
}
