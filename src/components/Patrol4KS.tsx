import React, { useState, useRef, useEffect } from 'react';
import { ClipboardCheck, CheckCircle2, XCircle, ChevronDown, ChevronUp, Save, Camera, Image as ImageIcon, X, AlertCircle } from 'lucide-react';

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

const technicians = {
  'MIXING A': [
    'MUHAMMAD NASIR', 'SURMAN', 'QODRI WAKHID S', 'SARNAN', 'SUPRIYO', 
    'BIBIH SURYADI P', 'ASIKIN', 'ALBERI ROMADA', 'DIAN SETIAWAN S', 
    'RAHMAT', 'KOMARUDIN', 'SUKRI PENDI'
  ],
  'MIXING F': [
    'NANANG SURYANA', 'ADI MUNANDAR', 'ADI PRIYANTO', 'INDRA', 
    'SIDIK DANU. S', 'YUDA LESMANA'
  ]
};

export default function Patrol4KS() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    'Ketertiban', 'Kerapihan', 'Kebersihan', 'Kelestarian', 'Shitsuke'
  ]);
  const [status, setStatus] = useState<Record<number, 'ok' | 'not_ok' | null>>({});
  const [photos, setPhotos] = useState<Record<number, string>>({});
  const [remarks, setRemarks] = useState<Record<number, string>>({});
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  
  const [area, setArea] = useState<'MIXING A' | 'MIXING F' | ''>('');
  const [technician, setTechnician] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = Array.from(new Set(patrolItems.map(item => item.category)));

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleStatusChange = (id: number, val: 'ok' | 'not_ok') => {
    setStatus(prev => ({ ...prev, [id]: val }));
    if (val === 'ok') {
      // Clear photo and remark if status changes back to ok
      setPhotos(prev => {
        const newPhotos = { ...prev };
        delete newPhotos[id];
        return newPhotos;
      });
      setRemarks(prev => {
        const newRemarks = { ...prev };
        delete newRemarks[id];
        return newRemarks;
      });
    }
  };

  const handleRemarkChange = (id: number, val: string) => {
    setRemarks(prev => ({ ...prev, [id]: val }));
  };

  const handlePhotoUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => ({ ...prev, [id]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (id: number) => {
    setPhotos(prev => {
      const newPhotos = { ...prev };
      delete newPhotos[id];
      return newPhotos;
    });
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id]!.value = '';
    }
  };

  const isComplete = patrolItems.every(item => status[item.id] !== undefined && status[item.id] !== null) && area !== '' && technician !== '';

  const handleSubmit = async () => {
    if (!isComplete) return;
    
    setIsSubmitting(true);
    const ngCount = Object.values(status).filter(val => val === 'not_ok').length;

    try {
      const response = await fetch('/api/patrols', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          area,
          technician,
          date: new Date().toISOString(),
          ngCount,
          itemsStatus: status,
          itemsRemarks: remarks
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          // Reset form
          setStatus({});
          setPhotos({});
          setRemarks({});
          setArea('');
          setTechnician('');
          setSubmitSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.warn('Network issue saving patrol data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-6 animate-fade-in" id="patrol-4ks-container">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-lime-500/10 p-2 text-lime-400 ring-1 ring-lime-500/20">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-sans text-sm font-bold text-white tracking-wide uppercase">
              PATROL 4K+S TEKNISI MIXING
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Checklist harian Ketertiban, Kerapihan, Kebersihan, Kelestarian, Shitsuke</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-slate-400">
            Tanggal: <span className="text-white font-bold">{new Date().toLocaleDateString('id-ID')}</span>
          </div>
          <button 
            disabled={!isComplete || isSubmitting || submitSuccess}
            onClick={handleSubmit}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition ${
              submitSuccess ? 'bg-emerald-600 text-white cursor-default' :
              isComplete && !isSubmitting
                ? 'bg-lime-600 hover:bg-lime-500 text-white cursor-pointer' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {submitSuccess ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {submitSuccess ? 'Tersimpan' : isSubmitting ? 'Menyimpan...' : 'Simpan Patrol'}
          </button>
        </div>
      </div>
      
      {/* Technician Information Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Area Patrol</label>
          <select 
            value={area} 
            onChange={(e) => {
              setArea(e.target.value as any);
              setTechnician('');
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-sky-500 transition-colors"
          >
            <option value="">-- Pilih Area --</option>
            <option value="MIXING A">MIXING A</option>
            <option value="MIXING F">MIXING F</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Nama Teknisi</label>
          <select 
            value={technician} 
            onChange={(e) => setTechnician(e.target.value)}
            disabled={!area}
            className="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">-- Pilih Teknisi --</option>
            {area && technicians[area as 'MIXING A' | 'MIXING F'].map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>
      </div>

      {!isComplete && (
        <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-lg text-xs">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>Lengkapi Area, Nama Teknisi, dan seluruh status item checklist (OK/NG) sebelum menyimpan.</p>
        </div>
      )}

      {/* Checklist Content */}
      <div className="space-y-4">
        {categories.map(category => {
          const isExpanded = expandedCategories.includes(category);
          const itemsInCategory = patrolItems.filter(item => item.category === category);
          
          return (
            <div key={category} className="rounded-lg border border-slate-800 bg-slate-950 overflow-hidden">
              {/* Category Header */}
              <button 
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-3 bg-slate-900/50 hover:bg-slate-800/50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="font-sans font-bold text-slate-200 uppercase tracking-wide text-xs">
                    {category}
                  </span>
                  <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-400">
                    {itemsInCategory.length} ITEM
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </button>

              {/* Category Items */}
              {isExpanded && (
                <div className="divide-y divide-slate-800/60">
                  {itemsInCategory.map((item) => (
                    <div key={item.id} className="p-3 lg:p-4 flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex gap-3 flex-1">
                          <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 font-mono shrink-0 mt-0.5">
                            {item.id}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{item.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 md:pl-4 shrink-0">
                          <button
                            onClick={() => handleStatusChange(item.id, 'ok')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-colors cursor-pointer text-[10px] font-bold uppercase tracking-wider ${
                              status[item.id] === 'ok'
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400'
                            }`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            OK
                          </button>
                          <button
                            onClick={() => handleStatusChange(item.id, 'not_ok')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-colors cursor-pointer text-[10px] font-bold uppercase tracking-wider ${
                              status[item.id] === 'not_ok'
                                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-rose-500/30 hover:text-rose-400'
                            }`}
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            NG
                          </button>
                        </div>
                      </div>

                      {/* NG details section */}
                      {status[item.id] === 'not_ok' && (
                        <div className="pl-8 pt-2 animate-fade-in space-y-3">
                          <div className="bg-slate-900/50 rounded-lg border border-rose-500/10 p-3 space-y-2">
                            <label className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                              Keterangan Temuan
                            </label>
                            <input
                              type="text"
                              value={remarks[item.id] || ''}
                              onChange={(e) => handleRemarkChange(item.id, e.target.value)}
                              placeholder="Deskripsikan ketidaksesuaian..."
                              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-xs text-white outline-none focus:border-rose-500/50 transition-colors"
                            />
                          </div>

                          <div className="bg-slate-900/50 rounded-lg border border-rose-500/10 p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                                <Camera className="h-3.5 w-3.5" />
                                Lampirkan Bukti Foto Temuan
                              </span>
                            </div>
                            
                            {photos[item.id] ? (
                              <div className="relative inline-block mt-2 group">
                                <img 
                                  src={photos[item.id]} 
                                  alt="Bukti Temuan" 
                                  className="h-24 w-auto rounded border border-slate-700 object-cover"
                                />
                                <button
                                  onClick={() => removePhoto(item.id)}
                                  className="absolute -top-2 -right-2 bg-slate-800 text-rose-400 rounded-full p-1 border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-700 cursor-pointer shadow-lg"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 mt-2">
                                <input
                                  type="file"
                                  accept="image/*"
                                  capture="environment"
                                  className="hidden"
                                  ref={(el) => fileInputRefs.current[item.id] = el}
                                  onChange={(e) => handlePhotoUpload(item.id, e)}
                                />
                                <button
                                  onClick={() => fileInputRefs.current[item.id]?.click()}
                                  className="flex items-center gap-2 px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
                                >
                                  <ImageIcon className="h-4 w-4 text-slate-400" />
                                  Pilih atau Ambil Foto
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
