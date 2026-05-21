import { Search, Plus, Filter, Calendar, MoreVertical, AlertCircle } from 'lucide-react';
import { useRef } from 'react';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import FilterMenu from '../components/FilterMenu';
import ProfileMenu from '../components/ProfileMenu';
import Sidebar from '../components/Sidebar';
import TeamPage from './TeamPage';
import AnalyticsPage from './AnalyticsPage';
import SettingsPage from './SettingsPage';
import NotificationsPage from './NotificationsPage';
import HelpPage from './HelpPage';

const DashboardPage = ({ 
  tickets, 
  searchQuery, 
  setSearchQuery,
  selectedFilter,
  setSelectedFilter,
  filteredTickets,
  showFilterMenu,
  setShowFilterMenu,
  filterOptions,
  setFilterOptions,
  priorityMenuOpen,
  setPriorityMenuOpen,
  updatePriority,
  setShowNewTicketModal,
  showProfileMenu,
  setShowProfileMenu,
  handleLogout,
  isDemo = false,
  onNavigate,
  sidebarPage,
  setSidebarPage,
  updateTicket,
  openTicketDetails
}) => {
  const profileButtonRef = useRef(null);
  
  // Close menus when clicking outside
  const handleClickOutside = (e) => {
    if (showFilterMenu && !e.target.closest('.filter-btn') && !e.target.closest('.filter-dropdown')) {
      setShowFilterMenu(false);
    }
    if (showProfileMenu && !e.target.closest('.user-avatar') && !e.target.closest('.profile-menu')) {
      setShowProfileMenu(false);
    }
    if (priorityMenuOpen && !e.target.closest('.priority-badge-wrapper')) {
      setPriorityMenuOpen(null);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex" onClick={handleClickOutside}>
      {/* Sidebar - Only show in non-demo mode */}
      {!isDemo && <Sidebar activePage={sidebarPage} setActivePage={setSidebarPage} />}
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
      {/* Header */}
      <header className="glass border-b border-white/8 px-10 py-5 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-10">
          {isDemo && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-button rounded-xl flex items-center justify-center text-2xl shadow-[0_8px_24px_rgba(99,102,241,0.3)]">
                🎫
              </div>
              <div className="font-display text-[1.8rem] font-extrabold gradient-brand">
                TicketBud
              </div>
            </div>
          )}
          {!isDemo && (
            <h2 className="font-display text-xl font-bold text-white">
              {sidebarPage === 'dashboard' && 'Dashboard Overview'}
              {sidebarPage === 'tickets' && 'All Tickets'}
              {sidebarPage === 'team' && 'Team Management'}
              {sidebarPage === 'analytics' && 'Analytics'}
              {sidebarPage === 'settings' && 'Settings'}
              {sidebarPage === 'notifications' && 'Notifications'}
              {sidebarPage === 'help' && 'Help & Support'}
              {sidebarPage === 'settings' && 'Settings'}
              {sidebarPage === 'help' && 'Help & Support'}
            </h2>
          )}
        </div>
        <div className="flex items-center gap-5">
          {isDemo && (
            <>
              <button 
                className="px-5 py-2.5 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 bg-transparent text-gray-200 border border-white/20 hover:bg-white/5"
                onClick={() => onNavigate('home')}
              >
                Back to Home
              </button>
              <button 
                className="px-5 py-2.5 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 gradient-button text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(99,102,241,0.4)]"
                onClick={() => onNavigate('login')}
              >
                Sign In
              </button>
            </>
          )}
          {!isDemo && (
            <div className="relative">
              <div 
                ref={profileButtonRef}
                className="w-[42px] h-[42px] gradient-button rounded-full flex items-center justify-center font-semibold cursor-pointer transition-transform duration-300 hover:scale-105 user-avatar"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                SC
              </div>
              {showProfileMenu && (
                <ProfileMenu 
                  buttonRef={profileButtonRef}
                  onLogout={handleLogout}
                  onClose={() => setShowProfileMenu(false)}
                  onNavigateSettings={() => setSidebarPage('settings')}
                />
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-10 py-10 max-w-[1400px] mx-auto flex-1">
        {/* Render different content based on sidebar page */}
        {(sidebarPage === 'dashboard' || sidebarPage === 'tickets' || isDemo) ? (
          <>
        <div className="mb-10">
          <h1 className="font-display text-[2.5rem] font-extrabold mb-2 gradient-text">
            {isDemo ? 'Interactive Demo' : sidebarPage === 'dashboard' ? 'Ticket Dashboard' : 'All Tickets'}
          </h1>
          <p className="text-gray-200/60 text-base">
            {isDemo ? 'Explore TicketFlow\'s features with live sample data' : 'Monitor and manage all support tickets'}
          </p>
        </div>

        {/* Stats Grid - Only show on dashboard */}
        {(sidebarPage === 'dashboard' || isDemo) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard label="Total Tickets" value="142" change="12% from last week" trend="up" />
          <StatsCard label="Open Tickets" value="38" change="5% from yesterday" trend="up" />
          <StatsCard label="In Progress" value="24" change="8% from yesterday" trend="down" />
          <StatsCard label="Resolved Today" value="15" change="23% from yesterday" trend="up" />
        </div>
        )}

        {/* Tickets Section */}
        <div className="glass rounded-[20px]">
          {/* Toolbar */}
          <div className="p-6 border-b border-white/8">
            <div className="flex justify-between items-center gap-5 flex-wrap mb-4">
            <div className="relative flex-1 max-w-[400px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200/40" size={18} />
              <input
                type="text"
                className="w-full py-3 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-gray-200 text-[0.95rem] transition-all duration-300 placeholder:text-gray-200/30 focus:outline-none focus:border-indigo-500 focus:bg-white/8"
                placeholder="Search tickets, assignees, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <button 
                  className="px-5 py-3 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 bg-white/5 text-gray-200 border border-white/10 flex items-center gap-2 hover:bg-white/8 filter-btn"
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                  <Filter size={18} />
                  Filter
                  {(filterOptions.priorities.length > 0 || filterOptions.categories.length > 0) && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
                  )}
                </button>
                {showFilterMenu && (
                  <FilterMenu 
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                    onClose={() => setShowFilterMenu(false)}
                  />
                )}
              </div>
              <button 
                className="px-5 py-3 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 gradient-button text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(99,102,241,0.4)]"
                onClick={() => setShowNewTicketModal(true)}
              >
                <Plus size={18} />
                New Ticket
              </button>
            </div>
            </div>

            {/* Active Filters Display */}
            {(filterOptions.priorities.length > 0 || filterOptions.categories.length > 0 || searchQuery) && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-400">Active filters:</span>
                {searchQuery && (
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm flex items-center gap-2">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-white">×</button>
                  </span>
                )}
                {filterOptions.priorities.map(priority => (
                  <span key={priority} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm flex items-center gap-2 capitalize">
                    {priority}
                    <button 
                      onClick={() => setFilterOptions({
                        ...filterOptions, 
                        priorities: filterOptions.priorities.filter(p => p !== priority)
                      })}
                      className="hover:text-white"
                    >×</button>
                  </span>
                ))}
                {filterOptions.categories.map(category => (
                  <span key={category} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm flex items-center gap-2">
                    {category}
                    <button 
                      onClick={() => setFilterOptions({
                        ...filterOptions, 
                        categories: filterOptions.categories.filter(c => c !== category)
                      })}
                      className="hover:text-white"
                    >×</button>
                  </span>
                ))}
                <button 
                  className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                  onClick={() => {
                    setFilterOptions({ priorities: [], categories: [], assignees: [] });
                    setSearchQuery('');
                  }}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="px-6 pb-6 flex gap-2 border-b border-white/8">
            {['all', 'open', 'in-progress', 'resolved', 'closed'].map(filter => (
              <button
                key={filter}
                className={`px-5 py-2.5 rounded-lg text-[0.9rem] font-semibold cursor-pointer transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-indigo-500/20 text-purple-500'
                    : 'bg-transparent text-gray-200/60 hover:bg-white/5 hover:text-gray-200'
                }`}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter === 'all' ? 'All Tickets' : filter.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>

          {/* Tickets List */}
          <div className="p-6 overflow-visible">
            {filteredTickets.length > 0 ? (
              filteredTickets.map(ticket => (
                <div 
                  key={ticket.id} 
                  className="glass rounded-xl p-5 mb-3 transition-all duration-300 cursor-pointer hover:bg-white/5 hover:border-indigo-500/30 hover:translate-x-1 relative overflow-visible"
                  onClick={() => !isDemo && openTicketDetails(ticket)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <PriorityBadge 
                          priority={ticket.priority}
                          ticketId={ticket.id}
                          onUpdate={updatePriority}
                          priorityMenuOpen={priorityMenuOpen}
                          setPriorityMenuOpen={setPriorityMenuOpen}
                        />
                        <span className="text-[1.05rem] font-semibold text-white">
                          {ticket.title}
                        </span>
                      </div>
                      <div className="flex gap-4 items-center text-[0.85rem] text-gray-200/60 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <StatusBadge status={ticket.status} />
                        </div>
                        <span className="bg-white/5 text-gray-200/70 px-3 py-1 rounded-md text-[0.8rem]">
                          {ticket.category}
                        </span>
                        <span className="bg-indigo-500/15 text-purple-400 px-3 py-1 rounded-md text-[0.8rem] font-semibold">
                          {ticket.assignee}
                        </span>
                        <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/8 px-2.5 py-1 rounded-md text-[0.75rem] text-gray-200/70 font-medium">
                          <Calendar size={12} />
                          {ticket.startDate}
                          <span className="mx-1 text-gray-200/40">→</span>
                          {ticket.endDate}
                        </span>
                        {ticket.subtasks && ticket.subtasks.length > 0 && (
                          <span className="bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-md text-[0.8rem] font-semibold">
                            {ticket.subtasks.filter(st => st.completed).length}/{ticket.subtasks.length} subtasks
                          </span>
                        )}
                      </div>
                      {ticket.status === 'in-progress' && (
                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-2 text-[0.8rem] text-gray-200/60">
                            <span>Progress</span>
                            <span className="font-semibold text-purple-500">{ticket.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-[10px] overflow-hidden">
                            <div 
                              className="h-full gradient-button rounded-[10px] transition-all duration-500 relative overflow-hidden"
                              style={{ width: `${ticket.progress}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <MoreVertical className="text-gray-200/40 cursor-pointer transition-colors duration-300 hover:text-purple-500" size={20} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-gray-200/50">
                <AlertCircle size={48} className="mx-auto mb-5 opacity-30" />
                <p className="text-lg mb-2">No tickets found matching your criteria</p>
                {(filterOptions.priorities.length > 0 || filterOptions.categories.length > 0 || searchQuery) && (
                  <button 
                    className="mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 text-sm text-gray-300"
                    onClick={() => {
                      setFilterOptions({ priorities: [], categories: [], assignees: [] });
                      setSearchQuery('');
                      setSelectedFilter('all');
                    }}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        </>
        ) : sidebarPage === 'team' ? (
          <TeamPage />
        ) : sidebarPage === 'analytics' ? (
          <AnalyticsPage />
        ) : sidebarPage === 'settings' ? (
          <SettingsPage />
        ) : sidebarPage === 'notifications' ? (
          <NotificationsPage />
        ) : sidebarPage === 'help' ? (
          <HelpPage />
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-400">This page is under construction</p>
          </div>
        )}
      </main>
      </div>
    </div>
  );
};

export default DashboardPage;
