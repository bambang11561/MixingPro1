import React, { useState } from 'react';
import { ShieldAlert, LogIn, Lock, User } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'admin' | 'user', username: string) => void;
}

const USERS = [
  { username: '10401', password: 'SRI10401', name: 'MUHAMMAD NASIR' },
  { username: '10482', password: 'SRI10482', name: 'SURMAN' },
  { username: '10531', password: 'SRI10531', name: 'QODRI WAKHID S' },
  { username: '10583', password: 'SRI10583', name: 'SARNAN' },
  { username: '10592', password: 'SRI10592', name: 'SUPRIYO' },
  { username: '10658', password: 'SRI10658', name: 'BIBIH SURYADI P' },
  { username: '10759', password: 'SRI10759', name: 'ASIKIN' },
  { username: '10822', password: 'SRI10822', name: 'ALBERI ROMADA' },
  { username: '10872', password: 'SRI10872', name: 'DIAN SETIAWAN S' },
  { username: '11210', password: 'SRI11210', name: 'RAHMAT' },
  { username: '11245', password: 'SRI11245', name: 'KOMARUDIN' },
  { username: '11322', password: 'SRI11322', name: 'SUKRI PENDI' },
  { username: '10184', password: 'SRI10184', name: 'NANANG SURYANA' },
  { username: '10821', password: 'SRI10821', name: 'ADI MUNANDAR' },
  { username: '10887', password: 'SRI10887', name: 'ADI PRIYANTO' },
  { username: '11191', password: 'SRI11191', name: 'INDRA' },
  { username: '11244', password: 'SRI11244', name: 'SIDIK DANU. S' },
  { username: '11326', password: 'SRI11326', name: 'YUDA LESMANA' },
  { username: '10615', password: 'SRI10615', name: 'RYAN WIRYAWAN' },
  { username: '10356', password: 'SRI10356', name: 'EKO WAHYUDI' },
  { username: '10506', password: 'SRI10506', name: 'PRAMONO' },
  { username: '10382', password: 'SRI10382', name: 'SAROSA SANTOSO DJ' },
  { username: '10719', password: 'SRI10719', name: 'ACEP AWALUDIN' },
  { username: '10426', password: 'SRI10426', name: 'SUTARNO' },
  { username: '10263', password: 'SRI10263', name: 'MACHFUD' },
  { username: '11561', password: 'SRI11561', name: 'BAMBANG' },
  { username: '66634', password: 'SRI66634', name: 'ADITYA FAJAR N.' },
  { username: '10418', password: 'SRI10418', name: 'MARSUDI' }
];

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === 'ADMIN' && password === 'Admin123') {
      onLogin('admin', 'ADMIN');
      return;
    }

    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      // Allow access to all menus for listed users as well by providing 'admin' role
      onLogin('admin', user.name);
      return;
    }

    setError('Username atau Password salah');
  };

  return (
    <div className="min-h-screen bg-[#080b14] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
          {/* Header/Logo */}
          <div className="text-center mb-10">
            <div className="mx-auto w-16 h-16 bg-orange-600/10 border border-orange-500/20 rounded-full flex items-center justify-center mb-4 relative">
              <ShieldAlert className="h-8 w-8 text-orange-500" />
              <div className="absolute inset-0 border border-orange-500/30 rounded-full animate-ping opacity-20"></div>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mb-2 uppercase">Mixing Produksi 1</h1>
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Portal Kerja Foreman & Teknisi</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 text-center">
                <p className="text-xs font-bold text-rose-400">{error}</p>
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-orange-500/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                  placeholder="Masukkan NRP atau ADMIN"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/50 border border-slate-800 focus:border-orange-500/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                  placeholder="Masukkan Password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl text-sm tracking-wide uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-900/20"
            >
              <LogIn className="h-4 w-4" />
              Masuk
            </button>
            <div className="text-center pt-2">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">created by : QCC TRANSFORMIX</span>
            </div>
          </form>
          
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
