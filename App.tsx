
import React, { useState, useEffect } from 'react';
import { ViewType, Teacher, TimeSlot, Reservation } from './types';
import { MOCK_TEACHERS, INITIAL_SLOTS } from './constants';
import ParentPortal from './components/ParentPortal';
import TeacherDashboard from './components/TeacherDashboard';
import Guide from './components/Guide';
import { User, GraduationCap, LayoutDashboard, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('parent');
  const [teachers] = useState<Teacher[]>(MOCK_TEACHERS);
  const [slots, setSlots] = useState<TimeSlot[]>(INITIAL_SLOTS);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedSlots = localStorage.getItem('school_reserve_slots');
    const savedRes = localStorage.getItem('school_reserve_reservations');
    if (savedSlots) setSlots(JSON.parse(savedSlots));
    if (savedRes) setReservations(JSON.parse(savedRes));
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('school_reserve_slots', JSON.stringify(slots));
    localStorage.setItem('school_reserve_reservations', JSON.stringify(reservations));
  }, [slots, reservations]);

  const handleBooking = (slotId: string, bookingInfo: Omit<Reservation, 'id' | 'slotId'>) => {
    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      slotId,
      ...bookingInfo
    };

    setReservations(prev => [...prev, newReservation]);
    setSlots(prev => prev.map(s => s.id === slotId ? { ...s, isReserved: true } : s));
    return true;
  };

  const handleUpdateSlots = (newSlots: TimeSlot[]) => {
    setSlots(newSlots);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto shadow-xl bg-white">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4 md:p-6 sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('parent')}>
          <GraduationCap size={32} />
          <div>
            <h1 className="text-xl font-bold leading-tight">面談予約システム</h1>
            <p className="text-xs text-indigo-100 opacity-80">SchoolReserve AI v1.0</p>
          </div>
        </div>
        
        <nav className="flex gap-1 md:gap-2">
          <button 
            onClick={() => setView('parent')}
            className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${view === 'parent' ? 'bg-white text-indigo-700' : 'hover:bg-indigo-600'}`}
          >
            <User size={14} />
            保護者
          </button>
          <button 
            onClick={() => setView('teacher')}
            className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${view === 'teacher' ? 'bg-white text-indigo-700' : 'hover:bg-indigo-600'}`}
          >
            <LayoutDashboard size={14} />
            教職員
          </button>
          <button 
            onClick={() => setView('guide')}
            className={`px-3 py-2 rounded-full text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${view === 'guide' ? 'bg-white text-indigo-700' : 'hover:bg-indigo-600 text-indigo-200'}`}
          >
            <HelpCircle size={14} />
            ガイド
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {view === 'parent' && (
          <ParentPortal 
            teachers={teachers} 
            slots={slots} 
            onBook={handleBooking} 
          />
        )}
        {view === 'teacher' && (
          <TeacherDashboard 
            teachers={teachers} 
            slots={slots} 
            reservations={reservations}
            onUpdateSlots={handleUpdateSlots}
          />
        )}
        {view === 'guide' && (
          <Guide />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 border-t text-center text-[10px] md:text-xs text-slate-400 bg-slate-50">
        <p>&copy; 2024 SchoolReserve AI. プライバシーに配慮した設計。個人情報はブラウザにのみ保存されます。</p>
      </footer>
    </div>
  );
};

export default App;
