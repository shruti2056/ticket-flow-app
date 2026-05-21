const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.08)_0%,transparent_50%)] animate-pulse-slow"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 gradient-button rounded-xl flex items-center justify-center text-2xl shadow-[0_8px_24px_rgba(99,102,241,0.3)]">
            🎫
          </div>
          <div className="font-display text-[1.8rem] font-extrabold gradient-brand">
            TicketBud
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            className="px-7 py-3 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 bg-transparent text-gray-200 border border-white/20 hover:bg-white/5 hover:border-white/40"
            onClick={() => onNavigate('login')}
          >
            Sign In
          </button>
          <button 
            className="px-7 py-3 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 gradient-button text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(99,102,241,0.4)]"
            onClick={() => onNavigate('login')}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-1 text-center px-10 py-[120px_40px_80px]">
        <div className="inline-block bg-indigo-500/15 border border-indigo-500/30 text-purple-400 px-5 py-2 rounded-[30px] text-sm font-semibold mb-8 animate-fadeInDown">
          ✨ Trusted by 10,000+ teams worldwide
        </div>
        <h1 className="font-display text-[4.5rem] font-extrabold leading-[1.1] mb-7 gradient-text animate-fadeInUp">
          Support Tickets Made Simple
        </h1>
        <p className="text-[1.35rem] text-gray-200/70 max-w-[700px] mx-auto leading-relaxed mb-12 animate-fadeInUp [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
          Transform your customer support with intelligent ticket management. 
          Collaborate seamlessly, resolve faster, and keep your customers happy.
        </p>
        <div className="flex gap-5 justify-center animate-fadeInUp [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards]">
          <button 
            className="px-10 py-[18px] rounded-xl text-[1.1rem] font-semibold cursor-pointer transition-all duration-300 gradient-button text-white shadow-[0_8px_24px_rgba(99,102,241,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(99,102,241,0.4)]"
            onClick={() => onNavigate('login')}
          >
            Start Free Trial
          </button>
          <button 
            className="px-10 py-[18px] rounded-xl text-[1.1rem] font-semibold cursor-pointer transition-all duration-300 bg-white/5 text-gray-200 border border-white/20 hover:bg-white/10 hover:border-white/40"
            onClick={() => onNavigate('demo')}
          >
            View Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-1 px-10 py-[100px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl font-extrabold mb-4 gradient-text">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-200/60">
              Powerful features to supercharge your support team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Respond to customer inquiries in seconds with our blazing-fast interface and smart automation tools.' },
              { icon: '🎯', title: 'Smart Prioritization', desc: 'Automatically categorize and prioritize tickets based on urgency, customer tier, and custom rules.' },
              { icon: '📊', title: 'Advanced Analytics', desc: 'Track team performance, resolution times, and customer satisfaction with real-time dashboards.' },
              { icon: '🤝', title: 'Team Collaboration', desc: 'Work together seamlessly with internal notes, @mentions, and assignment workflows.' },
              { icon: '🔔', title: 'Real-time Updates', desc: 'Stay informed with instant notifications via email, Slack, or mobile push notifications.' },
              { icon: '🔒', title: 'Enterprise Security', desc: 'Bank-level encryption, SSO, and compliance certifications to keep your data safe.' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="glass rounded-[20px] p-10 transition-all duration-400 opacity-0 animate-fadeInUp hover:bg-white/5 hover:border-indigo-500/30 hover:-translate-y-2"
                style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-[32px] mb-6">
                  {feature.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-200/60 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-1 px-10 py-[100px] text-center">
        <div className="max-w-[800px] mx-auto bg-indigo-500/10 border border-indigo-500/30 rounded-3xl p-[60px_40px] backdrop-blur-sm">
          <h2 className="font-display text-[2.5rem] font-extrabold mb-5 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200/70 mb-9">
            Join thousands of teams already using TicketFlow to deliver exceptional support.
          </p>
          <button 
            className="px-10 py-[18px] rounded-xl text-[1.1rem] font-semibold cursor-pointer transition-all duration-300 gradient-button text-white shadow-[0_8px_24px_rgba(99,102,241,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(99,102,241,0.4)]"
            onClick={() => onNavigate('login')}
          >
            Start Your Free Trial
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
