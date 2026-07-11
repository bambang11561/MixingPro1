import React from 'react';
import { BookOpen, ShieldCheck, FileText, Scale, ExternalLink, HelpCircle } from 'lucide-react';

export default function Regulations() {
  const regulationsList = [
    {
      title: 'Undang-Undang No. 1 Tahun 1970',
      subtitle: 'Ketentuan Pokok Keselamatan Kerja Nasional',
      authority: 'Kementerian Ketenagakerjaan RI',
      summary: 'Merupakan induk regulasi K3 di Indonesia yang mengatur kewajiban pengurus (perusahaan) dan tenaga kerja dalam menyelenggarakan keselamatan kerja di tempat kerja darat, laut, maupun udara.',
      keyPoints: [
        'Kewajiban pengurus melakukan pemeriksaan kesehatan badan, kondisi mental, dan kemampuan fisik tenaga kerja.',
        'Kewajiban menunjukkan & menjelaskan kondisi bahaya, APD, dan cara kerja yang aman kepada tenaga kerja baru.',
        'Hak tenaga kerja menyatakan keberatan kerja bila syarat K3 & APD tidak terpenuhi secara layak.'
      ]
    },
    {
      title: 'Permenaker No. 5 Tahun 2018',
      subtitle: 'Keselamatan dan Kesehatan Kerja Lingkungan Kerja',
      authority: 'Kemnaker RI',
      summary: 'Mengatur standar faktor fisik (kebisingan, getaran, suhu), kimia, biologi, ergonomi, dan psikologi di lingkungan kerja serta penyediaan fasilitas higiene sanitasi yang memadai.',
      keyPoints: [
        'Nilai Ambang Batas (NAB) Kebisingan maksimal adalah 85 dBA untuk 8 jam kerja per hari.',
        'Penyediaan toilet minimal 1 toilet untuk 15 pekerja konstruksi di lapangan.',
        'Persyaratan kualitas udara dalam ruang dan kecukupan ventilasi udara bersih.'
      ]
    },
    {
      title: 'SKB Menaker & Menteri PU No. 174/104/1986',
      subtitle: 'K3 pada Tempat Kegiatan Konstruksi',
      authority: 'Kemenaker & Kementerian PU',
      summary: 'Pedoman keselamatan khusus sektor konstruksi bangunan yang mencakup struktur perancah, alat angkat beban, galian tanah, serta kewajiban pembentukan panitia pembina K3 (P2K3) konstruksi.',
      keyPoints: [
        'Setiap proyek konstruksi yang mempekerjakan lebih dari 100 orang wajib memiliki Ahli K3 Konstruksi bersertifikasi.',
        'Inspeksi harian wajib pada scaffolding, tali angkat crane, dan kestabilan dinding galian tanah.',
        'Wajib melampirkan Dokumen Rencana K3 Kontrak (RK3K) sebelum memulai konstruksi.'
      ]
    },
    {
      title: 'OSHA Standard 1926 (Construction)',
      subtitle: 'Global Safety and Health Regulations for Construction',
      authority: 'Occupational Safety and Health Administration (USA)',
      summary: 'Standar referensi internasional yang sangat sering diadaptasi untuk proyek sipil berskala multinasional, mengatur batasan rinci Fall Protection, galian parit, dan alat berat.',
      keyPoints: [
        'Fall Protection (Pelindung Jatuh) wajib digunakan untuk semua pekerjaan di ketinggian di atas 6 kaki (1.8 meter).',
        'Galian tanah sedalam 5 kaki (1.5 meter) atau lebih wajib menggunakan sistem penahan dinding (shoring/trench box).',
        'Jarak aman minimum alat berat / perancah dari kabel listrik tegangan tinggi udara (overhead power lines) adalah 10 kaki (3 meter).'
      ]
    }
  ];

  const safetyCalculator = [
    {
      parameter: 'Kebisingan (Noise Level)',
      input: '85 dBA',
      limit: 'Max 8 Jam per hari',
      law: 'Permenaker 5/2018',
      detail: 'Setiap kenaikan 3 dB memotong batas waktu paparan menjadi setengahnya (misal: 88 dB max 4 jam, 91 dB max 2 jam).'
    },
    {
      parameter: 'Pekerjaan Ketinggian (WAH)',
      input: 'Tinggi > 1.8 Meter',
      limit: 'Wajib Full Body Harness',
      law: 'Permenaker 9/2016',
      detail: 'Wajib memiliki Surat Izin Kerja Tinggi, menggunakan jangkar pengaman ganda (double lanyard), dan menyertakan shock absorber.'
    },
    {
      parameter: 'Kedalaman Galian (Excavation)',
      input: 'Dalam > 1.5 Meter',
      limit: 'Wajib Shoring / Sloping',
      law: 'SKB Menaker & PU 1986',
      detail: 'Parit harus dimiringkan (sloping) atau ditahan dengan papan besi (shoring) guna mengeliminasi risiko longsor runtuh.'
    }
  ];

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-lg space-y-6" id="k3-regulations-library">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-orange-500" />
          <div>
            <h3 className="font-sans text-sm font-bold text-white tracking-wide uppercase">
              RESTORI REGULASI & STANDAR K3 SIPIL
            </h3>
            <p className="text-[10px] text-slate-400">Kepustakaan hukum Kemenaker, Pekerjaan Umum, dan Standar OSHA</p>
          </div>
        </div>
        <span className="rounded bg-orange-600/10 border border-orange-500/20 text-[10px] font-mono text-orange-400 px-2 py-0.5 font-bold uppercase">
          Kepatuhan Hukum
        </span>
      </div>

      {/* Quick Lookup Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {safetyCalculator.map((calc, idx) => (
          <div key={idx} className="rounded-lg bg-slate-950 border border-slate-850 p-4 space-y-2">
            <span className="text-[9px] font-mono font-bold text-orange-500 uppercase tracking-wider block">
              BATASAN {calc.parameter}
            </span>
            <div className="flex items-baseline justify-between">
              <h4 className="text-xs font-bold text-white font-mono">{calc.input}</h4>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                {calc.limit}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-sans pt-1">
              {calc.detail}
            </p>
            <div className="text-[9px] text-slate-500 font-mono flex items-center gap-1 border-t border-slate-900/60 pt-1.5 mt-2">
              <Scale className="h-3 w-3 text-slate-500" /> Referensi: {calc.law}
            </div>
          </div>
        ))}
      </div>

      {/* Regulations List */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-orange-500" /> DAFTAR UNDANG-UNDANG & PERATURAN RESMI
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {regulationsList.map((reg, idx) => (
            <div key={idx} className="rounded-lg bg-slate-950 border border-slate-850/60 p-5 hover:border-slate-800 transition duration-150 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                      {reg.title}
                    </h5>
                    <p className="text-[10px] text-orange-500/70 font-mono font-medium">{reg.subtitle}</p>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 font-bold shrink-0 uppercase tracking-wider border border-slate-850 rounded px-1.5 py-0.5">
                    {reg.authority}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {reg.summary}
                </p>

                <div className="border-t border-slate-900 pt-2 space-y-1.5">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Poin Penting Kepatuhan:</span>
                  <ul className="list-disc list-inside text-[10px] text-slate-300 space-y-1 pl-1">
                    {reg.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="leading-relaxed font-sans">{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-900 flex justify-end">
                <a 
                  href="https://jdih.kemnaker.go.id/" 
                  target="_blank" 
                  rel="noreferrer referrer"
                  className="text-[9px] font-mono text-orange-400 hover:text-white flex items-center gap-1"
                >
                  Buka Portal JDIH <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Policy Commitment Card */}
      <div className="text-[10px] text-slate-500 leading-relaxed bg-slate-950/40 p-4 rounded-lg border border-slate-850/80 flex items-start gap-2 font-sans">
        <HelpCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-orange-400 font-bold block mb-0.5">KOMITMEN ZERO ACCIDENT MIXING PRO.1:</span>
          Undang-undang No. 1 Tahun 1970 Pasal 15 menyatakan pelanggar syarat K3 diancam pidana kurungan paling lama 3 bulan atau denda paling tinggi Rp. 100.000 (disesuaikan inflasi hukum terbaru). Patuhi rambu keselamatan kerja, laporkan setiap temuan kondisi tidak aman segera, dan pastikan surat izin kerja aman (Permit to Work) disetujui pengawas sebelum beraktivitas.
        </div>
      </div>

    </div>
  );
}
