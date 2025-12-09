"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : undefined;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-app-bg)] text-[var(--color-gray-900)] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">ログイン</h1>
          <p className="text-sm text-[var(--color-gray-600)] mt-1">
            Googleアカウントでサインインします。
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full rounded-md bg-[var(--color-app-green)] hover:brightness-95 text-[var(--color-gray-900)] font-semibold py-2 transition disabled:opacity-60"
        >
          {loading ? "リダイレクト中..." : "Googleでログイン"}
        </button>
      </div>
    </main>
  );
}
