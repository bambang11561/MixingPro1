import React, { useState } from 'react';
import { SafetyReport, ReportStatus, ReportType } from '../types';
import { ShieldAlert, AlertCircle, CheckCircle, Clock, MapPin, User, Tag, ChevronDown, ChevronUp, BrainCircuit, Download, Trash2, Pencil, Save, X } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ReportListProps {
  reports: SafetyReport[];
  loading: boolean;
  onStatusUpdate: (id: string, newStatus: ReportStatus) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, updatedData: Partial<SafetyReport>) => void;
}

export default function ReportList({ reports, loading, onStatusUpdate, onDelete, onEdit }: ReportListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<SafetyReport>>({});
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Laporan Ketidaksesuaian IK', 14, 20);
    
    // Add generation date
    doc.setFontSize(10);
    doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')}`, 14, 28);
    
    // Prepare table data
    const tableData = filteredReports.map((report, index) => {
      const auditeeMatch = report.description.match(/Auditee \(NRP\/Nama\):\s*(.*?)\s*\//);
      const auditee = auditeeMatch ? auditeeMatch[1] : report.category;
      
      return [
        index + 1,
        new Date(report.timestamp).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
        report.location,
        report.reporterName,
        auditee,
        report.status
      ];
    });

    autoTable(doc, {
      startY: 35,
      head: [['No', 'Waktu', 'Lokasi', 'Pelapor', 'Auditee/Kategori', 'Status']],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [249, 115, 22] } // orange-500
    });

    doc.save('Laporan_Ketidaksesuaian_IK.pdf');
  };

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getSeverityBadgeClass = (severity: string) => {
    switch (severity) {
      case 'Tinggi':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
      case 'Sedang':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'Rendah':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      default:
        return 'bg-slate-800 text-slate-400';
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

  const getReportTypeBorder = (type: ReportType) => {
    if (type.includes('KTA')) return 'border-l-4 border-l-rose-500';
    if (type.includes('TTA')) return 'border-l-4 border-l-amber-500';
    return 'border-l-4 border-l-emerald-500';
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' WIB';
  };

  // Filter logic
  const filteredReports = reports.filter(r => {
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchesType = typeFilter === 'ALL' || r.type.includes(typeFilter);
    return matchesStatus && matchesType;
  });

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-6" id="report-list-container">
      
      {/* Title & Filter bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="font-sans text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-orange-500" />
            DATA TEMUAN LAPORAN KETIDAKSESUIAN IK ({filteredReports.length})
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Arsip seluruh temuan ketidaksesuian IK </p>
        </div>

        {/* Filters and Download */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={handleDownloadPDF}
            disabled={filteredReports.length === 0}
            className="flex items-center gap-1 rounded bg-orange-600/20 text-orange-400 hover:bg-orange-600/30 border border-orange-500/30 text-[11px] font-bold px-3 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="h-3.5 w-3.5" />
            UNDUH LAPORAN
          </button>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded bg-slate-950 border border-slate-800 text-[11px] font-semibold text-slate-300 px-2.5 py-1 focus:outline-none focus:border-orange-500/50"
          >
            <option value="ALL">Semua Status</option>
            <option value="Open">Open (Menunggu)</option>
            <option value="In Progress">In Progress (Ditangani)</option>
            <option value="Closed">Closed (Selesai)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400 font-mono">
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-orange-500 mr-2 align-middle"></span>
          MEMUAT DATA SAFETY LOGS...
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-500 italic">
          Tidak ada laporan keselamatan kerja yang cocok dengan filter saat ini.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => {
            const isExpanded = expandedId === report.id;
            const statusConfig = getStatusIconAndColor(report.status);
            
            return (
              <div
                key={report.id}
                className={`rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 transition duration-150 overflow-hidden ${getReportTypeBorder(report.type)}`}
              >
                
                {/* Summary View Row */}
                <div
                  onClick={() => toggleExpand(report.id)}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    
                    {/* Badge headers */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {report.id}
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getSeverityBadgeClass(report.severity)}`}>
                        {report.severity}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 font-mono uppercase ${statusConfig.textClass}`}>
                        {statusConfig.icon}
                        {report.status}
                      </span>
                      
                      {report.aiAnalysis && (
                        <span className="text-[9px] font-mono font-bold text-orange-400 bg-orange-500/5 px-2 py-0.5 rounded border border-orange-500/20 flex items-center gap-1">
                          <BrainCircuit className="h-3 w-3 animate-pulse" />
                          ANALISIS AI
                        </span>
                      )}
                    </div>

                    {/* Report Text Short */}
                    <p className="font-semibold text-xs text-white leading-relaxed line-clamp-1">
                      {report.description}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400 font-mono pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        {report.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 text-slate-500" />
                        {report.reporterName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-slate-500" />
                        {report.description.match(/Auditee \(NRP\/Nama\):\s*(.*?)\s*\//) 
                          ? `Auditee Operator (NRP): ${report.description.match(/Auditee \(NRP\/Nama\):\s*(.*?)\s*\//)?.[1]}`
                          : report.category}
                      </span>
                    </div>

                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
                    <span className="text-[10px] text-slate-500 font-mono">{formatDate(report.timestamp)}</span>
                    <button className="text-slate-500 hover:text-white p-1 rounded transition">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>

                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="border-t border-slate-900 bg-slate-900/40 p-4 space-y-4">
                    
                    {/* Full Description & Action */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Deskripsi Lengkap Temuan</h4>
                        {editingId === report.id ? (
                          <textarea
                            value={editFormData.description || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                            className="w-full text-xs text-slate-200 leading-relaxed bg-slate-950 p-3 rounded border border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none min-h-[80px]"
                          />
                        ) : (
                          <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3 rounded border border-slate-800">
                            {report.description}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Tindakan Perbaikan Korektif (Corrective Action)</h4>
                        {editingId === report.id ? (
                          <textarea
                            value={editFormData.recommendedAction || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, recommendedAction: e.target.value })}
                            className="w-full text-xs text-emerald-300 leading-relaxed bg-slate-950 p-3 rounded border border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none min-h-[80px]"
                          />
                        ) : (
                          <p className="text-xs text-emerald-300 leading-relaxed bg-slate-950 p-3 rounded border border-slate-800">
                            {report.recommendedAction}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* AI Assessment Section if exists */}
                    {report.aiAnalysis && (
                      <div className="rounded-lg bg-orange-600/5 border border-orange-500/10 p-4 space-y-3">
                        <div className="flex items-center gap-1.5 border-b border-orange-500/10 pb-1.5">
                          <BrainCircuit className="h-4.5 w-4.5 text-orange-400" />
                          <h4 className="text-xs font-bold text-orange-400 font-mono tracking-wide">TINJAUAN TEKNIS K3 BERBASIS AI (GEMINI)</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono font-bold text-orange-400/80 uppercase">Asesmen Bahaya & Kategori</span>
                            <div className="text-slate-100 font-bold">{report.aiAnalysis.categoryRisk}</div>
                          </div>
                          <div className="space-y-1 md:col-span-2">
                            <span className="text-[9px] font-mono font-bold text-orange-400/80 uppercase">Skenario Akar Penyebab Pokok (Root Cause)</span>
                            <p className="text-slate-300 leading-relaxed font-sans">{report.aiAnalysis.rootCauseLikelihood}</p>
                          </div>
                        </div>

                        <div className="border-t border-orange-500/10 pt-3 text-xs space-y-1.5">
                          <span className="text-[9px] font-mono font-bold text-orange-400/80 uppercase block">Rencana Mitigasi Cepat Lapangan</span>
                          <ul className="list-decimal list-inside text-slate-300 space-y-1">
                            {report.aiAnalysis.immediateControls.map((ctrl, i) => (
                              <li key={i}>{ctrl}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="border-t border-orange-500/10 pt-2 text-xs">
                          <span className="text-[9px] font-mono font-bold text-orange-400/80 uppercase block">Rekomendasi Strategis Jangka Panjang</span>
                          <p className="text-slate-300 leading-relaxed mt-0.5">{report.aiAnalysis.aiSuggestion}</p>
                        </div>
                      </div>
                    )}

                    {/* Safety Officer Actions (Status Management) */}
                    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 border-t border-slate-900 pt-3">
                      <span className="text-[10px] text-slate-400 italic">
                        Ubah status kelayakan penanganan untuk menutup temuan safety ini.
                      </span>
                      
                      <div className="flex gap-2">
                        {editingId === report.id ? (
                          <>
                            <button
                              onClick={() => {
                                if (onEdit) {
                                  onEdit(report.id, editFormData);
                                  setEditingId(null);
                                }
                              }}
                              className="rounded bg-sky-600 hover:bg-sky-700 text-white font-bold text-[10px] px-3.5 py-1.5 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-colors"
                            >
                              <Save className="h-3.5 w-3.5" /> SIMPAN
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-[10px] px-3.5 py-1.5 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-colors"
                            >
                              <X className="h-3.5 w-3.5" /> BATAL
                            </button>
                          </>
                        ) : (
                          <>
                            {onEdit && (
                              <button
                                onClick={() => {
                                  setEditingId(report.id);
                                  setEditFormData({
                                    description: report.description,
                                    recommendedAction: report.recommendedAction
                                  });
                                }}
                                className="rounded bg-slate-800 hover:bg-sky-900/50 hover:text-sky-400 text-slate-400 border border-slate-700 hover:border-sky-500/50 font-bold text-[10px] px-3.5 py-1.5 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <Pencil className="h-3.5 w-3.5" /> EDIT
                              </button>
                            )}
                            {onDelete && (
                              <button
                                onClick={() => onDelete(report.id)}
                                className="rounded bg-slate-800 hover:bg-rose-900/50 hover:text-rose-400 text-slate-400 border border-slate-700 hover:border-rose-500/50 font-bold text-[10px] px-3.5 py-1.5 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-colors"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> HAPUS
                              </button>
                            )}
                            {report.status === 'Open' && (
                              <button
                                onClick={() => onStatusUpdate(report.id, 'In Progress')}
                                className="rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] px-3.5 py-1.5 uppercase tracking-wider cursor-pointer"
                              >
                                Mulai Tangani (Mark In Progress)
                              </button>
                            )}
                            {(report.status === 'Open' || report.status === 'In Progress') && (
                              <button
                                onClick={() => onStatusUpdate(report.id, 'Closed')}
                                className="rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] px-3.5 py-1.5 uppercase tracking-wider cursor-pointer"
                              >
                                Selesaikan (Mark Closed)
                              </button>
                            )}
                          </>
                        )}
                        {report.status === 'Closed' && editingId !== report.id && (
                          <span className="text-[10px] font-bold text-emerald-400 font-mono bg-emerald-950/20 px-3 py-1 rounded border border-emerald-500/20">
                            ✔ TEMUAN TELAH DISELESAIKAN & DIVERIFIKASI
                          </span>
                        )}
                      </div>
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
