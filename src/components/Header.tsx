import React, { useState, useEffect } from 'react';
import { Shield, Radio, Flame, AlertTriangle, Clock, Menu } from 'lucide-react';

interface HeaderProps {
  onSidebarToggle?: () => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <header className="border-b border-slate-800 bg-[#0c1222] px-6 py-4 shrink-0" id="hse-header">
      <div className="mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu on Mobile */}
            <button 
              onClick={onSidebarToggle}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-orange-600/15 text-orange-500 ring-1 ring-orange-500/30">
              <Shield className="h-6 w-6 animate-pulse-slow" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans text-lg lg:text-xl font-extrabold tracking-tight text-white uppercase">
                Mixing <span className="text-orange-500">Pro.1</span>
                </h1>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] lg:text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                  SEPUTAR INFO MIXING
                </span>
              </div>
              <p className="text-[10px] lg:text-xs text-slate-400">
                Sistem Pelaporan & Pemantauan Keselamatan Kerja Real-Time
              </p>
            </div>
          </div>
        </div>

        {/* Real-Time Clock & Metrics */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6">
          
          {/* Site Status Indicator */}
          <div className="flex items-center gap-2 rounded-lg bg-emerald-950/20 px-3 py-1.5 ring-1 ring-emerald-500/20">
            <Radio className="h-4 w-4 animate-pulse text-emerald-400" />
            <div className="text-left">
              <div className="font-mono text-[9px] text-slate-400 uppercase tracking-wider leading-none">STATUS AREA PRODUKSI</div>
              <div className="text-[11px] font-bold text-emerald-400">KONDISI AMAN (HIJAU)</div>
            </div>
          </div>

          {/* Time & Date Display */}
          <div className="flex items-center gap-3 rounded-lg bg-slate-900/60 px-4 py-1.5 ring-1 ring-slate-800">
            <Clock className="h-4 w-4 text-orange-500" />
            <div className="text-left">
              <div className="font-mono text-[11px] font-bold text-slate-100 leading-none">
                {formatTime(time)} WIB
              </div>
              <div className="text-[9px] text-slate-400">
                {formatDate(time)}
              </div>
            </div>
          </div>

          {/* Emergency Alert Button */}
          <div className="flex items-center gap-2 rounded-lg bg-red-950/20 px-3 py-1.5 ring-1 ring-red-500/20">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <div className="text-left">
              <div className="font-mono text-[9px] text-slate-400 uppercase tracking-wider leading-none">PANGGILAN DARURAT</div>
              <a href="tel:112" className="text-[11px] font-bold text-red-400 hover:underline">
                0812-5000-0700
              </a>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
