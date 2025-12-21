"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [searchId, setSearchId] = useState("");
  const [itemName, setItemName] = useState("");

  const colors = {
    bg: "#F3F6D6",
    card: "#FFFFFF",
    accent: "#C6E26B",
    button: "#9EC7F7",
    text: "#2F3A0F",
    border: "#D6D6D6",
  };

  return (
    <div
      style={{
        backgroundColor: colors.bg,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        paddingTop: "80px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: colors.card,
          padding: "24px",
          borderRadius: "16px",
          border: `1px solid ${colors.border}`,
          boxSizing: "border-box",
        }}
      >
        {/* ID検索 */}
        <div style={{ marginBottom: "32px" }}>
          <input
            type="text"
            placeholder="落とし物ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: `1px solid ${colors.border}`,
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={() => {
              console.log("検索ID:", searchId);
              alert(`ID検索（MVP）: ${searchId}`);
            }}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: colors.button,
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            検索
          </button>
        </div>

        {/* 落とし物追加 */}
        <div style={{ marginBottom: "32px" }}>
          <input
            type="text"
            placeholder="落とし物名"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: `1px solid ${colors.border}`,
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={() => {
              alert(`追加しました（MVP）: ${itemName}`);
              setItemName("");
            }}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: colors.accent,
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            追加
          </button>
        </div>

        {/* ログアウト */}
        <button
          onClick={() => router.push("/login")}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#CCCCCC",
            border: "none",
            borderRadius: "8px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}
