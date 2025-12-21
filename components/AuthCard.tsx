"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  title: string;
  buttonText: string;
  footerText: string;
  footerHref: string;
  emailLabel?: string;
  passwordLabel?: string;
  confirmPasswordLabel?: string;
  requireConfirmPassword?: boolean;
  onSubmit?: (email: string, password: string) => Promise<void> | void;
};

export default function AuthCard({
  title,
  buttonText,
  footerText,
  footerHref,
  emailLabel = "メールアドレス",
  passwordLabel = "パスワード",
  confirmPasswordLabel,
  requireConfirmPassword = false,
  onSubmit,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string>("");

  const colors = {
    bg: "#F3F6D6", // 薄い黄色
    accent: "#C6E26B", // 黄緑
    title: "#5B7F1F", // 濃い黄緑
    text: "#2F3A0F",
    inputBg: "#F7F7F7",
    cardBg: "#FFFFFF",
    border: "#D6D6D6",
    errorBg: "#FDECEC",
    errorText: "#B00020",
  };

  const handleSubmit = async () => {
    setError("");

    // 最低限のバリデーション（ログイン失敗表示の土台）
    if (!email || !password || (requireConfirmPassword && !confirmPassword)) {
      setError("メールアドレスとパスワードを入力してください．");
      return;
    }

    if (requireConfirmPassword && password !== confirmPassword) {
      setError("パスワードが一致しません．");
      return;
    }

    try {
      await onSubmit?.(email, password);
    } catch (e: any) {
      // ここに supabase のエラーメッセージ等を入れられる
      setError(e?.message ?? "ログインに失敗しました．入力内容を確認してください．");
    }
  };

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: colors.cardBg,
          padding: "24px",
          borderRadius: "12px",
          boxSizing: "border-box",
          border: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <div
            aria-hidden
            style={{
              width: "44px",
              height: "44px",
              margin: "0 auto 10px auto",
              borderRadius: "999px",
              backgroundColor: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colors.text,
              fontSize: "20px",
            }}
          >
            🔒
          </div>

          <h2 style={{ margin: 0, color: colors.title }}>{title}</h2>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: colors.errorBg,
              color: colors.errorText,
              padding: "10px 12px",
              borderRadius: "8px",
              marginBottom: "14px",
              fontSize: "14px",
              lineHeight: 1.4,
            }}
            role="alert"
          >
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder={emailLabel}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: `1px solid ${colors.border}`,
            boxSizing: "border-box",
            backgroundColor: colors.inputBg,
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder={passwordLabel}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "14px",
            borderRadius: "8px",
            border: `1px solid ${colors.border}`,
            boxSizing: "border-box",
            backgroundColor: colors.inputBg,
            outline: "none",
          }}
        />

        {requireConfirmPassword && (
          <input
            type="password"
            placeholder={confirmPasswordLabel ?? "パスワード（確認）"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "14px",
              borderRadius: "8px",
              border: `1px solid ${colors.border}`,
              boxSizing: "border-box",
              backgroundColor: colors.inputBg,
              outline: "none",
            }}
          />
        )}

        <button
          type="button"
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: colors.accent,
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            color: colors.text,
            fontWeight: 700,
          }}
        >
          {buttonText}
        </button>

        <div style={{ marginTop: "14px", textAlign: "center", fontSize: "14px" }}>
          <Link
            href={footerHref}
            style={{
              color: colors.title,
              textDecoration: "none",
              borderBottom: `1px solid ${colors.title}`,
              paddingBottom: "2px",
            }}
          >
            {footerText}
          </Link>
        </div>
      </div>
    </div>
  );
}
