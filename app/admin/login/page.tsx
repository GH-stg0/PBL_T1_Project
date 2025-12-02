"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        background: "#f8f8a6",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: 500, textAlign: "center" }}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "16px",
            boxSizing: "border-box",
            backgroundColor: "#eee",
          }}
        />

        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "16px",
            boxSizing: "border-box",
            backgroundColor: "#eee",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            background: "#9ec7f7",
            border: "none",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          ログイン
        </button>
      </div>
    </div>
  );
}
