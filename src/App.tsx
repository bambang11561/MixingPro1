import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar, { ActivePageType } from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import Patrol4KS from './components/Patrol4KS';
import PatrolLogs from './components/PatrolLogs';
import ScrapMonitoring from './components/ScrapMonitoring';
import CulturePride from './components/CulturePride';
import MappingArea from './components/MappingArea';
import Login from './components/Login';
import { DashboardStats, SafetyReport, ReportStatus } from './types';
import { Eye, ShieldAlert, FileSpreadsheet, MessageSquareCode } from 'lucide-react';
import { initAuth, googleSignIn, logoutGoogle } from './firebase';

export default function App() {
  // Google Drive Integration State
  const [gUser, setGUser] = useState<any>(null);
  const [gToken, setGToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGUser(user);
        setGToken(token);
      },
      () => {
        setGUser(null);
        setGToken(null);
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setGUser(res.user);
        setGToken(res.accessToken);
      }
    } catch (err) {
      console.error('Google Sign In Error:', err);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await logoutGoogle();
      setGUser(null);
      setGToken(null);
    } catch (err) {
      console.error('Google Sign Out Error:', err);
    }
  };

  const [stats, setStats] = useState<DashboardStats>({
    safeManHours: 2345680,
    daysWithoutAccident: 191,
    totalAccidents: 0,
    incidentRate: 0,
    totalReports: 5,
    openReports: 1,
    inProgressReports: 1,
    resolvedReports: 3
  });
  const [reports, setReports] = useState<SafetyReport[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);

  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user'>('admin');
  const [username, setUsername] = useState('');

  // Active view Page for the layout
  const [activePage, setActivePage] = useState<ActivePageType>('dashboard');
  
  // Mobile sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check auth on mount
  useEffect(() => {
    const savedRole = localStorage.getItem('auth_role');
    const savedUser = localStorage.getItem('auth_user');
    if (savedRole && savedUser) {
      setIsLoggedIn(true);
      setUserRole(savedRole as 'admin' | 'user');
      setUsername(savedUser);
      if (savedRole === 'user') {
        setActivePage('form');
      }
    }
  }, []);

  const handleLogin = (role: 'admin' | 'user', username: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUsername(username);
    localStorage.setItem('auth_role', role);
    localStorage.setItem('auth_user', username);
    setActivePage(role === 'admin' ? 'dashboard' : 'form');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('admin');
    setUsername('');
    localStorage.removeItem('auth_role');
    localStorage.removeItem('auth_user');
  };

  // Resilient fetch with automatic retry on failure (helpful during dev server restarts)
  const fetchWithRetry = async (url: string, options?: RequestInit, retries = 4, delay = 1500): Promise<Response> => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        throw new Error('Received HTML instead of JSON');
      }
      return res;
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1, delay + 500);
      }
      throw error;
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetchWithRetry('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.warn('Network issue fetching stats:', e);
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await fetchWithRetry('/api/reports');
      const data = await res.json();
      setReports(data);
    } catch (e) {
      console.warn('Network issue fetching reports:', e);
    } finally {
      setLoadingReports(false);
    }
  };

  // Sync all data initially
  const syncAllData = () => {
    if (!isLoggedIn) return;
    fetchStats();
    fetchReports();
  };

  useEffect(() => {
    syncAllData();
    // Setup polling for live aggregates (every 10 seconds)
    const statsInterval = setInterval(() => {
      if (isLoggedIn) {
        fetchStats();
      }
    }, 10000);

    return () => {
      clearInterval(statsInterval);
    };
  }, [isLoggedIn]);

  // Update a report's status
  const handleStatusUpdate = async (id: string, newStatus: ReportStatus) => {
    try {
      const res = await fetch(`/api/reports/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        // Refresh local listings and metrics
        fetchReports();
        fetchStats();
      }
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  const handleEditReport = async (id: string, updatedData: Partial<SafetyReport>) => {
    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        fetchReports();
        fetchStats();
      }
    } catch (e) {
      console.error('Error updating report:', e);
    }
  };

  const handleDeleteReport = async (id: string) => {
    if (!window.confirm('Yakin ingin menghapus laporan ini? Data yang dihapus tidak dapat dikembalikan.')) return;
    try {
      const res = await fetch(`/api/reports/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchReports();
        fetchStats();
      }
    } catch (e) {
      console.error('Error deleting report:', e);
    }
  };

  // Callback when a new report is made via form
  const handleNewReportCreated = () => {
    // Refresh list and stats
    fetchReports();
    fetchStats();
    // Auto-switch to logs tab/page to view the submission if admin, otherwise stay or redirect to appropriate page
    if (userRole === 'admin') {
      setActivePage('logs');
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#080b14] text-slate-100 flex font-sans" id="app-root">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        activePage={activePage} 
        onPageChange={setActivePage} 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        role={userRole}
        onLogout={handleLogout}
        username={username}
        gUser={gUser}
        gToken={gToken}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
      />

      {/* Main Console Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Header Topbar */}
        <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content Body */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
          
          {/* 1. Page Switcher Rendering */}
          {activePage === 'dashboard' && userRole === 'admin' && (
            <div className="space-y-6">
              {/* Key Metrics Overview Card */}
              <DashboardOverview
                stats={stats}
                loading={loadingStats}
                onRefresh={syncAllData}
              />
              
              {/* Bento Grid layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Safety Logs Section (Full Width) */}
                <div className="lg:col-span-12">
                  <ReportList
                    reports={reports}
                    loading={loadingReports}
                    onStatusUpdate={handleStatusUpdate}
                    onDelete={handleDeleteReport}
                    onEdit={handleEditReport}
                    gToken={gToken}
                  />
                </div>
              </div>
            </div>
          )}

          {activePage === 'logs' && userRole === 'admin' && (
            <div className="animate-fade-in">
              <ReportList
                reports={reports}
                loading={loadingReports}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDeleteReport}
                onEdit={handleEditReport}
                gToken={gToken}
              />
            </div>
          )}

          {activePage === 'form' && (
            <div className="max-w-3xl mx-auto animate-fade-in">
              <ReportForm
                onReportCreated={handleNewReportCreated}
                gToken={gToken}
              />
            </div>
          )}

          {activePage === 'patrol4ks' && (
            <div className="animate-fade-in max-w-4xl mx-auto">
              <Patrol4KS />
            </div>
          )}

          {activePage === 'patrol_logs' && userRole === 'admin' && (
            <div className="animate-fade-in">
              <PatrolLogs gToken={gToken} />
            </div>
          )}

          {activePage === 'scrap_monitoring' && userRole === 'admin' && (
            <div className="animate-fade-in">
              <ScrapMonitoring />
            </div>
          )}

          {activePage === 'culture' && (
            <div className="animate-fade-in">
              <CulturePride />
            </div>
          )}

          {activePage === 'mapping_area' && (
            <div className="animate-fade-in max-w-6xl mx-auto">
              <MappingArea />
            </div>
          )}

        </main>

        {/* Safety Command Footer */}
        <footer className="border-t border-slate-900 bg-[#070b13] py-4 px-6 text-center text-xs text-slate-500 font-mono shrink-0" id="hse-footer">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-3">
            <div>
              © 2026 Mixing Departement Pro.1 | Do With pRide.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ZERO DEFECT ZERO ACCIDENT | QCC TRANSFORMIX
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
