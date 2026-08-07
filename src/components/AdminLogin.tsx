import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, ShieldCheck, AlertCircle, Delete } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const AdminLogin: React.FC = () => {
  const [pin, setPin] = useState('');
  const { loginAdmin, adminLoading, adminError, isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin.length === 4) {
        submitPin(nextPin);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const submitPin = async (inputPin: string) => {
    const success = await loginAdmin(inputPin);
    if (success) {
      navigate('/admin');
    } else {
      setTimeout(() => setPin(''), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-900 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-stone-950 p-8 sm:p-10 rounded-3xl border border-stone-800 shadow-2xl">
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-stone-400 hover:text-stone-200 transition-colors duration-200 group mb-6 text-sm"
          >
            <ArrowLeft size={16} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Înapoi pe site</span>
          </Link>

          <div className="mx-auto w-14 h-14 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 mb-4 shadow-inner">
            <ShieldCheck size={28} strokeWidth={1.5} />
          </div>
          
          <h2 className="text-center text-2xl sm:text-3xl font-serif font-light text-stone-100">
            Panou Admin
          </h2>
          <p className="mt-2 text-center text-xs sm:text-sm text-stone-400 font-light">
            Introduceți codul PIN din 4 cifre pentru acces
          </p>
        </div>

        {adminError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{adminError}</span>
          </div>
        )}

        {/* PIN Indicators */}
        <div className="flex justify-center items-center gap-4 py-4">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                pin.length > idx
                  ? 'bg-amber-400 scale-115 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                  : 'bg-stone-800 border border-stone-700'
              }`}
            />
          ))}
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xs mx-auto pt-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num)}
              disabled={adminLoading}
              className="h-14 sm:h-16 rounded-2xl bg-stone-900 hover:bg-stone-800 active:scale-95 text-xl font-light text-stone-100 transition-all duration-200 border border-stone-800 flex items-center justify-center shadow-sm disabled:opacity-50"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            disabled={adminLoading}
            className="h-14 sm:h-16 rounded-2xl bg-stone-900 hover:bg-stone-800 active:scale-95 text-xl font-light text-stone-100 transition-all duration-200 border border-stone-800 flex items-center justify-center shadow-sm disabled:opacity-50"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={adminLoading || pin.length === 0}
            className="h-14 sm:h-16 rounded-2xl bg-stone-900 hover:bg-stone-800 active:scale-95 text-stone-400 hover:text-stone-200 transition-all duration-200 border border-stone-800 flex items-center justify-center shadow-sm disabled:opacity-40"
            aria-label="Șterge"
          >
            <Delete size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="text-center pt-2">
          <p className="text-[11px] text-stone-500 font-light">
            Acces securizat Atomra Home România
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
