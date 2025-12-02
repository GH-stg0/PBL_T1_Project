import { redirect } from 'next/navigation';

export default function Page() {
  // このファイルは旧パスの互換用に残しています。
  // 正しいルートは `/seachpage` です。即時リダイレクトします。
  redirect('/seachpage');
  return null;
}