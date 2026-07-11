import React, { useState } from 'react';
import { FileCheck, Save, ClipboardList } from 'lucide-react';
import { HazardCategory, ReportType, SeverityLevel } from '../types';

interface ReportFormProps {
  onReportCreated: () => void;
}

export default function ReportForm({ onReportCreated }: ReportFormProps) {
  const [tgl, setTgl] = useState(new Date().toISOString().substring(0, 10));
  const [auditor, setAuditor] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [shift, setShift] = useState('1');
  const [mesin, setMesin] = useState('');
  const [nrp, setNrp] = useState('');
  const [nama, setNama] = useState('');
  const [noIk, setNoIk] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [standardUrutan, setStandardUrutan] = useState('');
  const [penyimpangan, setPenyimpangan] = useState('');
  const [followup, setFollowup] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    // Combine custom fields into the description field for the existing backend
    const combinedDescription = `[IK MIXING REPORT]
Jabatan: ${jabatan}
Shift: ${shift}
Auditee (NRP/Nama): ${nrp} / ${nama}
No IK: ${noIk}

Deskripsi:
${deskripsi}

Standard Urutan:
${standardUrutan}

Penyimpangan / Upnormal:
${penyimpangan}`;

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reporterName: auditor,
          location: mesin,
          type: 'Kondisi Tidak Aman (KTA)' as ReportType,
          category: 'Mekanikal & Alat Berat' as HazardCategory,
          description: combinedDescription,
          severity: 'Sedang' as SeverityLevel,
          recommendedAction: followup || 'Follow up / Koordinasi berjalan',
          status: 'Open'
        })
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim form');
      }
      
      // Reset form
      setAuditor('');
      setJabatan('');
      setMesin('');
      setNrp('');
      setNama('');
      setNoIk('');
      setDeskripsi('');
      setStandardUrutan('');
      setPenyimpangan('');
      setFollowup('');
      
      onReportCreated();

    } catch (e: any) {
      setErrorMsg(e.message || 'Terjadi kesalahan saat menyimpan laporan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
        <div className="rounded-lg bg-amber-500/10 p-2">
          <FileCheck className="h-6 w-6 text-amber-500" />
        </div>
        <div>
          <h2 className="font-sans text-lg font-bold text-white tracking-tight">Formulir Temuan Kesesuaian Pelaksanaan IK Mixing</h2>
          <p className="text-xs text-slate-400 mt-0.5">Catat temuan ketidaksesuaian prosedur IK pada operasional mesin mixing</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tgl</label>
            <input
              type="date"
              value={tgl}
              onChange={(e) => setTgl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Auditor</label>
            <input
              type="text"
              value={auditor}
              onChange={(e) => setAuditor(e.target.value)}
              placeholder="Nama auditor..."
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Jabatan</label>
            <select
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="">Pilih Jabatan...</option>
              <option value="Teknisi">Teknisi</option>
              <option value="Foreman">Foreman</option>
              <option value="Kasie">Kasie</option>
            </select>
          </div>      
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Shift</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="1">Shift 1</option>
              <option value="2">Shift 2</option>
              <option value="3">Shift 3</option>
              <option value="Non Shift">Non Shift</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mesin</label>
            <select
              value={mesin}
              onChange={(e) => setMesin(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
            >
              <option value="">Pilih Mesin / Area...</option>
              <option value="KND75">KNEADER 75</option>
              <option value="BB3">BANBURY 3</option>
              <option value="BB9">BANBURY 9</option>
              <option value="MILLBLD">MILL BLENDER 26</option>
              <option value="BB12A">BANBURY 12A</option>
              <option value="BB12B">BANBURY 12B</option>
              <option value="BB430">BANBURY 430</option>
              <option value="MATERIAL">AREA MATERIAL</option>
              <option value="REST AREA">REST AREA</option>
              <option value="OFFICE">OFFICE</option>
            </select>
          </div>
          <div className="md:col-span-2 flex gap-3">
            <div className="flex-1">
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Auditee Operator (NRP)</label>
              <input
                type="text"
                value={nrp}
                onChange={(e) => setNrp(e.target.value)}
                placeholder="NRP..."
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Auditee Operator (Nama)</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Operator..."
                className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
                required
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">No IK</label>
            <input
              type="text"
              value={noIk}
              onChange={(e) => setNoIk(e.target.value)}
              placeholder="Nomor IK..."
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50"
              required
            />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Deskripsi..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50 resize-y"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Standard Urutan</label>
            <textarea
              value={standardUrutan}
              onChange={(e) => setStandardUrutan(e.target.value)}
              placeholder="Standard urutan..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50 resize-y"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Penyimpangan / Upnormal</label>
            <textarea
              value={penyimpangan}
              onChange={(e) => setPenyimpangan(e.target.value)}
              placeholder="Penyimpangan yang terjadi..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50 resize-y"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">Follow up / Koordinasi</label>
            <textarea
              value={followup}
              onChange={(e) => setFollowup(e.target.value)}
              placeholder="Tindakan follow up..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50 resize-y"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-xs font-bold text-white px-6 py-2.5 transition-colors"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            SIMPAN TEMUAN IK
          </button>
        </div>
      </form>
    </div>
  );
}
