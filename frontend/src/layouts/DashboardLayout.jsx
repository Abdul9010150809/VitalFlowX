import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, Activity, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const roleThemes = {
  producer:    { gradient: 'from-indigo-600 to-indigo-800',  accent: 'text-indigo-500',  activeBg: 'bg-indigo-500/10', activeBorder: 'border-indigo-500/40', badge: 'bg-indigo-500' },
  transporter: { gradient: 'from-amber-500 to-amber-700',    accent: 'text-amber-600',   activeBg: 'bg-amber-500/10', activeBorder: 'border-amber-500/40', badge: 'bg-amber-500' },
  warehouse:   { gradient: 'from-cyan-600 to-cyan-800',      accent: 'text-cyan-500',    activeBg: 'bg-cyan-500/10', activeBorder: 'border-cyan-500/40', badge: 'bg-cyan-500' },
  retailer:    { gradient: 'from-teal-600 to-teal-800',      accent: 'text-teal-500',    activeBg: 'bg-teal-500/10', activeBorder: 'border-teal-500/40', badge: 'bg-teal-500' },
  inspector:   { gradient: 'from-rose-600 to-rose-800',      accent: 'text-rose-500',    activeBg: 'bg-rose-500/10', activeBorder: 'border-rose-500/40', badge: 'bg-rose-500' },
  regulator:   { gradient: 'from-fuchsia-600 to-fuchsia-800', accent: 'text-fuchsia-500', activeBg: 'bg-fuchsia-500/10', activeBorder: 'border-fuchsia-500/40', badge: 'bg-fuchsia-500' },
};

const DashboardLayout = ({ role, links, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = roleThemes[role] || roleThemes.producer;

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const isActive = (path) => location.pathname.includes(path);

  const sidebarContent = (
    <>
      {/* Logo / Header */}
      <div className={`h-16 flex items-center px-5 border-b border-slate-200/80 bg-gradient-to-r ${theme.gradient} flex-shrink-0`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-white font-bold text-sm tracking-tight">VitalFlowX</span>
            <span className="block text-white/60 text-[10px] uppercase tracking-widest font-medium">{role}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        <nav className="space-y-0.5 px-3">
          {links.map((link, index) => {
            const active = isActive(link.path);
            return (
              <Link
                key={index}
                to={`/${role}/${link.path}`}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-2 px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? `${theme.activeBg} ${theme.accent} border-l-2 ${theme.activeBorder}`
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-l-2 border-transparent'
                }`}
              >
                <span className="flex-1">{link.name}</span>
                {active && <ChevronRight className="w-3 h-3 opacity-50" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Section / Logout */}
      <div className="p-3 border-t border-slate-200/80 flex-shrink-0">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className={`w-8 h-8 ${theme.badge} rounded-lg flex items-center justify-center text-white text-xs font-bold uppercase`}>
            {role.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate capitalize">{role} Admin</p>
            <p className="text-[11px] text-slate-500 truncate">{role}@vitalflowx.io</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          {t('logout')}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200/80 hidden md:flex flex-col shadow-sm">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl animate-slide-in-left">
            <div className="absolute right-3 top-3 z-10">
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 md:px-6 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
              <span className="capitalize font-medium text-slate-800">{role}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-400">{location.pathname.split('/').pop()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-emerald-700">Chain Sync</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8" role="main" id="main-content">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
