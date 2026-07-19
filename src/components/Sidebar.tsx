import React from 'react';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  ShieldAlert, 
  FileCheck, 
  Radio, 
  BrainCircuit, 
  BookOpen,
  Map,
  ClipboardCheck,
  Menu,
  X,
  ShieldAlert as ShieldIcon,
  LogOut,
  Cloud
} from 'lucide-react';

export type ActivePageType = 
  | 'dashboard' 
  | 'logs' 
  | 'form' 
  | 'patrol4ks'
  | 'patrol_logs'
  | 'scrap_monitoring'
  | 'culture'
  | 'mapping_area';

interface SidebarProps {
  activePage: ActivePageType;
  onPageChange: (page: ActivePageType) => void;
  isOpen: boolean;
  onToggle: () => void;
  role?: 'admin' | 'user';
  onLogout?: () => void;
  username?: string;
  gUser?: any;
  gToken?: string | null;
  onGoogleSignIn?: () => void;
  onGoogleSignOut?: () => void;
}

export default function Sidebar({ 
  activePage, 
  onPageChange, 
  isOpen, 
  onToggle, 
  role = 'admin', 
  onLogout, 
  username,
  gUser,
  gToken,
  onGoogleSignIn,
  onGoogleSignOut
}: SidebarProps) {
  const allMenuItems = [
    {
      id: 'dashboard' as ActivePageType,
      label: 'Dashboard Mixing',
      sub: 'Main Dashboard',
      icon: LayoutDashboard,
      color: 'text-orange-500',
      adminOnly: true
    },
    {
      id: 'patrol4ks' as ActivePageType,
      label: 'Patrol 4K+S Teknisi',
      sub: 'Checklist Patroli 4K+S',
      icon: ClipboardCheck,
      color: 'text-lime-400',
      adminOnly: false
    },
    {
      id: 'patrol_logs' as ActivePageType,
      label: 'Arsip Temuan Patrol',
      sub: 'Temuan NG Patrol 4K+S',
      icon: FileSpreadsheet,
      color: 'text-sky-400',
      adminOnly: true
    },
    {
      id: 'mapping_area' as ActivePageType,
      label: 'Mapping Area Genba',
      sub: 'PIC Penanggung Jawab Area',
      icon: Map,
      color: 'text-emerald-500',
      adminOnly: false
    },
    {
      id: 'form' as ActivePageType,
      label: 'Form Kesesuaian IK Mixing',
      sub: 'Temuan Pelaksanaan IK',
      icon: FileCheck,
      color: 'text-amber-500',
      adminOnly: false
    },
    {
      id: 'logs' as ActivePageType,
      label: 'Arsip Temuan',
      sub: 'Kesesuaian IK Mixing',
      icon: FileSpreadsheet,
      color: 'text-blue-400',
      adminOnly: true
    },
    {
      id: 'scrap_monitoring' as ActivePageType,
      label: 'Monitoring Scrap',
      sub: 'Data Scrap Compound Mixing',
      icon: FileSpreadsheet,
      color: 'text-indigo-400',
      adminOnly: true
    },
    {
      id: 'culture' as ActivePageType,
      label: 'Culture pRide',
      sub: 'E-book Budaya Organisasi',
      icon: BookOpen,
      color: 'text-red-500'
    }
  ];

  const menuItems = allMenuItems.filter(item => role === 'admin' || !item.adminOnly);

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Navigation Panel */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800 bg-[#090d1a] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header/Logo Brand */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/15 text-orange-500 ring-1 ring-orange-500/30">
              <ShieldIcon className="h-5 w-5 animate-pulse-slow" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-sans text-base font-extrabold tracking-tight text-white">
                  Mixing <span className="text-orange-500">Pro.1</span>
                </h2>
              </div>
              <p className="text-[10px] font-mono font-bold tracking-wider text-slate-500">
                Seputar Info Mixing
              </p>
            </div>
          </div>
          
          <button 
            onClick={onToggle}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Info Bar */}
        {username && (
          <div className="px-6 py-3 border-b border-slate-800/50 bg-slate-900/20 shrink-0">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-mono">
                <span className="text-slate-500">Masuk sebagai: </span>
                <span className="text-emerald-400 font-bold">{username}</span>
              </div>
              {onLogout && (
                <button 
                  onClick={onLogout}
                  className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  title="Keluar"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation Menu Links */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  if (window.innerWidth < 1024) {
                    onToggle(); // Close sidebar on mobile select
                  }
                }}
                className={`group flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-left transition-all duration-150 relative cursor-pointer ${
                  isActive 
                    ? 'bg-orange-600/10 border border-orange-500/30 text-white font-semibold' 
                    : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-100 border border-transparent'
                }`}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-orange-500 rounded-r" />
                )}
                
                <div className={`p-1 rounded transition-colors ${
                  isActive ? 'bg-orange-500/20 ' + item.color : 'text-slate-500 group-hover:text-slate-300'
                }`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                
                <div className="flex-1">
                  <div className="text-xs">{item.label}</div>
                  <div className="text-[9px] font-mono text-slate-500 group-hover:text-slate-400">
                    {item.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Google Drive Storage Sync Section */}
        <div className="border-t border-slate-800 bg-[#060a14]/60 p-4 shrink-0 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Cloud className="h-4 w-4 text-sky-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Penyimpanan G-Drive</span>
            </div>
            {gToken ? (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" title="Terhubung"></span>
              </span>
            ) : (
              <span className="h-2 w-2 rounded-full bg-slate-600" title="Belum Terhubung"></span>
            )}
          </div>

          {gToken ? (
            <div className="space-y-2">
              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded p-2 text-[10px] font-mono text-emerald-400 leading-snug">
                <div className="font-bold uppercase tracking-wide text-[9px]">Google Drive Aktif</div>
                <div className="text-slate-400 mt-0.5 truncate text-[8px]">{gUser?.email}</div>
              </div>
              <button
                onClick={onGoogleSignOut}
                className="w-full rounded bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 font-bold text-[8px] py-1.5 uppercase tracking-wider cursor-pointer text-center transition-colors font-mono"
              >
                Putuskan GDrive
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-[8px] text-slate-500 leading-relaxed">
                Hubungkan akun Google untuk menyimpan arsip PDF laporan langsung ke Google Drive.
              </p>
              <button
                onClick={onGoogleSignIn}
                className="w-full rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-[8px] py-1.5 uppercase tracking-widest cursor-pointer text-center flex items-center justify-center gap-1 transition-colors font-mono shadow-md"
              >
                <Cloud className="h-3 w-3" /> HUBUNGKAN GDRIVE
              </button>
            </div>
          )}
        </div>

        {/* Safety Quote/Slogan Footer */}
        <div className="border-t border-slate-800 bg-[#060a14] p-4 text-center shrink-0">
          <div className="rounded-lg bg-orange-600/5 border border-orange-500/10 p-3">
            <p className="text-[9px] font-bold text-orange-400 tracking-wider font-mono">HARI TANPA KECELAKAAN</p>
            <p className="text-lg font-black text-white mt-1 font-mono">191 HARI</p>
            <p className="text-[9px] text-slate-500 font-sans mt-1">Utamakan keselamatan keluarga menanti di rumah</p>
          </div>
        </div>
      </aside>
    </>
  );
}
