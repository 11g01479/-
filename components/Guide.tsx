
import React from 'react';
import { BookOpen, Monitor, ShieldCheck, Cpu, MousePointer2, ExternalLink } from 'lucide-react';

const Guide: React.FC = () => {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">システムご利用ガイド</h2>
        <p className="text-slate-500">Google サイトへの導入方法と基本的な使い方をご説明します。</p>
      </div>

      <div className="space-y-12">
        {/* Section 1: Integration */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <Monitor size={24} />
            </div>
            <h3 className="text-xl font-bold">Google サイトへの埋め込み方法</h3>
          </div>
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
            <ol className="list-decimal list-inside space-y-4 text-slate-700">
              <li>
                <span className="font-bold">Google サイト編集画面</span>を開きます。
              </li>
              <li>
                右側のメニューから「<span className="font-bold">挿入</span>」タブを選択し、「<span className="font-bold">埋め込む</span>」をクリックします。
              </li>
              <li>
                「<span className="font-bold">埋め込みコード</span>」タブを選択します。
              </li>
              <li>
                このアプリのソースコード全体（HTML）を貼り付け、「<span className="font-bold">次へ</span>」→「<span className="font-bold">挿入</span>」をクリックします。
              </li>
              <li>
                ページ上で枠の大きさを調整し、<span className="font-bold">公開</span>ボタンを押せば完了です。
              </li>
            </ol>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
              <ShieldCheck className="text-amber-600 shrink-0" size={20} />
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-bold block mb-1">注意点：</span>
                本システムは、セキュリティと導入のしやすさを優先し、データをお使いのブラウザ（LocalStorage）に保存します。異なるブラウザや端末からは同じ予約データが見えないため、共有が必要な場合は「教職員画面」からCSV等で書き出して管理してください。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Parent Guide */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <MousePointer2 size={24} />
            </div>
            <h3 className="text-xl font-bold">保護者の方向け：予約の進め方</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border rounded-2xl bg-white">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs">1</span>
                先生と日時の選択
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                リストから担任の先生を選び、カレンダーから空いている時間を選択してください。
              </p>
            </div>
            <div className="p-5 border rounded-2xl bg-white">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs">2</span>
                AIアドバイザーの活用
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                相談メモを入力して「AIに相談のコツを聞く」ボタンを押すと、面談をより有意義にするためのアドバイスが表示されます。
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Teacher Guide */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold">教職員向け：管理方法</h3>
          </div>
          <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <BookOpen className="text-indigo-400 mt-1" size={20} />
              <div>
                <p className="font-bold text-white mb-1">管理画面へのアクセス</p>
                <p className="text-sm leading-relaxed">
                  上部の「教職員用」ボタンからログインしてください。<br/>
                  <span className="text-indigo-400">初期パスワード: admin123</span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 pt-4 border-t border-slate-800">
              <ShieldCheck className="text-indigo-400 mt-1" size={20} />
              <div>
                <p className="font-bold text-white mb-1">情報の保護</p>
                <p className="text-sm leading-relaxed">
                  予約者の個人情報は、教職員画面でのみ閲覧可能です。保護者画面には「予約済」というステータスのみが表示され、誰が予約したかは秘匿されます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center pb-10">
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:underline text-sm font-medium"
          >
            Gemini APIの詳細について <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Guide;
