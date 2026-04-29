import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Factory, Truck, Warehouse, Store, ClipboardCheck, Scale, ChevronRight, ArrowLeft } from 'lucide-react';

const roles = [
  { id: 'producer', name: 'Producer', desc: 'Manage batches, sensors & blockchain registrations', icon: Factory, color: 'from-indigo-500 to-indigo-700', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
  { id: 'transporter', name: 'Transporter', desc: 'Fleet tracking, GPS telemetry & delivery verification', icon: Truck, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
  { id: 'warehouse', name: 'Warehouse', desc: 'Cold storage monitoring, SLA compliance & inventory', icon: Warehouse, color: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
  { id: 'retailer', name: 'Retailer', desc: 'Shipment scanning, quality checks & complaint tracking', icon: Store, color: 'from-teal-500 to-teal-600', bg: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-400' },
  { id: 'inspector', name: 'Inspector', desc: 'Audits, fraud detection & on-chain verification', icon: ClipboardCheck, color: 'from-rose-500 to-rose-600', bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400' },
  { id: 'regulator', name: 'Regulator', desc: 'Compliance oversight, case management & audit trails', icon: Scale, color: 'from-fuchsia-500 to-fuchsia-600', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20', text: 'text-fuchsia-400' },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleLogin = (roleId) => {
    setSelectedRole(roleId);
    localStorage.setItem('userRole', roleId);
    setTimeout(() => navigate(`/${roleId}`), 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden flex">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-2/5 relative flex-col justify-between p-12 bg-gradient-to-br from-slate-900 to-slate-950 border-r border-white/5">
        <div className="animate-fade-in-up">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">VitalFlow<span className="text-blue-400">X</span></span>
          </div>
          <h2 className="text-3xl font-black leading-tight">
            Secure Access
            <span className="block text-slate-500 text-lg font-medium mt-2">Select your role to access the blockchain-verified dashboard</span>
          </h2>
        </div>

        <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '200ms'}}>
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <span className="text-emerald-400 text-xs">✓</span>
            </div>
            <span>256-bit encrypted sessions</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <span className="text-emerald-400 text-xs">✓</span>
            </div>
            <span>Role-based access control (RBAC)</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500 text-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <span className="text-emerald-400 text-xs">✓</span>
            </div>
            <span>Blockchain wallet integration</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Role Selection */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 py-12 relative z-10">
        <div className="lg:hidden mb-8 animate-fade-in-up">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">VitalFlow<span className="text-blue-400">X</span></span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <h3 className="text-2xl font-bold mb-2 animate-fade-in-up">Choose Your Role</h3>
          <p className="text-slate-500 mb-8 animate-fade-in-up" style={{animationDelay: '100ms'}}>Each role has a dedicated dashboard with role-specific features</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((role, i) => (
              <button
                key={role.id}
                onClick={() => handleLogin(role.id)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
                className={`group relative p-6 rounded-2xl border text-left transition-all duration-300 animate-fade-in-up overflow-hidden ${
                  selectedRole === role.id
                    ? `${role.bg} ${role.border} scale-95 opacity-70`
                    : hoveredRole === role.id
                    ? `bg-white/[0.06] ${role.border} -translate-y-1 shadow-xl`
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                }`}
                style={{animationDelay: `${(i + 1) * 80}ms`}}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <role.icon className="w-5 h-5 text-white" />
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-600 group-hover:${role.text} group-hover:translate-x-1 transition-all duration-300`} />
                  </div>
                  <h4 className="font-bold text-lg">{role.name}</h4>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{role.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
