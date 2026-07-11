import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { ClipboardCheck, Calendar } from 'lucide-react';

const techniciansA = [
  'MUHAMMAD NASIR', 'SURMAN', 'QODRI WAKHID S', 'SARNAN', 'SUPRIYO', 
  'BIBIH SURYADI P', 'ASIKIN', 'ALBERI ROMADA', 'DIAN SETIAWAN S', 
  'RAHMAT', 'KOMARUDIN', 'SUKRI PENDI'
];

const techniciansF = [
  'NANANG SURYANA', 'ADI MUNANDAR', 'ADI PRIYANTO', 'INDRA', 
  'SIDIK DANU. S', 'YUDA LESMANA'
];

const months = [
  { value: 0, label: 'Januari' },
  { value: 1, label: 'Februari' },
  { value: 2, label: 'Maret' },
  { value: 3, label: 'April' },
  { value: 4, label: 'Mei' },
  { value: 5, label: 'Juni' },
  { value: 6, label: 'Juli' },
  { value: 7, label: 'Agustus' },
  { value: 8, label: 'September' },
  { value: 9, label: 'Oktober' },
  { value: 10, label: 'November' },
  { value: 11, label: 'Desember' }
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded shadow-lg">
        <p className="text-white text-xs font-bold mb-1">{label}</p>
        <p className="text-sky-400 text-xs font-mono">
          Temuan: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export default function PatrolCharts() {
  const [activeTab, setActiveTab] = useState<'A' | 'F'>('A');
  const [patrols, setPatrols] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchPatrols = async () => {
      try {
        const response = await fetch('/api/patrols');
        if (response.ok) {
          const data = await response.json();
          setPatrols(data);
        }
      } catch (error) {
        console.warn('Network issue fetching patrols:', error);
      }
    };
    
    fetchPatrols();
    // Setting an interval to auto-refresh data
    const interval = setInterval(fetchPatrols, 10000);
    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    const isAreaA = activeTab === 'A';
    const areaFilter = isAreaA ? 'MIXING A' : 'MIXING F';
    const baseTechnicians = isAreaA ? techniciansA : techniciansF;

    // Filter patrols by selected month, year, and area
    const filteredPatrols = patrols.filter(p => {
      const pDate = new Date(p.date);
      return (
        p.area === areaFilter &&
        pDate.getMonth() === selectedMonth &&
        pDate.getFullYear() === selectedYear
      );
    });

    // Aggregate ngCount by technician
    const aggregated = filteredPatrols.reduce((acc: Record<string, number>, p) => {
      acc[p.technician] = (acc[p.technician] || 0) + (p.ngCount || 0);
      return acc;
    }, {});

    // Map to base technicians list to ensure everyone is shown even with 0 findings
    return baseTechnicians.map(tech => ({
      name: tech,
      value: aggregated[tech] || 0
    }));
  }, [patrols, activeTab, selectedMonth, selectedYear]);

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 shadow-lg mt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-sky-500/10 p-2 text-sky-400 ring-1 ring-sky-500/20">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold text-white tracking-wide uppercase">
              Grafik Temuan NG Genba 4K+S Teknisi
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 font-mono">REKAPITULASI LAPORAN</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Month/Year Filters */}
          <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-slate-700">
            <Calendar className="h-4 w-4 text-slate-400 ml-1" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer"
            >
              {months.map(m => (
                <option key={m.value} value={m.value} className="bg-slate-800">{m.label}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer border-l border-slate-600 pl-2"
            >
              {years.map(y => (
                <option key={y} value={y} className="bg-slate-800">{y}</option>
              ))}
            </select>
          </div>

          {/* Area Tabs */}
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setActiveTab('A')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeTab === 'A' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              MIXING A
            </button>
            <button
              onClick={() => setActiveTab('F')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-colors ${
                activeTab === 'F' ? 'bg-sky-500 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              MIXING F
            </button>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              allowDecimals={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={{ stroke: '#334155' }}
              tickLine={{ stroke: '#334155' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b' }} />
            <Bar 
              dataKey="value" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            >
              <LabelList dataKey="value" position="top" fill="#94a3b8" fontSize={10} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
