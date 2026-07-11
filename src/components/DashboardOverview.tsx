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
    "6..",
    "7..",
    "8..",
    "9..",
    "10.."
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
          RINGKASAN METRIK KONDISI AREA PRODUKSI
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Safe Man Hours */}
        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Jam Kerja Aman (SMH)</span>
              <div className="font-mono text-2xl font-black text-emerald-400 tracking-tight">
                {formatNumber(tickingHours)}
              </div>
            </div>
            <div className="rounded-lg bg-emerald-500/10 p-2.5 text-emerald-400 ring-1 ring-emerald-500/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-3 text-xs text-emerald-500 flex items-center gap-1 font-mono">
            ● NO LTI (Lost Time Injury)
          </p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-emerald-500"></div>
        </div>

        {/* Days Without Accident */}
        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Hari Tanpa Kecelakaan</span>
              <div className="font-mono text-2xl font-black text-amber-500 tracking-tight">
                {formatNumber(stats.daysWithoutAccident)} Hari
              </div>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-2.5 text-amber-500 ring-1 ring-amber-500/20">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-400 font-mono">
            Mulai Sejak: 01 Jan 2026
          </p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-amber-500"></div>
        </div>

        {/* Total Accident (Zero Target) */}
        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Kecelakaan Kerja</span>
              <div className="font-mono text-2xl font-black text-rose-500 tracking-tight">
                {stats.totalAccidents}
              </div>
            </div>
            <div className="rounded-lg bg-rose-500/10 p-2.5 text-rose-400 ring-1 ring-rose-500/20">
              <Skull className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-3 text-xs text-rose-400 font-semibold flex items-center gap-1 font-mono">
            ★ TARGET: ZERO ACCIDENT
          </p>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-rose-500"></div>
        </div>

        {/* Total Safety Reports Filed */}
        <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Temuan ketidaksesuaian IK</span>
              <div className="font-mono text-2xl font-black text-blue-400 tracking-tight">
                {stats.totalReports} Laporan
              </div>
            </div>
            <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400 ring-1 ring-blue-500/20">
              <FileText className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 font-mono text-[10px]">
            <span className="text-rose-400 font-bold">O: {stats.openReports}</span>
            <span className="text-yellow-400 font-bold">WIP: {stats.inProgressReports}</span>
            <span className="text-emerald-400 font-bold">C: {stats.resolvedReports}</span>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-blue-500"></div>
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
