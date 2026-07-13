import React, { useState, useEffect, useMemo } from 'react';
import { FileSpreadsheet, MapPin, User, Calendar, AlertCircle, ChevronDown, ChevronUp, ClipboardCheck, Clock, CheckCircle, Download, Trash2 } from 'lucide-react';
import { ReportStatus } from '../types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface CheckItem {
  id: number;
  category: string;
  title: string;
  description: string;
}

const patrolItems: CheckItem[] = [
  // Ketertiban
  { id: 1, category: 'Ketertiban', title: 'Material dan/atau produk', description: 'Penempatan sesuai standar quality dan LK3 (tidak overload atau keluar dari layout), serta sesuai kebutuhan area kerja.' },
  { id: 2, category: 'Ketertiban', title: 'Bahan Berbahaya dan Beracun (B3)', description: 'Penempatan sesuai standar LK3 (Identitas area, harus disertai MSDS dan/atau label kemasan) dan sesuai kebutuhan area kerja.' },
  { id: 3, category: 'Ketertiban', title: 'P3K', description: 'Kotak P3K sesuai standar LK3: harus disertai list, tidak ada obat kadaluarsa, dan berisi sesuai list P3K.' },
  { id: 4, category: 'Ketertiban', title: 'Tools, equipment, kereta/rak, dan mesin', description: 'Penempatan tools, equipment, dan kereta/rak sesuai standar LK3 (tanpa modifikasi berbahaya dan penempatan sesuai area kerja). Mesin rusak disertai lock out tag out (LOTO).' },
  { id: 5, category: 'Ketertiban', title: 'Barang dan sampah', description: 'Terdapat identitas area/ penempatan. Menyingkirkan barang dan sampah yang tidak termasuk kebutuhan pekerjaan. Sampah terpilah sesuai jenisnya.' },
  { id: 6, category: 'Ketertiban', title: 'Hydrant, APAR, Fire Protection System (FPS)', description: 'Penempatan sesuai standar LK3 (identitas/ sign FPS, FPS tidak terhalang benda lain).' },
  { id: 7, category: 'Ketertiban', title: 'Instalasi Listrik, Pipa (angin, air, gas), dan Telepon', description: 'Sesuai standar LK3 (misal: kabel dalam konduit, jalur aman). Lampu penerangan, Kipas angin, AC, Exhaust fan, jalur pipa berfungsi.' },
  { id: 8, category: 'Ketertiban', title: 'Panel', description: 'Panel dalam kondisi standar LK3 (Identitas panel, PIC penanggung jawab, sign tegangan, sign voltase, kondisi lampu dan fan baik, ada cover panel).' },
  // Kerapihan
  { id: 9, category: 'Kerapihan', title: 'Identitas, Tanda, Label, dan MSDS', description: 'Kondisi baik: tidak boleh menggunakan tulisan tangan (HARUS Print/ cetak) dan tidak rusak/mengelupas/sobek.' },
  { id: 10, category: 'Kerapihan', title: 'Kondisi Lantai', description: 'Lantai dalam kondisi baik: 1. tidak memudar, 2. tidak terdapat lubang atau goresan, 3. permukaan rata.' },
  { id: 11, category: 'Kerapihan', title: 'Kondisi Dinding', description: 'Dinding dalam kondisi baik: 1. cat tidak mengelupas, 2. dinding tidak retak/tidak terdapat goresan, 3. tidak terdapat bekas benturan.' },
  { id: 12, category: 'Kerapihan', title: 'Kondisi Layout', description: 'Layout dalam kondisi baik: 1. tidak memudar, 2. tidak mengelupas.' },
  // Kebersihan
  { id: 13, category: 'Kebersihan', title: 'Kebersihan Umum (Lantai)', description: 'Lantai harus bersih: 1) bebas dari kotoran, 2) bebas dari noda kotor permanen, 3) tidak ada tumpahan cairan.' },
  { id: 14, category: 'Kebersihan', title: 'Kebersihan Umum (Dinding dan Atap)', description: 'Bebas dari kotoran, sarang laba-laba/coretan, noda kotor permanen, tidak ada rembesan/cipratan cairan.' },
  { id: 15, category: 'Kebersihan', title: 'Kebersihan Umum (Fasilitas Kerja Non-mesin)', description: 'Bagian meja kerja, lemari penyimpanan, fire protection harus bebas dari kotoran, sarang laba-laba, coretan, dan noda kotor permanen.' },
  { id: 16, category: 'Kebersihan', title: 'Kebersihan Umum (Jendela)', description: 'Jendela harus bebas dari kotoran, noda kotor, sarang laba-laba, dan coretan.' },
  { id: 17, category: 'Kebersihan', title: 'Kebersihan Khusus (Mesin / Equipment Produksi)', description: 'Mesin bebas dari kotoran, rembesan atau tetesan oli. Selang angin, steam & air tidak ada kebocoran. Semua indikator terbaca dengan baik.' },
  // Kelestarian
  { id: 18, category: 'Kelestarian', title: 'Standar Kegiatan 4K+S', description: 'Terdapat SO, PIC, Jadwal Kegiatan dan Checksheet Kegiatan 4K+S area yang update.' },
  { id: 19, category: 'Kelestarian', title: 'Followup Temuan LK3', description: 'Dilakukan tindakan perbaikan atas temuan audit 4K+S.' },
  // Shitsuke
  { id: 20, category: 'Shitsuke', title: 'Keteladanan dan keterlibatan pimpinan kerja', description: 'Keterlibatan pimpinan (Min Sect. Head) terhadap aktifitas 4K (Genba, clean day). Pimpinan kerja hadir dan terdokumentasi.' }
];

export default function PatrolLogs() {
  const [patrols, setPatrols] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [areaFilter, setAreaFilter] = useState<string>('ALL');

  const fetchPatrols = async () => {
    try {
      const response = await fetch('/api/patrols');
      if (response.ok) {
        const data = await response.json();
        setPatrols(data);
      }
    } catch (error) {
      console.warn('Network issue fetching patrols:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatrols();
  }, []);

  const handleDeletePatrol = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus laporan patroli ini?')) return;
    try {
      const response = await fetch(`/api/patrols/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPatrols();
      }
    } catch (error) {
      console.error('Error deleting patrol:', error);
    }
  };

  const getStatusIconAndColor = (status: ReportStatus) => {
    switch (status) {
      case 'Open':
        return { icon: <AlertCircle className="h-3.5 w-3.5 text-rose-500" />, textClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      case 'In Progress':
        return { icon: <Clock className="h-3.5 w-3.5 text-amber-500 animate-pulse" />, textClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'Resolved':
      case 'Closed':
        return { icon: <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />, textClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
      default:
        return { icon: <AlertCircle className="h-3.5 w-3.5 text-rose-500" />, textClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
    }
  };

  const handleStatusChange = async (patrolId: string, itemId: number, newStatus: ReportStatus) => {
    try {
      const response = await fetch(`/api/patrols/${patrolId}/items/${itemId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workingStatus: newStatus })
      });
      
      if (response.ok) {
        const updatedPatrol = await response.json();
        setPatrols(prev => prev.map(p => p.id === patrolId ? updatedPatrol : p));
      }
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB';
  };

  // Only show patrols that have NG findings (ngCount > 0)
  const filteredPatrols = useMemo(() => {
    return patrols
      .filter(p => p.ngCount > 0)
      .filter(p => areaFilter === 'ALL' || p.area === areaFilter)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [patrols, areaFilter]);

  const patrolRecapByDate = useMemo(() => {
    const recap: Record<string, Set<string>> = {};
    patrols.forEach(p => {
      // Use original patrols array, not filtered, so we see all daily patrols even if 0 NG
      if (areaFilter !== 'ALL' && p.area !== areaFilter) return;
      const date = p.date ? p.date.split('T')[0] : 'Unknown Date';
      if (!recap[date]) recap[date] = new Set();
      if (p.technician) recap[date].add(p.technician);
    });
    return Object.entries(recap)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
      .slice(0, 7) // Keep only recent 7 days
      .map(([date, techs]) => ({ date, technicians: Array.from(techs) }));
  }, [patrols, areaFilter]);

  const getNgItems = (itemsStatus?: Record<string, string>) => {
    if (!itemsStatus) return [];
    
    return Object.entries(itemsStatus)
      .filter(([_, status]) => status === 'not_ok')
      .map(([id]) => {
        const item = patrolItems.find(p => p.id === parseInt(id));
        return item;
      })
      .filter(Boolean) as CheckItem[];
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Laporan Temuan Patroli 4K+S', 14, 20);
    
    // Add generation date
    doc.setFontSize(10);
    doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 14, 28);
    
    // Prepare table data
    const tableData: any[] = [];
    
    filteredPatrols.forEach((patrol, index) => {
      const ngItems = getNgItems(patrol.itemsStatus);
      
      ngItems.forEach((item, itemIndex) => {
        const remark = patrol.itemsRemarks?.[item.id] || '-';
        const workingStatus = patrol.itemsWorkingStatus?.[item.id] || 'Open';
        
        tableData.push([
          itemIndex === 0 ? index + 1 : '',
          itemIndex === 0 ? new Date(patrol.date).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '',
          itemIndex === 0 ? patrol.area : '',
          itemIndex === 0 ? patrol.teknisi : '',
          item.title,
          remark,
          workingStatus
        ]);
      });
    });

    autoTable(doc, {
      startY: 35,
      head: [['No', 'Waktu', 'Area', 'Teknisi', 'Temuan', 'Keterangan', 'Status']],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [14, 165, 233] } // sky-500
    });

    doc.save('Laporan_Temuan_Patrol.pdf');
  };

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-6" id="patrol-logs-container">
      {/* Title & Filter bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-sans text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-sky-500" />
            ARSIP TEMUAN PATROL 4K+S TEKNISI ({filteredPatrols.length})
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Daftar laporan patroli yang memiliki temuan NG (Not Good)</p>
        </div>

        {/* Filters and Download */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={handleDownloadPDF}
            disabled={filteredPatrols.length === 0}
            className="flex items-center gap-1 rounded bg-sky-600/20 text-sky-400 hover:bg-sky-600/30 border border-sky-500/30 text-[11px] font-bold px-3 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-3.5 w-3.5" />
            UNDUH LAPORAN
          </button>
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="rounded bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300 px-2.5 py-1 focus:outline-none focus:border-sky-500/50"
          >
            <option value="ALL">Semua Area</option>
            <option value="MIXING A">MIXING A</option>
            <option value="MIXING F">MIXING F</option>
          </select>
        </div>
      </div>

      {/* REKAP PATROL HARIAN */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0">
         <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2 uppercase font-sans"><User className="h-4 w-4 text-emerald-500" /> Rekap Pelaksanaan Patrol Harian</h4>
         
         {patrolRecapByDate.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
             {patrolRecapByDate.map((recap, idx) => (
               <div key={idx} className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex flex-col gap-2">
                 <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded self-start flex items-center gap-1">
                   <Calendar className="h-3 w-3" />
                   {new Date(recap.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                 </div>
                 <div className="flex flex-wrap gap-1.5 mt-1">
                   {recap.technicians.map((tech, tIdx) => (
                     <span key={tIdx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded font-medium flex items-center gap-1">
                       <User className="h-3 w-3 text-slate-500" />
                       {tech}
                     </span>
                   ))}
                 </div>
               </div>
             ))}
           </div>
         ) : (
           <div className="text-xs text-slate-500 italic py-2">Belum ada data patrol harian.</div>
         )}
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400 font-mono">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-sky-500 mr-2 align-middle"></span>
          MEMUAT DATA PATROLI...
        </div>
      ) : filteredPatrols.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500 italic">
          Tidak ada temuan patroli (NG) yang cocok dengan filter saat ini.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPatrols.map((patrol) => {
            const isExpanded = expandedId === patrol.id;
            const ngItems = getNgItems(patrol.itemsStatus);
            
            return (
              <div
                key={patrol.id}
                className="rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 transition duration-150 overflow-hidden border-l-4 border-l-rose-500"
              >
                
                {/* Summary View Row */}
                <div
                  onClick={() => toggleExpand(patrol.id)}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    
                    {/* Badge headers */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {patrol.id}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 font-mono uppercase text-rose-400 bg-rose-500/10 border-rose-500/20">
                        <AlertCircle className="h-3 w-3" />
                        {patrol.ngCount} TEMUAN NG
                      </span>
                    </div>

                    {/* Report Text Short */}
                    <p className="font-semibold text-xs text-white flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-slate-400" />
                      Laporan Patrol 4K+S - {patrol.area}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400 font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        {patrol.area}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 text-slate-500" />
                        {patrol.technician}
                      </span>
                    </div>

                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(patrol.date)}
                    </span>
                    <button className="text-slate-500 hover:text-white p-1 rounded transition">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>

                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="border-t border-slate-900 bg-slate-900/40 p-4 space-y-4">
                    
                    <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Rincian Temuan NG (Not Good)</h4>
                    
                    {ngItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ngItems.map((item, idx) => {
                          const remark = patrol.itemsRemarks?.[item.id] || 'Tidak ada keterangan.';
                          return (
                            <div key={idx} className="bg-slate-950 p-3 rounded border border-rose-500/20 flex flex-col gap-2">
                              <div className="flex flex-col gap-1">
                                <div className="flex justify-between items-start gap-2">
                                  <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider">{item.category}</span>
                                  
                                  {/* Status Selector */}
                                  <div className="shrink-0 flex items-center gap-2">
                                    {getStatusIconAndColor(patrol.itemsWorkingStatus?.[item.id] || 'Open').icon}
                                    <select
                                      value={patrol.itemsWorkingStatus?.[item.id] || 'Open'}
                                      onChange={(e) => handleStatusChange(patrol.id, item.id, e.target.value as ReportStatus)}
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded outline-none cursor-pointer appearance-none ${getStatusIconAndColor(patrol.itemsWorkingStatus?.[item.id] || 'Open').textClass}`}
                                    >
                                      <option value="Open" className="bg-slate-900 text-rose-400">OPEN</option>
                                      <option value="In Progress" className="bg-slate-900 text-amber-400">IN PROGRESS</option>
                                      <option value="Closed" className="bg-slate-900 text-emerald-400">CLOSED</option>
                                    </select>
                                  </div>
                                </div>
                                <span className="text-xs font-semibold text-slate-200 mt-1">{item.title}</span>
                                <p className="text-[10px] text-slate-400 leading-relaxed border-b border-slate-800 pb-2">{item.description}</p>
                              </div>
                              <div className="bg-rose-500/5 p-2 rounded">
                                <p className="text-[10px] font-mono text-slate-400 uppercase mb-1">Keterangan:</p>
                                <p className="text-[11px] text-slate-300 italic">"{remark}"</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 italic bg-slate-950 p-3 rounded border border-slate-800">
                        Data spesifik item NG tidak direkam dalam format ini atau versi data terdahulu.
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => handleDeletePatrol(patrol.id)}
                        className="rounded bg-slate-800 hover:bg-rose-900/50 hover:text-rose-400 text-slate-400 border border-slate-700 hover:border-rose-500/50 font-bold text-[10px] px-3.5 py-1.5 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> HAPUS PATROL
                      </button>
                    </div>

                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
