export type ReportStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type ReportType = 'Unsafe Act' | 'Unsafe Condition' | 'Near Miss' | 'Incident' | 'Lainnya';

export interface DashboardStats {
  safeManHours: number;
  daysWithoutAccident: number;
  totalAccidents: number;
  incidentRate: number;
  totalReports: number;
  openReports: number;
  inProgressReports: number;
  resolvedReports: number;
  totalScrap?: number;
  totalPatrolNG?: number;
}

export interface SafetyReport {
  id: string;
  reporterName: string;
  timestamp: string;
  location: string;
  type: ReportType;
  category: string;
  description: string;
  severity: string;
  recommendedAction: string;
  status: ReportStatus;
  aiAnalysis?: any;
}
