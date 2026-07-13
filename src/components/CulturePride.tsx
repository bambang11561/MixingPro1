import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronLeft, Flame, Shield, Users, Star, ArrowUpCircle } from 'lucide-react';

const pages = [
  {
    title: 'Salam pRide',
    content: (
      <div className="flex flex-col items-center justify-center text-center h-full p-8 space-y-8">
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">
          Semangat Pagi !!!
        </h2>
        <div className="bg-red-600 text-white font-black text-2xl py-4 px-8 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.3)] border-2 border-red-500/50">
          Pagi, Pagi, Pagi<br/>Luar Biasa !!!
        </div>
        <div className="flex flex-col gap-4 mt-8">
          <span className="text-3xl font-bold text-slate-300">S..R..I ....!!!</span>
          <span className="bg-red-700 text-white font-black text-3xl py-4 px-12 rounded-full transform -rotate-2 border-2 border-red-500/50">
            Do With pRide !!!
          </span>
        </div>
      </div>
    )
  },
  {
    title: 'Apa itu Budaya Organisasi',
    content: (
      <div className="flex flex-col h-full p-8 space-y-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-white uppercase border-l-4 border-red-500 pl-4">
          Apa itu Budaya Organisasi?
        </h2>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mt-6 relative">
          <div className="absolute -top-4 -left-4 text-6xl text-red-500 opacity-50 font-serif">"</div>
          <p className="text-lg text-slate-300 leading-relaxed italic relative z-10">
            Budaya organisasi adalah sistem norma dan nilai-nilai yang dianut bersama oleh anggota organisasi sebagai pedoman dalam berpikir, bersikap, dan bertindak untuk mencapai tujuan organisasi, sekaligus membentuk identitas yang membedakan suatu organisasi dari organisasi lainnya.
          </p>
          <div className="text-right mt-4 text-sm text-red-400 font-semibold">~ Fred Luthans ~</div>
        </div>

        <h3 className="text-xl font-bold text-white mt-8 mb-2">Peran & Karakter</h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          Budaya organisasi memiliki peran kuat dalam transformasi organisasi, sebagaimana tercermin dalam perannya pada siklus organisasi: mendorong daya <span className="text-red-400 font-bold">survive</span> pada fase start-up, membangun daya dan keunggulan pada fase <span className="text-red-400 font-bold">growth</span>, menjaga stabilitas dan kelincahan pada fase <span className="text-red-400 font-bold">mature</span>, serta menjadi energi untuk terus berinovasi pada fase <span className="text-red-400 font-bold">decline</span>.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          Karakter budaya organisasi adalah kumpulan sifat, watak, dan budi pekerti kolektif yang terbentuk melalui proses pembiasaan lingkungan secara intens, berulang, dan berkelanjutan, sehingga melahirkan perilaku individu yang selaras dengan nilai budaya organisasi baik di dalam maupun di luar ekosistem organisasi, serta menjadi identitas dan pembeda organisasi dari yang lain.
        </p>
      </div>
    )
  },
  {
    title: 'Filosofi Logo pRide',
    content: (
      <div className="flex flex-col h-full p-8 space-y-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-white uppercase border-l-4 border-red-500 pl-4">
          Filosofi Logo
        </h2>
        
        <div className="flex justify-center py-8">
          <div className="text-7xl font-black tracking-tight flex items-end">
            <span className="text-red-600">p</span>
            <span className="text-red-600 text-8xl leading-none">R</span>
            <span className="text-red-600">ide</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <h4 className="text-red-400 font-bold mb-2">Huruf "R"</h4>
            <p className="text-xs text-slate-300">Sebagai pemisah antar huruf "p" dan "ide" dan huruf "R" yang besar melambangkan ketangguhan.</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <h4 className="text-red-400 font-bold mb-2">Tulisan "ide"</h4>
            <p className="text-xs text-slate-300">Memproyeksikan citra perusahaan yang inovatif, cerdas, dan berbasis pada pemikiran strategis.</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <h4 className="text-red-400 font-bold mb-2">Tulisan "Ride"</h4>
            <p className="text-xs text-slate-300">Perjalanan penuh makna yang dijalani dengan rasa bangga, semangat dan komitmen untuk terus bergerak maju bersama.</p>
          </div>
          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
            <h4 className="text-red-400 font-bold mb-2">Potongan Diagonal</h4>
            <p className="text-xs text-slate-300">Merepresentasikan logo SRI yang melambangkan pertumbuhan.</p>
          </div>
        </div>
        <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/20 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-red-600 shrink-0"></div>
          <div>
            <h4 className="text-red-400 font-bold text-sm">Warna Merah</h4>
            <p className="text-xs text-slate-300">Melambangkan energi, keberanian, dan semangat untuk melakukan tindakan.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'PASSION',
    content: (
      <div className="flex flex-col h-full p-8 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-red-500 uppercase tracking-tight">PASSION</h2>
            <p className="text-slate-300 text-sm font-medium mt-1">Bekerja dengan sepenuh hati, antusias menikmati setiap proses yang dijalani.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <h3 className="bg-slate-800 text-white py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-slate-500">Perilaku Utama</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-3"><span className="text-red-500 font-bold">1 |</span> Bekerja dengan sepenuh hati.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">2 |</span> Antusias.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">3 |</span> Enjoy (menikmati).</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="bg-emerald-900/40 text-emerald-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-emerald-500 flex items-center gap-2">
                 Perilaku Mendukung (DO)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Mencintai pekerjaannya, selalu bersemangat untuk melakukannya.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Pekerjaan seberat apapun dijalani dengan sepenuh hati.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Bersyukur mendapatkan kesempatan, bersedia melakukan yang terbaik.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Merasa 'memiliki' organisasi, bertujuan agar organisasi terus tumbuh.</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="bg-rose-900/40 text-rose-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-rose-500 flex items-center gap-2">
                 Tidak Mendukung (DON'TS)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Memperhitungkan manfaat untuk diri sendiri terlebih dahulu.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Mengekspresikan tugas sebagai beban yang berat.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Tidak bersemangat, kurang menikmati proses.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Melihat pekerjaan dari sisi sulit dan penuh kendala.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'RESILIENCE',
    content: (
      <div className="flex flex-col h-full p-8 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0">
            <ArrowUpCircle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-red-500 uppercase tracking-tight">RESILIENCE</h2>
            <p className="text-slate-300 text-sm font-medium mt-1">Mengembangkan sikap positif dan selalu mencari cara untuk beradaptasi, berjuang tanpa menyerah menghadapi setiap tantangan.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <h3 className="bg-slate-800 text-white py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-slate-500">Perilaku Utama</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-3"><span className="text-red-500 font-bold">1 |</span> Adaptif / agile.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">2 |</span> Optimis / growth mindset / open mind.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">3 |</span> Tangguh / pantang menyerah / fighting spirit.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">4 |</span> Proaktif.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="bg-emerald-900/40 text-emerald-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-emerald-500">Perilaku Mendukung (DO)</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Memiliki cara pandang yang terbuka (open mind).</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Lebih melihat peluang untuk berubah daripada kendala.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Belajar terus menerus untuk beradaptasi.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Gigih mendapatkan jalan keluar.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Bersikap proaktif dan cepat tanggap.</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="bg-rose-900/40 text-rose-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-rose-500">Tidak Mendukung (DON'TS)</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Mengeluh atas perubahan situasi.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Enggan berubah karena zona nyaman.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Berhenti berupaya ketika menghadapi kendala.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Merasa kompetensi sudah cukup.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Sering menunda pekerjaan.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'INTEGRITY',
    content: (
      <div className="flex flex-col h-full p-8 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-red-500 uppercase tracking-tight">INTEGRITY</h2>
            <p className="text-slate-300 text-sm font-medium mt-1">Jujur, mengikuti norma yang berlaku, disiplin dan memegang teguh komitmen (walk the talk).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <h3 className="bg-slate-800 text-white py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-slate-500">Perilaku Utama</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-3"><span className="text-red-500 font-bold">1 |</span> Dapat dipercaya (trustworthy/honest).</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">2 |</span> Bekerja dengan norma dan nilai.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">3 |</span> Safety.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">4 |</span> Disiplin.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">5 |</span> Komitmen (walk the talk).</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="bg-emerald-900/40 text-emerald-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-emerald-500">Perilaku Mendukung (DO)</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Memegang teguh norma-norma.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Konsisten menjalankan aturan yang berlaku.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Mengutamakan aspek keselamatan (safety).</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Jujur dan dapat diandalkan (mendapatkan trust).</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Menjadi panutan bagi orang lain.</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="bg-rose-900/40 text-rose-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-rose-500">Tidak Mendukung (DON'TS)</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Melakukan short cut yang berisiko.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Menggunakan fasilitas Perusahaan untuk pribadi.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Tidak menuntaskan tanggung jawab.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Beropini menyampaikan informasi tanpa data.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'DIVERSITY',
    content: (
      <div className="flex flex-col h-full p-8 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-red-500 uppercase tracking-tight">DIVERSITY</h2>
            <p className="text-slate-300 text-sm font-medium mt-1">Menjunjung tinggi keberagaman sebagai kekuatan untuk bekerja sama mencapai tujuan bersama.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <h3 className="bg-slate-800 text-white py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-slate-500">Perilaku Utama</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-3"><span className="text-red-500 font-bold">1 |</span> Respect (tidak menyalahkan orang lain).</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">2 |</span> Harmonis.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">3 |</span> Solidaritas (senasib/sepenanggungan).</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">4 |</span> Synergy.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">5 |</span> Berorientasi satu tujuan/satu hati.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">6 |</span> We are family / as family.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="bg-emerald-900/40 text-emerald-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-emerald-500">Perilaku Mendukung (DO)</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Menjadikan perbedaan sebagai kekuatan saling mengisi.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Bekerja sebagai tim dalam berkolaborasi.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Membangun suasana kerja yang nyaman & suportif.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Berinisiatif memberikan bantuan pada pihak lain.</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="bg-rose-900/40 text-rose-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-rose-500">Tidak Mendukung (DON'TS)</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Menganggap masalah di pihak lain & mengandalkan mereka.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Berorientasi hanya kepentingan bagiannya (SILO).</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Sulit mengakui kesalahan atau kelemahan tim.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Enggan menyampaikan ide dengan pihak lain.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'EXCELLENCE',
    content: (
      <div className="flex flex-col h-full p-8 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shrink-0">
            <Star className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-red-500 uppercase tracking-tight">EXCELLENCE</h2>
            <p className="text-slate-300 text-sm font-medium mt-1">Berpikir dan bertindak untuk melakukan yang terbaik.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <h3 className="bg-slate-800 text-white py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-slate-500">Perilaku Utama</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-3"><span className="text-red-500 font-bold">1 |</span> Inovatif.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">2 |</span> Memiliki kompetensi yang unggul/uniqueness.</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">3 |</span> Visioner (alignment with company vision).</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">4 |</span> Mampu melakukan analisis resiko (calculated risk).</li>
              <li className="flex gap-3"><span className="text-red-500 font-bold">5 |</span> Quality mindset.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="bg-emerald-900/40 text-emerald-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-emerald-500">Perilaku Mendukung (DO)</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Memiliki tujuan menghasilkan kebanggaan organisasi.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Berusaha meningkatkan kompetensi mencapai keunggulan.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Berpikir melakukan yang terbaik untuk pekerjaannya.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Melakukan ide improvement secara terus menerus.</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold">•</span> Berorientasi pada terobosan berkualitas.</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="bg-rose-900/40 text-rose-400 py-2 px-4 rounded font-bold uppercase text-sm border-l-4 border-rose-500">Tidak Mendukung (DON'TS)</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Merasa puas dengan tugas rutin di zona nyaman.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Tidak berani melakukan karena takut gagal.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Tidak kreatif, menggunakan cara-cara yang sama.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Kurang mengembangkan rasa ingin tahu.</li>
                <li className="flex gap-2"><span className="text-rose-400 font-bold">•</span> Bekerja tanpa keinginan lebih baik (willingness to do more).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

export default function CulturePride() {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 md:p-6 shadow-lg flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-4 shrink-0">
        <div>
          <h3 className="font-sans text-sm font-bold text-white tracking-wide uppercase flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-red-500" />
            E-book Culture pRide
          </h3>
          <p className="text-[10px] text-slate-400 mt-0.5">Panduan Budaya Organisasi PT Suryaraya Rubberindo Industries</p>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500 font-mono">Halaman {currentPage + 1} dari {pages.length}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))}
              disabled={currentPage === pages.length - 1}
              className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-red-900/20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 mt-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative h-full overflow-y-auto">
          {pages[currentPage].content}
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center shrink-0">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentPage === index ? 'w-8 bg-red-500' : 'bg-slate-700 hover:bg-slate-600'
            }`}
            title={page.title}
          />
        ))}
      </div>
    </div>
  );
}
