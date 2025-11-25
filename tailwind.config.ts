import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          green: '#C5E365',   // ヘッダーの緑
          bg: '#EFEFCD',      // 全体の背景ベージュ
          input: '#E6E6E6',   // 入力欄のグレー
          blue: '#B0CBE6',    // 検索ボタンの青
        }
      },
    },
  },
  plugins: [],
};
export default config;