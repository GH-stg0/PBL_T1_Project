import Button from '../../../components/AdminMainButton';

export default function Test() {
    return(
        <main className="flex justify-center h-screen bg-[rgb(224,226,159)] pt-20">
            <div className="w-full max-w-[1088px] relative">
                {/*ID入力*/}
                <input
                    type="text"
                    placeholder="ID"
                    className="w-full px-4 py-2
                    bg-[rgba(221,221,221,0.8941)]
                    text-[rgba(120,120,120,1)]
                    border border-[rgba(125,111,111,1)]
                    rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-[rgba(62,165,255,1)]"
                />

                {/*ボタン*/}
                <Button className="
                    absolute top-20 right-0
                    -translate-y-1/2
                    bg-[rgba(154,187,220,1)]
                    text-[rgba(255,255,255,1)]
                    hover:bg-[rgba(124,157,255,1)]
                ">
                    検索
                </Button>
                <Button className="
                    absolute top-80 left-50
                    -translate-y-1/2
                    bg-[rgba(154,187,220,1)]
                    text-[rgba(255,255,255,1)]
                    hover:bg-[rgba(124,157,255,1)]
                ">
                    追加
                </Button>
                <Button className="
                    absolute top-80 right-50
                    -translate-y-1/2
                    bg-[rgba(150,150,150,1)]
                    text-[rgba(255,255,255,1)]
                    hover:bg-[rgba(120,120,120,1)]
                ">
                    ログアウト
                </Button>
            </div>
        </main>
    );
}