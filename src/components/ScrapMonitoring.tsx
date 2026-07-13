import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, FileSpreadsheet } from 'lucide-react';

interface ScrapData {
  [key: string]: string[]; // key -> array of 31 strings (representing daily values)
}

const CATEGORIES = [
  { isHeader: true, name: 'INTERNAL' },
  { id: 'int_1', name: 'COMP CLEANING MKXDQ', wst: 'WST-025' },
  { id: 'int_2', name: 'COMP CLEANING MKXDN', wst: 'WST-025' },
  { id: 'int_3', name: 'COMP CLEANING MKXDB', wst: 'WST-025' },
  { id: 'int_4', name: 'TROUBLE PROSES DISPOSISI (SELAIN REWORK)', wst: 'TIDAK YAKE WST-004 / JIKA YAKE WST-025' },
  { id: 'int_5', name: 'DISPOSISI EXPIRED', wst: 'TIDAK YAKE WST-004 / JIKA YAKE WST-025' },
  { id: 'int_6', name: 'TROUBLE PROSES FORMAT APD', wst: 'WST-004' },
  { id: 'int_7', name: 'TROUBLE PROSES MISS PROD', wst: 'TIDAK YAKE WST-004 / JIKA YAKE WST-025' },
  { isHeader: true, name: 'EKSTERNAL' },
  { id: 'eks_1', name: 'COMPOUND EX-TEST QC LAB', wst: 'TIDAK YAKE WST-004 / JIKA YAKE WST-025' },
  { id: 'eks_2', name: 'BONGKARAN HEAD EXT. BY EXTASS', wst: 'TIDAK YAKE WST-004 / JIKA YAKE WST-025' },
  { id: 'eks_3', name: 'SCRAP HASIL STRAINER (BONGKARAN HEAD)', wst: 'WST-025' },
  { id: 'eks_4', name: 'SCRAP HASIL STRAINER (TREAD)', wst: 'WST-025' },
  { id: 'eks_5', name: 'SCRAP HASIL STRAINER (SHEET COMP)', wst: 'WST-025' },
  { id: 'eks_6', name: 'DISPOSISI COMP YAKE SAPS', wst: 'WST-025' },
  { id: 'eks_7', name: 'REWORK YAKE (TREAD)', wst: 'WST-025' },
  { id: 'eks_8', name: 'REWORK YAKE (SHEET COMP)', wst: 'WST-025' },
  { id: 'eks_9', name: 'REWORK IL YAKE', wst: 'WST-025' },
  { id: 'eks_10', name: 'REWORK G/TUBE YAKE', wst: 'WST-025' },
  { id: 'eks_11', name: 'TRIAL R&D', wst: 'TIDAK YAKE WST-004 / JIKA YAKE WST-025' },
  { isHeader: true, name: 'TROUBLE MESIN' },
  { id: 'mes_1', name: 'MASTER BATCH', wst: 'WST-025' },
  { id: 'mes_2', name: 'FINAL BATCH', wst: 'TIDAK YAKE WST-004 / JIKA YAKE WST-025' },
  { isHeader: true, name: 'TOTAL', isTotal: true, id: 'total_1' },
  { isHeader: true, name: 'LAIN-LAIN' },
  { id: 'lain_1_1', name: 'PROVISI :', wst: 'TIDAK YAKE WST-004' },
  { id: 'lain_1_2', name: 'PROVISI :', wst: 'JIKA YAKE WST-025', hideName: true },
  { id: 'lain_2_1', name: 'PROJECT SCRAP :', wst: 'TIDAK YAKE WST-004' },
  { id: 'lain_2_2', name: 'PROJECT SCRAP :', wst: 'JIKA YAKE WST-025', hideName: true },
  { id: 'lain_3_1', name: 'SCRAP UJI LAB 1', wst: 'TIDAK YAKE WST-004' },
  { id: 'lain_3_2', name: 'SCRAP UJI LAB 1', wst: 'JIKA YAKE WST-025', hideName: true },
  { id: 'lain_4_1', name: 'SCRAP UJI LAB 2', wst: 'TIDAK YAKE WST-004' },
  { id: 'lain_4_2', name: 'SCRAP UJI LAB 2', wst: 'JIKA YAKE WST-025', hideName: true },
  { isHeader: true, name: 'TOTAL', isTotal: true, id: 'total_2' },
  { isHeader: true, name: 'TOTAL SCRAP COMPOUND', isGrandTotal: true, id: 'grand_total' },
];

export default function ScrapMonitoring() {
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [data, setData] = useState<ScrapData>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Days array 1..31
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  useEffect(() => {
    fetchData(currentMonth);
  }, [currentMonth]);

  const fetchData = async (month: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/scrap?month=${month}`);
      const json = await res.json();
      setData(json || {});
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');
    try {
      const res = await fetch('/api/scrap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ month: currentMonth, data }),
      });
      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      console.error(e);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (id: string, dayIndex: number, value: string) => {
    setData((prev) => {
      const newData = { ...prev };
      if (!newData[id]) {
        newData[id] = Array(31).fill('');
      }
      const newArray = [...newData[id]];
      newArray[dayIndex] = value;
      newData[id] = newArray;
      return newData;
    });
  };

  const calculateRowTotal = (id: string) => {
    if (!data[id]) return 0;
    return data[id].reduce((sum, val) => sum + (Number(val) || 0), 0);
  };

  const calculateColumnTotal = (dayIndex: number, section: 'main' | 'lain') => {
    let sum = 0;
    let inSection = section === 'main';
    for (const item of CATEGORIES) {
      if (item.name === 'LAIN-LAIN') {
        inSection = section === 'lain';
      }
      if (item.isHeader) continue;
      if (inSection && item.id && data[item.id]) {
        sum += Number(data[item.id][dayIndex]) || 0;
      }
    }
    return sum;
  };

  const calculateGrandColumnTotal = (dayIndex: number) => {
    let sum = 0;
    for (const item of CATEGORIES) {
      if (item.isHeader) continue;
      if (item.id && data[item.id]) {
        sum += Number(data[item.id][dayIndex]) || 0;
      }
    }
    return sum;
  };

  const getMonthName = (dateStr: string) => {
    const d = new Date(dateStr + '-01');
    return d.toLocaleString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  };

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 md:p-6 shadow-lg space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-sans text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-indigo-500" />
            MONITORING SCRAP COMPOUND MIXING
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Input harian data scrap per bulan</p>
        </div>
        
        <div className="flex items-center gap-4">
          <input 
            type="month" 
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded text-sm font-semibold transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Menyimpan...' : 'Simpan Data'}
          </button>
        </div>
      </div>

      {saveStatus === 'success' && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded text-sm flex items-center gap-2">
          Data berhasil disimpan!
        </div>
      )}
      {saveStatus === 'error' && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-2 rounded text-sm flex items-center gap-2">
          Gagal menyimpan data. Silakan coba lagi.
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400 font-mono">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-indigo-500 mr-2 align-middle"></span>
          MEMUAT DATA...
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-800 rounded bg-slate-950">
          <div className="text-center py-2 bg-slate-900 border-b border-slate-800">
            <h4 className="text-lg font-bold text-white tracking-widest">{getMonthName(currentMonth)}</h4>
          </div>
          <table className="w-full text-left text-[10px] sm:text-xs text-slate-300 border-collapse whitespace-nowrap">
            <thead className="bg-slate-900 text-slate-400 font-semibold uppercase font-mono">
              <tr>
                <th className="px-2 py-2 border-r border-b border-slate-800 sticky left-0 bg-slate-900 z-10 w-48 min-w-[200px]">KATEGORI WST</th>
                {days.map(d => (
                  <th key={d} className="px-1 py-2 border-r border-b border-slate-800 text-center w-10 min-w-[40px]">{d}</th>
                ))}
                <th className="px-2 py-2 border-b border-slate-800 text-center bg-slate-900/50 w-16 min-w-[64px]">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((item, idx) => {
                if (item.isTotal) {
                  // Total row
                  const isLain = item.id === 'total_2';
                  let sumOfTotals = 0;
                  return (
                    <tr key={`total_${idx}`} className="bg-slate-900 font-bold">
                      <td className="px-2 py-1.5 border-r border-b border-slate-800 sticky left-0 bg-slate-900 z-10 text-center uppercase">TOTAL</td>
                      {days.map((_, i) => {
                        const colTotal = calculateColumnTotal(i, isLain ? 'lain' : 'main');
                        sumOfTotals += colTotal;
                        return (
                          <td key={i} className="px-1 py-1 border-r border-b border-slate-800 text-center bg-slate-800/30">
                            {colTotal || ''}
                          </td>
                        );
                      })}
                      <td className="px-1 py-1 border-b border-slate-800 text-center bg-slate-800/50 text-emerald-400">
                        {sumOfTotals || 0}
                      </td>
                    </tr>
                  );
                }

                if (item.isGrandTotal) {
                  let sumOfTotals = 0;
                  return (
                    <tr key={`gtotal`} className="bg-emerald-900/20 font-bold text-emerald-400">
                      <td className="px-2 py-2 border-r border-b border-slate-800 sticky left-0 bg-emerald-950 z-10">{item.name}</td>
                      {days.map((_, i) => {
                        const colTotal = calculateGrandColumnTotal(i);
                        sumOfTotals += colTotal;
                        return (
                          <td key={i} className="px-1 py-1 border-r border-b border-slate-800 text-center">
                            {colTotal || ''}
                          </td>
                        );
                      })}
                      <td className="px-1 py-1 border-b border-slate-800 text-center text-emerald-300">
                        {sumOfTotals || 0}
                      </td>
                    </tr>
                  );
                }

                if (item.isHeader) {
                  return (
                    <tr key={`header_${idx}`} className="bg-slate-800/50 font-bold">
                      <td colSpan={33} className="px-2 py-1.5 border-b border-slate-800 text-white uppercase sticky left-0">
                        {item.name}
                      </td>
                    </tr>
                  );
                }

                const rowTotal = item.id ? calculateRowTotal(item.id) : 0;

                return (
                  <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="border-r border-b border-slate-800 sticky left-0 bg-slate-950 z-10 p-0">
                      <div className="flex flex-col justify-center h-full min-h-[40px] px-2 py-1">
                        {!item.hideName && <span className="font-semibold text-slate-200 leading-tight">{item.name}</span>}
                        <span className="text-[9px] text-slate-500 font-mono leading-tight">{item.wst}</span>
                      </div>
                    </td>
                    {days.map((_, i) => (
                      <td key={i} className="border-r border-b border-slate-800 p-0">
                        <input
                          type="number"
                          min="0"
                          value={item.id && data[item.id] ? data[item.id][i] : ''}
                          onChange={(e) => item.id && handleInputChange(item.id, i, e.target.value)}
                          className="w-full h-full min-h-[40px] bg-transparent text-center focus:bg-indigo-900/20 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-indigo-500"
                        />
                      </td>
                    ))}
                    <td className="border-b border-slate-800 text-center font-bold bg-slate-900/30">
                      {rowTotal || 0}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
