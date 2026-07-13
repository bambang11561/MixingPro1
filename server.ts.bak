/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (GEMINI_API_KEY && GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('WARNING: GEMINI_API_KEY is not configured or has placeholder value. AI features will fallback to simulation.');
}

// Initialize Firebase Client
const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
let db: any = null;
if (fs.existsSync(firebaseConfigPath)) {
  const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf-8'));
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
}

// Helpers for Firestore
async function readReports(): Promise<any[]> {
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, 'reports'));
    return snap.docs.map((d: any) => ({ ...d.data(), id: d.id }));
  } catch (e) {
    console.error('Error reading reports:', e);
    return [];
  }
}

async function readPatrols(): Promise<any[]> {
  if (!db) return [];
  try {
    const snap = await getDocs(collection(db, 'patrols'));
    return snap.docs.map((d: any) => ({ ...d.data(), id: d.id }));
  } catch (e) {
    console.error('Error reading patrols:', e);
    return [];
  }
}

async function readScrap(): Promise<any> {
  if (!db) return {};
  try {
    const snap = await getDocs(collection(db, 'scrap'));
    const scrapData: any = {};
    snap.docs.forEach((d: any) => {
      scrapData[d.id] = d.data().categories || {};
    });
    return scrapData;
  } catch (e) {
    console.error('Error reading scrap:', e);
    return {};
  }
}

// GET /api/scrap?month=YYYY-MM
app.get('/api/scrap', async (req, res) => {
  const { month } = req.query;
  const scrapData = await readScrap();
  if (month && typeof month === 'string') {
    res.json(scrapData[month] || {});
  } else {
    res.json(scrapData);
  }
});

// POST /api/scrap
app.post('/api/scrap', async (req, res) => {
  const { month, data } = req.body;
  if (!month || !data) {
    return res.status(400).json({ error: 'Bulan dan data diperlukan.' });
  }
  if (db) {
    await setDoc(doc(db, 'scrap', month), { categories: data });
  }
  res.status(200).json({ success: true });
});

// 1. GET /api/stats
// Calculates live stats dynamically
const PROJECT_START_TIME = new Date('2026-01-01T00:00:00Z').getTime();
const ACCIDENTS_COUNT = 0;

app.get('/api/stats', async (req, res) => {
  const reports = await readReports();
  
  const now = Date.now();
  const daysDiff = Math.max(1, Math.floor((now - PROJECT_START_TIME) / (1000 * 60 * 60 * 24)));
  const tickingMinutes = Math.floor((now % (1000 * 60 * 60 * 24)) / 1000 / 60);
  const tickingHours = Math.floor(daysDiff * 1200 + (tickingMinutes * 0.8));
  const safeManHours = 2345000 + tickingHours;

  const totalReports = reports.length;
  const openReports = reports.filter(r => r.status === 'Open').length;
  const inProgressReports = reports.filter(r => r.status === 'In Progress').length;
  const resolvedReports = reports.filter(r => r.status === 'Resolved' || r.status === 'Closed').length;

  const scrapData = await readScrap();
  let totalScrap = 0;
  const currentMonth = new Date().toISOString().slice(0, 7);
  if (scrapData[currentMonth]) {
    const data = scrapData[currentMonth];
    for (const category in data) {
      if (Array.isArray(data[category])) {
        totalScrap += data[category].reduce((sum: number, val: any) => sum + (Number(val) || 0), 0);
      }
    }
  }

  const patrols = await readPatrols();
  const totalPatrolNG = patrols.reduce((sum: number, p: any) => sum + (Number(p.ngCount) || 0), 0);

  res.json({
    safeManHours,
    daysWithoutAccident: daysDiff,
    totalAccidents: ACCIDENTS_COUNT,
    incidentRate: 0.0,
    totalReports,
    openReports,
    inProgressReports,
    resolvedReports,
    totalScrap,
    totalPatrolNG
  });
});

// 2. GET /api/reports
app.get('/api/reports', async (req, res) => {
  const reports = await readReports();
  reports.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  res.json(reports);
});

// 3. POST /api/reports
app.post('/api/reports', async (req, res) => {
  const { reporterName, location, type, category, description, severity, recommendedAction, status, aiAnalysis } = req.body;
  
  if (!reporterName || !location || !type || !category || !description || !severity) {
    return res.status(400).json({ error: 'Data pelaporan tidak lengkap. Harap isi seluruh field wajib.' });
  }

  const newReport = {
    id: `rep-${Math.floor(1000 + Math.random() * 9000)}`,
    reporterName,
    timestamp: new Date().toISOString(),
    location,
    type,
    category,
    description,
    severity,
    recommendedAction: recommendedAction || 'Sedang dievaluasi oleh Safety Officer.',
    status: status || 'Open',
    aiAnalysis
  };

  if (db) {
    
    await setDoc(doc(db, 'reports', newReport.id), newReport);
  }

  res.status(201).json(newReport);
});

// 4. PUT /api/reports/:id/status
app.put('/api/reports/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, recommendedAction } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status diperlukan.' });
  }

  if (db) {
    
    const docRef = doc(db, 'reports', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Laporan tidak ditemukan.' });
    }
    const updateData: any = { status };
    if (recommendedAction) {
      updateData.recommendedAction = recommendedAction;
    }
    await updateDoc(docRef, updateData);
    const updatedSnap = await getDoc(docRef);
    return res.json({ ...updatedSnap.data(), id: updatedSnap.id });
  }
  
  res.status(500).json({ error: 'Database not initialized' });
});

// GET /api/patrols
app.get('/api/patrols', async (req, res) => {
  const patrols = await readPatrols();
  res.json(patrols);
});

// POST /api/patrols
app.post('/api/patrols', async (req, res) => {
  const { area, technician, date, ngCount, itemsStatus, itemsRemarks } = req.body;
  if (!area || !technician) {
    return res.status(400).json({ error: 'Area dan Teknisi diperlukan.' });
  }

  const newPatrol = {
    id: `ptl-${Date.now()}`,
    area,
    technician,
    date,
    ngCount,
    itemsStatus,
    itemsRemarks,
    itemsWorkingStatus: {}
  };
  
  if (db) {
    
    await setDoc(doc(db, 'patrols', newPatrol.id), newPatrol);
  }
  
  res.status(201).json(newPatrol);
});

// PATCH /api/patrols/:patrolId/items/:itemId/status
app.patch('/api/patrols/:patrolId/items/:itemId/status', async (req, res) => {
  const { patrolId, itemId } = req.params;
  const { workingStatus } = req.body;
  
  if (!workingStatus) {
    return res.status(400).json({ error: 'Status pengerjaan diperlukan.' });
  }

  if (db) {
    
    const docRef = doc(db, 'patrols', patrolId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Laporan patroli tidak ditemukan.' });
    }
    const data = docSnap.data();
    const itemsWorkingStatus = data.itemsWorkingStatus || {};
    itemsWorkingStatus[itemId] = workingStatus;
    
    await updateDoc(docRef, { itemsWorkingStatus });
    
    const updatedSnap = await getDoc(docRef);
    return res.json({ ...updatedSnap.data(), id: updatedSnap.id });
  }
  
  res.status(500).json({ error: 'Database not initialized' });
});

// 5. POST /api/analyze-hazard
// Analyzes a safety hazard description using Gemini API and returns structured safety advice
app.post('/api/analyze-hazard', async (req, res) => {
  const { description, category } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Deskripsi bahaya diperlukan untuk melakukan analisis AI.' });
  }

  // Simulation fallback if Gemini is not initialized
  if (!ai) {
    console.log('Gemini API Client not initialized. Simulating AI response...');
    // Return a mock AI analysis structured Indonesian safety advice
    const mockControlsMap: Record<string, string[]> = {
      'Struktur & Sipil': [
        'Hentikan aktivitas konstruksi di area kritis retak segera',
        'Pasang perancah (shoring) penyangga beban darurat',
        'Beri barikade pengaman kuning-hitam radius 5 meter'
      ],
      'Mekanikal & Alat Berat': [
        'Hentikan operasional unit alat berat yang mengalami kendala/rusak',
        'Pasang rambu Out of Service / Tag Out (LOTO) pada alat',
        'Hanya izinkan teknisi bersertifikat melakukan inspeksi lanjutan'
      ],
      'Elektrikal': [
        'Putuskan aliran listrik (isolasi MCB) di panel utama terdekat',
        'Gunakan sarung tangan isolasi karet saat melakukan tindakan awal',
        'Ganti kabel terkelupas dengan proteksi pipa conduit PVC fleksibel'
      ],
      'Lingkungan Kerja': [
        'Gunakan dewatering pump untuk menyedot genangan atau kebocoran air',
        'Tebarkan absorben pasir/serbuk kayu jika ada ceceran oli',
        'Pasang penerangan tambahan dan rambu lantai licin'
      ],
      'Alat Pelindung Diri (APD)': [
        'Hentikan sementara pekerjaan personel terkait',
        'Distribusikan APD pengganti yang layak dari safety store segera',
        'Berikan pengarahan toolbox talk darurat di lokasi kerja'
      ],
      'Kesehatan & Higiene': [
        'Gunakan masker respirator pelindung gas/debu silika tinggi',
        'Sediakan suplai air minum yang memadai di rest shelter terdekat',
        'Bersihkan debu menumpuk dengan metode basah (wet sweeping)'
      ]
    };

    const selectedControls = mockControlsMap[category] || [
      'Identifikasi sumber bahaya utama di area',
      'Pasang barikade isolasi pengaman area kerja terdampak',
      'Informasikan kepada pengawas lapangan dan HSE supervisor segera'
    ];

    const mockAnalysis = {
      categoryRisk: `${category || 'Umum'} - Potensi Cedera atau Insiden Kerja Lapangan`,
      immediateControls: selectedControls,
      rootCauseLikelihood: 'Kurangnya pengawasan preventif rutin dan pemeliharaan kondisi kerja yang terstandarisasi.',
      aiSuggestion: 'Melakukan program Toolbox Talk harian bertopik spesifik dan audit mingguan kepatuhan K3 di lokasi terkait.'
    };

    // Simulate short processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return res.json(mockAnalysis);
  }

  try {
    const prompt = `Analisis deskripsi bahaya K3 (Keselamatan dan Kesehatan Kerja) berikut di lokasi proyek sipil/konstruksi.
Deskripsi Bahaya: "${description}"
Kategori Lapangan: "${category || 'Umum'}"

Berikan analisis bahaya keselamatan kerja yang berfokus pada keselamatan manusia, terstruktur secara profesional, dan kembalikan output dalam format JSON sesuai schema. Seluruh teks harus dalam Bahasa Indonesia yang profesional.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `Anda adalah pakar K3 Konstruksi Sipil (HSE Director) yang bertugas menilai laporan kondisi tidak aman (KTA) dan tindakan tidak aman (TTA). Berikan analisis K3 yang tajam, taktis, dan spesifik. 
Tanggapan harus berformat JSON dengan bidang persis seperti berikut:
- categoryRisk (string): Deskripsi spesifik tentang kategori risiko dan potensi bahayanya, contoh: "Elektrikal - Risiko Sengatan Listrik Tegangan Tinggi"
- immediateControls (array of strings): Tepat 3 langkah konkret yang HARUS segera dilakukan di lapangan untuk mengamankan lokasi (tindakan korektif instan)
- rootCauseLikelihood (string): Prakiraan ilmiah/praktis mengenai penyebab mendasar (root cause) dari bahaya tersebut
- aiSuggestion (string): Rekomendasi taktis jangka panjang untuk HSE Officer proyek agar bahaya serupa tidak terulang`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            categoryRisk: { type: Type.STRING, description: 'Spesifik bahaya dan kategori risiko' },
            immediateControls: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Tepat 3 langkah mitigasi cepat di lapangan'
            },
            rootCauseLikelihood: { type: Type.STRING, description: 'Prakiraan akar penyebab terjadinya bahaya' },
            aiSuggestion: { type: Type.STRING, description: 'Rekomendasi pencegahan jangka panjang' }
          },
          required: ['categoryRisk', 'immediateControls', 'rootCauseLikelihood', 'aiSuggestion']
        }
      }
    });

    const jsonText = response.text || '';
    const parsedAnalysis = JSON.parse(jsonText.trim());
    res.json(parsedAnalysis);
  } catch (error: any) {
    console.error('Error calling Gemini for hazard analysis:', error);
    res.status(500).json({ error: 'Gagal melakukan analisis AI: ' + (error.message || error) });
  }
});

// 6. POST /api/chat
// Interactive HSE Advisor Chat
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Format pesan tidak valid.' });
  }

  const latestMessage = messages[messages.length - 1]?.text;
  if (!latestMessage) {
    return res.status(400).json({ error: 'Isi pesan tidak ditemukan.' });
  }

  // Simulation fallback if Gemini is not initialized
  if (!ai) {
    console.log('Gemini API Client not initialized. Simulating Chat response...');
    let reply = 'Maaf, sistem K3 AI sedang dalam mode simulasi offline. ';
    
    const lower = latestMessage.toLowerCase();
    if (lower.includes('perancah') || lower.includes('scaffolding')) {
      reply += 'Untuk scaffolding / perancah, pastikan: 1. Pondasi (soleplate dan baseplate) kokoh di atas tanah stabil. 2. Dipasang pipa pengaku (bracing) silang. 3. Tangga akses terpasang aman. 4. Dipasang pagar pengaman (top rail, mid rail, toe board). 5. Seluruh papan lantai kerja (catwalk) terikat erat dan bebas dari celah renggang. Selalu pastikan scaffolding dipasangi Tag HIJAU (Aman Digunakan) sebelum naik kerja!';
    } else if (lower.includes('ketinggian') || lower.includes('height')) {
      reply += 'Pekerjaan di ketinggian (di atas 1.8 meter) wajib memiliki: 1. Surat Izin Kerja (Working at Height Permit). 2. Sertifikat pelatihan untuk pekerja (Scaffolder/Rigger/Safety Worker). 3. APD wajib berupa Full Body Harness dengan double lanyard & shock absorber terpasang pada titik angkur yang diuji (minimal kekuatan 15 kN). 4. Barikade pengaman area jatuh di bawah lintasan kerja.';
    } else if (lower.includes('apd') || lower.includes('masker') || lower.includes('helm')) {
      reply += 'Alat Pelindung Diri (APD) adalah garis pertahanan terakhir. Helm keselamatan wajib melindungi kepala dari benturan, sepatu K3 melindungi kaki dari paku/kejatuhan beban, kacamata pelindung untuk grinding/welding, dan rompi reflektif hi-vis agar pekerja selalu terlihat oleh operator alat berat di lapangan.';
    } else {
      reply += 'Sebagai K3 AI Assistant, saya merekomendasikan untuk selalu melakukan identifikasi bahaya melalui JSA (Job Safety Analysis) sebelum memulai pekerjaan apa pun di lapangan. Utamakan keselamatan kerja demi nihil kecelakaan (Zero Accident)! Ada hal spesifik mengenai regulasi K3 konstruksi Indonesia yang ingin Anda tanyakan?';
    }

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return res.json({ reply });
  }

  try {
    // Structure chat history for Gemini
    const systemInstruction = `Anda adalah K3 AI Assistant (HSE Advisor) profesional dari proyek AICivil K3 Indonesia. Tugas Anda adalah membantu tim HSE Officer, Safety Supervisor, dan pekerja sipil di lapangan dalam memecahkan masalah keselamatan kerja, memberikan instruksi kepatuhan standar K3, serta menafsirkan regulasi K3 (UU No. 1 Tahun 1970, regulasi Kemenaker RI, dan standar internasional seperti OSHA).
- Jawab secara profesional, ramah, solutif, dan utamakan keselamatan nyawa manusia di atas segalanya.
- Gunakan poin-poin yang mudah dipahami (bullet points) untuk instruksi lapangan.
- Jawablah menggunakan Bahasa Indonesia yang fasih, ringkas, dan praktis.
- Sisipkan jargon safety Indonesia yang populer seperti "Utamakan Keselamatan dan Kesehatan Kerja", "Safety First!", "Zero Accident", atau "Salam K3!".`;

    // Map message history to format that Gemini expects
    const contents = messages.map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const reply = response.text || 'Maaf, saya tidak dapat merumuskan tanggapan saat ini. Selalu utamakan keselamatan!';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error calling Gemini for HSE Assistant chat:', error);
    res.status(500).json({ error: 'Gagal merespons dari K3 AI: ' + (error.message || error) });
  }
});

// Configure Vite or Serve Production Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HSE Safety Dashboard Backend server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
