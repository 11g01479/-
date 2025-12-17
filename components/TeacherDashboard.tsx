
import React, { useState } from 'react';
import { Teacher, TimeSlot, Reservation } from '../types';
import { Users, Calendar, Plus, Trash2, Mail, FileText, Download, Lock } from 'lucide-react';

interface TeacherDashboardProps {
  teachers: Teacher[];
  slots: TimeSlot[];
  reservations: Reservation[];
  onUpdateSlots: (slots: TimeSlot[]) => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teachers, slots, reservations, onUpdateSlots }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0].id);

  // Simple auth for demo
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsAuthenticated(true);
    else alert('パスワードが違います (デモ用: admin123)');
  };

  const teacherSlots = slots.filter(s => s.teacherId === selectedTeacherId);
  
  const handleAddSlot = () => {
    const newSlot: TimeSlot = {
      id: Math.random().toString(36).substr(2, 9),
      teacherId: selectedTeacherId,
      date: new Date().toISOString().split('T')[0],
      startTime: '16:00',
      endTime: '16:20',
      isReserved: false
    };
    onUpdateSlots([...slots, newSlot]);
  };

  const handleRemoveSlot = (id: string) => {
    if (window.confirm('この枠を削除してもよろしいですか？')) {
      onUpdateSlots(slots.filter(s => s.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-12 max-w-md mx-auto">
        <div className="bg-white p-8 rounded-3xl border-2 border-slate-100 shadow-sm">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-xl font-bold text-center mb-6">教職員ログイン</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600">管理用パスワード</label>
              <input 
                type="password"
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="パスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-[10px] text-slate-400">※デモ用パスワード: admin123</p>
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
              認証する
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="text-indigo-600" />
            予約状況確認・管理
          </h2>
          <p className="text-slate-500 text-sm mt-1">先生ごとの予約枠と詳細情報を管理できます。</p>
        </div>
        <select 
          className="p-2 border rounded-lg bg-white shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedTeacherId}
          onChange={(e) => setSelectedTeacherId(e.target.value)}
        >
          {teachers.map(t => (
            <option key={t.id} value={t.id}>{t.name} 先生 ({t.subject})</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Slot Management */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <Calendar size={18} />
                予約枠の設定
              </h3>
              <button 
                onClick={handleAddSlot}
                className="p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                title="枠を追加"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="divide-y max-h-[500px] overflow-y-auto">
              {teacherSlots.map(s => (
                <div key={s.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="font-medium text-sm">{s.date}</div>
                    <div className="text-slate-500 text-xs mt-1">{s.startTime} - {s.endTime}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    {s.isReserved ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">予約済</span>
                    ) : (
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded">空き</span>
                    )}
                    <button 
                      onClick={() => handleRemoveSlot(s.id)}
                      disabled={s.isReserved}
                      className="text-slate-300 hover:text-red-500 disabled:opacity-30 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reservations List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <FileText size={18} />
                予約詳細一覧
              </h3>
              <button className="text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
                <Download size={14} />
                CSV出力
              </button>
            </div>
            <div className="p-0">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-4">時間</th>
                    <th className="p-4">生徒名</th>
                    <th className="p-4">保護者名</th>
                    <th className="p-4">連絡先</th>
                    <th className="p-4">相談メモ</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {teacherSlots.filter(s => s.isReserved).map(s => {
                    const res = reservations.find(r => r.slotId === s.id);
                    return (
                      <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium whitespace-nowrap">
                          {s.date.split('-').slice(1).join('/')}<br/>{s.startTime}
                        </td>
                        <td className="p-4 whitespace-nowrap">{res?.studentName || '-'}</td>
                        <td className="p-4 whitespace-nowrap">{res?.guardianName || '-'}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-slate-400">
                            <Mail size={14} />
                            <span className="truncate max-w-[120px]">{res?.email || '-'}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-xs text-slate-600 line-clamp-2 max-w-[200px]" title={res?.memo}>
                            {res?.memo || <span className="text-slate-300 italic">なし</span>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {teacherSlots.filter(s => s.isReserved).length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-slate-400">
                        現在、確定した予約はありません。
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
