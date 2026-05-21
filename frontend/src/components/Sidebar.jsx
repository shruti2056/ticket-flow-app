import { LayoutDashboard, Ticket, Users, Settings, BarChart3, Bell, HelpCircle } from 'lucide-react';

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'tickets', icon: Ticket, label: 'All Tickets' },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  const bottomMenuItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help & Support' },
  ];

  const MenuItem = ({ item, isActive }) => {
    const Icon = item.icon;
    return (
      <button
        onClick={() => setActivePage(item.id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[0.95rem] font-medium transition-all duration-300 ${
          isActive
            ? 'bg-indigo-500/20 text-purple-400 shadow-[0_4px_12px_rgba(99,102,241,0.2)]'
            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
        }`}
      >
        <Icon size={20} />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="w-64 glass-dark border-r border-white/8 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-button rounded-xl flex items-center justify-center text-xl shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
            🎫
          </div>
          <div className="font-display text-xl font-extrabold gradient-brand">
            TicketBud
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} isActive={activePage === item.id} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-white/8 space-y-2">
        {bottomMenuItems.map((item) => (
          <MenuItem key={item.id} item={item} isActive={activePage === item.id} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
