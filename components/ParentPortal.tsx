
import React, { useState, useMemo } from 'react';
import { Teacher, TimeSlot, Reservation } from '../types';
import { getConsultationAdvice } from '../services/gemini';
import { Calendar, Clock, CheckCircle2, User, ChevronRight, MessageSquare, Sparkles, Loader2 } from 'lucide-react';

interface ParentPortalProps {
  teachers: Teacher[];
  slots: TimeSlot[];
  onBook: (slotId: string, info: Omit<Reservation, 'id' | 'slotId'>) => boolean;
}

const ParentPortal: React.FC<ParentPortalProps> = ({ teachers, slots, onBook }) => {
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [email, setEmail] = useState('');
  const [memo, setMemo] = useState('');
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableSlots = useMemo(() => {
    return slots.filter(s => s.teacherId === selectedTeacher && !s.isReserved);
  }, [slots, selectedTeacher]);

  const handleGetAiAdvice = async () => {
    if (!memo) return;
    setIsAiLoading(true);
    const advice = await getConsultationAdvice(memo);
    setAiAdvice(advice);
    setIsAiLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlot) {
      const success = onBook(selectedSlot, { studentName, guardianName, email, memo });
      if (success) setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-12 text-center animate-in fade-in zoom-in duration-300">
        <div className="bg-green-100 text-green-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold mb-4">予約が完了しました！</h2>
        <p className="text-slate-600 mb-8">
          ご登録いただいたメールアドレスへ確認メール（シミュレーション）を送信しました。<br />
          当日お会いできるのを楽しみにしています。
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition-colors"
        >
          トップへ戻る
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      {/* Steps Indicator */}
      <div className="flex justify-between mb-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 transition-all duration-300 ${
              step >= s ? 'bg-indigo-600 text-white border-indigo-200' : 'bg-white text-slate-300 border-slate-100'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="animate-in slide-in-from-right-4 duration-300">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <User className="text-indigo-600" />
            先生を選択してください
          </h2>
          <div className="grid gap-4">
            {teachers.map((t) => (
              <button
                key={t.id}
                onClick={() => { setSelectedTeacher(t.id); setStep(2); }}
                className="flex items-center justify-between p-5 border-2 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
              >
                <div>
                  <div className="font-bold text-lg">{t.name} 先生</div>
                  <div className="text-sm text-slate-500">{t.subject}</div>
                </div>
                <ChevronRight className="text-slate-300" />
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in slide-in-from-right-4 duration-300">
          <button 
            onClick={() => setStep(1)} 
            className="text-indigo-600 text-sm mb-4 flex items-center gap-1 hover:underline"
          >
            ← 先生を選び直す
          </button>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="text-indigo-600" />
            希望日時を選択
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableSlots.length > 0 ? (
              availableSlots.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSlot(s.id); setStep(3); }}
                  className={`p-4 border-2 rounded-xl text-center transition-all ${
                    selectedSlot === s.id ? 'border-indigo-600 bg-indigo-50 font-bold' : 'border-slate-100 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-sm text-slate-500">{s.date}</div>
                  <div className="text-lg flex items-center justify-center gap-2 mt-1">
                    <Clock size={16} />
                    {s.startTime} - {s.endTime}
                  </div>
                </button>
              ))
            ) : (
              <p className="col-span-full py-10 text-center text-slate-400 bg-slate-50 rounded-xl">
                現在、予約可能な枠はありません。
              </p>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in slide-in-from-right-4 duration-300">
          <button 
            onClick={() => setStep(2)} 
            className="text-indigo-600 text-sm mb-4 flex items-center gap-1 hover:underline"
          >
            ← 時間を選び直す
          </button>
          <h2 className="text-2xl font-bold mb-6">予約情報の入力</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">児童・生徒氏名</label>
                <input 
                  required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="例：山田 太郎"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">保護者氏名</label>
                <input 
                  required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="例：山田 花子"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">メールアドレス</label>
              <input 
                required
                type="email"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="example@school.ed.jp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <MessageSquare size={16} />
                  相談したい内容（任意）
                </label>
                <button
                  type="button"
                  onClick={handleGetAiAdvice}
                  disabled={!memo || isAiLoading}
                  className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 disabled:opacity-50 transition-colors"
                >
                  {isAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                  AIに相談のコツを聞く
                </button>
              </div>
              <textarea 
                className="w-full p-3 border rounded-xl h-24 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                placeholder="学習について、友人関係について等..."
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
              
              {aiAdvice && (
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-2">
                    <Sparkles size={14} />
                    AIアドバイザーからの提案
                  </div>
                  <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {aiAdvice}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-xs text-amber-800">
              ※入力された情報は、担任教諭のみが閲覧でき、他の保護者には一切公開されません。
            </div>

            <button 
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all hover:scale-[1.02] active:scale-95"
            >
              予約を確定する
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ParentPortal;
