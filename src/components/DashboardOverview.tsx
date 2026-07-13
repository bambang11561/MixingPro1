import React, { useState, useEffect } from 'react';
import { DashboardStats } from '../types';
import { ShieldCheck, Calendar, Skull, HeartHandshake, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import PatrolCharts from './PatrolCharts';

interface DashboardOverviewProps {
  stats: DashboardStats;
  loading: boolean;
  onRefresh: () => void;
}

export default function DashboardOverview({ stats, loading, onRefresh }: DashboardOverviewProps) {
  const [tickingHours, setTickingHours] = useState(stats.safeManHours);

  // Smoothly increment man hours every few seconds to simulate real-time work in progress
  useEffect(() => {
    setTickingHours(stats.safeManHours);
  }, [stats.safeManHours]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickingHours(prev => prev + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  const safetyTips = [
    "1. Memastikan kondisi badan sehat dan siap untuk bekerja.",
    "2. Mematuhi setiap Standar Operasional Prosedur (SOP).",
    "3. Menggunakan Alat Pelindung Diri sesuai standar yang berlaku.",
    "4. Menggunakan Peralatan sesuai dengan fungsi dan peruntukkannya.",
    "5. Mengisi autonomous maintenance mesin/peralatan dan memastikan setiap safety device berfungsi dengan baik.",
    "6. Menghentikan pekerjaan tidak aman yang berpotensi kecelakaan dan bekerja sesuai dengan tanggung jawab dan wewenangnya.",
    "7. Wajib dilengkapi Surat Izin Operator (SIO) & Surat Izin Layaj Operasi (SILO) untuk mengoperasikan alat berdampak K3.",
    "8. Mengajukan izin saat melakukan pekerjaan berpotensi bahaya tinggi.",
    "9. Aman berlalu lintas saat berada di area pabrik dan jalan raya.",
    "10. Menjaga lingkungan kerja tetap tertib,rapi & bersih."
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % safetyTips.length);
    }, 10000);
    return () => clearInterval(tipInterval);
  }, []);

  return (
    <div className="space-y-6" id="dashboard-overview">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-orange-500" />
          RINGKASAN KONDISI AREA PRODUKSI
        </h2>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          SINKRONISASI DATA
        </button>
      </div>

      {/* KPI Core Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:grid-cols-3">

        {/* Total Patrol 4K+S NG */}
        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Patrol 4K+S</span>
              <div className="font-mono text-xl xl:text-2xl font-black text-amber-500 tracking-tight">
                {formatNumber(stats.totalPatrolNG || 0)} NG
              </div>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500 ring-1 ring-amber-500/20 shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-[10px] text-slate-400 font-mono">
            Total Temuan NG Teknisi
          </p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-amber-500"></div>
        </div>

        {/* Total Ketidaksesuaian IK */}
        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Ketidaksesuaian IK</span>
              <div className="font-mono text-xl xl:text-2xl font-black text-blue-400 tracking-tight">
                {stats.totalReports} Laporan
              </div>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400 ring-1 ring-blue-500/20 shrink-0">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 font-mono text-[9px]">
            <span className="text-rose-400 font-bold">O:{stats.openReports}</span>
            <span className="text-yellow-400 font-bold">W:{stats.inProgressReports}</span>
            <span className="text-emerald-400 font-bold">C:{stats.resolvedReports}</span>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-500"></div>
        </div>

        {/* Total Scrap Mixing */}
        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Scrap Mixing</span>
              <div className="font-mono text-xl xl:text-2xl font-black text-indigo-400 tracking-tight">
                {formatNumber(stats.totalScrap || 0)} Kg
              </div>
            </div>
            <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400 ring-1 ring-indigo-500/20 shrink-0">
              <RefreshCw className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-[10px] text-slate-400 font-mono">
            Bulan Ini
          </p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-indigo-500"></div>
        </div>

      </div>

      {/* Safety Alert Ribbon & Safety Quote */}
      <div className="rounded-xl bg-orange-600/10 border border-orange-500/20 p-4 shadow-lg flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2 text-orange-500 font-bold text-xs shrink-0 font-mono tracking-wider">
          <AlertCircle className="h-5 w-5 text-orange-500 animate-bounce" />
          SAFETY GOLDEN RULES HARI INI :
        </div>
        <div className="text-xs text-slate-200 leading-relaxed italic">
          "{safetyTips[currentTipIndex]}"
        </div>
      </div>

      <PatrolCharts />
    </div>
  );
}
