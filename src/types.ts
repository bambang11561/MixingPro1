/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ReportType = 'Kondisi Tidak Aman (KTA)' | 'Tindakan Tidak Aman (TTA)' | 'Tindakan Aman (TA)';

export type HazardCategory = 
  | 'Struktur & Sipil' 
  | 'Mekanikal & Alat Berat' 
  | 'Elektrikal' 
  | 'Lingkungan Kerja' 
  | 'Alat Pelindung Diri (APD)' 
  | 'Kesehatan & Higiene';

export type SeverityLevel = 'Rendah' | 'Sedang' | 'Tinggi';

export type ReportStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';

export interface AIAnalysis {
  categoryRisk: string;
  immediateControls: string[];
  rootCauseLikelihood: string;
  aiSuggestion: string;
}

export interface SafetyReport {
  id: string;
  reporterName: string;
  timestamp: string;
  location: string;
  type: ReportType;
  category: HazardCategory;
  description: string;
  severity: SeverityLevel;
  recommendedAction: string;
  status: ReportStatus;
  aiAnalysis?: AIAnalysis;
}

export interface DashboardStats {
  safeManHours: number;
  daysWithoutAccident: number;
  totalAccidents: number;
  incidentRate: number;
  totalReports: number;
  openReports: number;
  inProgressReports: number;
  resolvedReports: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
