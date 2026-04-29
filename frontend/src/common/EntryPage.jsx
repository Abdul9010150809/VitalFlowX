import { useNavigate } from 'react-router-dom';
import { Shield, Thermometer, MapPin, BarChart3, Link2, Zap, ChevronRight, Activity } from 'lucide-react';

const EntryPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Thermometer, title: 'Real-Time Cold Chain', desc: 'IoT sensors monitor temperature, humidity & pressure across the entire supply chain in real-time.', color: 'from-cyan-500 to-blue-600' },
    { icon: Link2, title: 'Blockchain Ledger', desc: 'Immutable transaction records ensure every handoff, inspection, and delivery is permanently verified.', color: 'from-indigo-500 to-purple-600' },
    { icon: Shield, title: 'Smart Compliance', desc: 'Automated regulatory checks with on-chain proof of compliance for FDA, WHO & GxP standards.', color: 'from-emerald-500 to-teal-600' },
    { icon: MapPin, title: 'GPS Geo-Fencing', desc: 'Live tracking with geofenced zones that trigger smart contract handoffs automatically.', color: 'from-orange-500 to-red-500' },
    { icon: BarChart3, title: 'Risk Analytics', desc: 'AI-powered risk scoring for shipments based on historical data, weather & carrier performance.', color: 'from-pink-500 to-rose-600' },
    { icon: Zap, title: 'Instant Alerts', desc: 'Critical threshold violations trigger instant notifications across all stakeholders in the chain.', color: 'from-amber-500 to-orange-600' },
  ];

  const stats = [
    { value: '99.8%', label: 'Delivery Success' },
    { value: '1.2M+', label: 'Doses Tracked' },
    { value: '<2s', label: 'Alert Response' },
    { value: '6', label: 'Stakeholder Roles' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Hero Section */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">VitalFlow<span className="text-blue-400">X</span></span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all duration-300"
          >
            Sign In
          </button>
        </nav>

        <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Blockchain-Powered Supply Chain Intelligence
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight animate-fade-in-up" style={{animationDelay: '100ms'}}>
            Cold Chain
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Trust Engine
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '200ms'}}>
            End-to-end pharmaceutical logistics with immutable blockchain verification, 
            real-time IoT telemetry, and multi-stakeholder compliance orchestration.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '300ms'}}>
            <button
              onClick={() => navigate('/login')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold text-lg shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Launch Platform
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Explore Features
            </button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center animate-fade-in-up" style={{animationDelay: `${i * 100}ms`}}>
                <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Enterprise-Grade <span className="text-blue-400">Infrastructure</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              Six interconnected modules working in harmony to ensure pharmaceutical integrity from producer to patient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 animate-fade-in-up"
                style={{animationDelay: `${i * 100}ms`}}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Secure Your Supply Chain?</h2>
            <p className="text-slate-300 mb-8 max-w-lg mx-auto">
              Select your role and access your personalized dashboard with full blockchain integration.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg hover:bg-blue-50 hover:-translate-y-1 transition-all duration-300 shadow-2xl"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-slate-400">VitalFlowX</span>
          </div>
          <p className="text-xs text-slate-600">© 2026 VitalFlowX. Blockchain Cold Chain Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EntryPage;
