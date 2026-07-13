import React, { useState } from 'react';
import { Map, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react';

export default function MappingArea() {
  const [activeTab, setActiveTab] = useState<'lt1' | 'lt2'>('lt1');

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 md:p-6 shadow-lg flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4 shrink-0">
        <div>
          <h3 className="font-sans text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <Map className="h-4 w-4 text-emerald-500" />
            Mapping PIC Penanggung Jawab Area
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Mixing Plant 1 - Area Genba Teknisi</p>
        </div>
        
        <div className="flex bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('lt1')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === 'lt1' 
                ? 'bg-emerald-500 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            LANTAI 1
          </button>
          <button
            onClick={() => setActiveTab('lt2')}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === 'lt2' 
                ? 'bg-emerald-500 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            LANTAI 2
          </button>
        </div>
      </div>
      
      <div className="flex-1 mt-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative flex items-center justify-center p-4">
        {activeTab === 'lt1' ? (
          <img 
            src="/mapping-lt1.jpg" 
            alt="Mapping Area Lantai 1" 
            className="max-w-full max-h-full object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/1e293b/475569?text=Silakan+Upload+mapping-lt1.jpg+ke+folder+public';
            }}
          />
        ) : (
          <img 
            src="/mapping-lt2.jpg" 
            alt="Mapping Area Lantai 2" 
            className="max-w-full max-h-full object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/1e293b/475569?text=Silakan+Upload+mapping-lt2.jpg+ke+folder+public';
            }}
          />
        )}
      </div>
      
      <div className="mt-4 flex items-start gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700 shrink-0">
        <AlertCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Catatan Upload Gambar:</strong> Gambar yang Anda unggah di chat tidak otomatis masuk ke file aplikasi. Silakan buka file explorer di sebelah kiri, klik kanan pada folder <code className="text-emerald-400 bg-slate-800 px-1 py-0.5 rounded text-[10px]">public/</code>, lalu pilih <strong>Upload File</strong>. Unggah gambar lantai 1 dengan nama <code className="text-emerald-400 bg-slate-800 px-1 py-0.5 rounded text-[10px]">mapping-lt1.jpg</code> dan lantai 2 dengan nama <code className="text-emerald-400 bg-slate-800 px-1 py-0.5 rounded text-[10px]">mapping-lt2.jpg</code> agar tampil di sini.
        </p>
      </div>
    </div>
  );
}
