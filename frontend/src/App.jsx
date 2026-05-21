import { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NewTicketModal from './components/NewTicketModal';
import TicketDetailsModal from './components/TicketDetailsModal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [loginForm, setLoginForm] = useState({ 
    email: 'demo@ticketflow.com', 
    password: 'demo123' 
  });
  
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Login page not loading', status: 'open', priority: 'high', assignee: 'Sarah Chen', created: '2 hours ago', category: 'Bug', progress: 0, startDate: '2026-02-07', endDate: '2026-02-09', subtasks: [
      { id: 101, title: 'Investigate error logs', completed: true },
      { id: 102, title: 'Fix authentication flow', completed: false }
    ]},
    { id: 2, title: 'Feature request: Dark mode', status: 'in-progress', priority: 'medium', assignee: 'Mike Johnson', created: '5 hours ago', category: 'Feature', progress: 65, startDate: '2026-02-06', endDate: '2026-02-12', subtasks: [
      { id: 201, title: 'Design dark theme colors', completed: true },
      { id: 202, title: 'Implement theme switcher', completed: true },
      { id: 203, title: 'Test across components', completed: false }
    ]},
    { id: 3, title: 'Payment integration issue', status: 'open', priority: 'urgent', assignee: 'Emma Wilson', created: '1 day ago', category: 'Bug', progress: 0, startDate: '2026-02-06', endDate: '2026-02-08', subtasks: [] },
    { id: 4, title: 'Update documentation', status: 'resolved', priority: 'low', assignee: 'Alex Kumar', created: '2 days ago', category: 'Documentation', progress: 100, startDate: '2026-02-03', endDate: '2026-02-05', subtasks: [
      { id: 401, title: 'Update API docs', completed: true },
      { id: 402, title: 'Add code examples', completed: true }
    ]},
    { id: 5, title: 'Performance optimization needed', status: 'in-progress', priority: 'high', assignee: 'Sarah Chen', created: '3 days ago', category: 'Enhancement', progress: 40, startDate: '2026-02-04', endDate: '2026-02-15', subtasks: [
      { id: 501, title: 'Profile slow queries', completed: true },
      { id: 502, title: 'Optimize database indexes', completed: false },
      { id: 503, title: 'Implement caching', completed: false }
    ]},
    { id: 6, title: 'User authentication error', status: 'open', priority: 'medium', assignee: 'Mike Johnson', created: '4 days ago', category: 'Bug', progress: 0, startDate: '2026-02-03', endDate: '2026-02-10', subtasks: [] },
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [priorityMenuOpen, setPriorityMenuOpen] = useState(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const [newTicket, setNewTicket] = useState({
    title: '',
    category: 'Bug',
    priority: 'medium',
    assignee: '',
    description: '',
    startDate: '',
    endDate: ''
  });
  
  const [filterOptions, setFilterOptions] = useState({
    priorities: [],
    categories: [],
    assignees: []
  });

  const [sidebarPage, setSidebarPage] = useState('dashboard');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketDetails, setShowTicketDetails] = useState(false);

  // Update ticket priority
  const updatePriority = (ticketId, newPriority) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, priority: newPriority } : ticket
    ));
    setPriorityMenuOpen(null);
  };

  // Update ticket (for any field including subtasks and assignee)
  const updateTicket = (ticketId, updates) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, ...updates } : ticket
    ));
    
    // Update selectedTicket if it's the one being updated
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, ...updates });
    }
  };

  // Open ticket details
  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketDetails(true);
  };

  // Create new ticket
  const createNewTicket = () => {
    if (!newTicket.title.trim()) {
      alert('Please enter a ticket title');
      return;
    }
    
    const ticket = {
      id: tickets.length + 1,
      title: newTicket.title,
      status: 'open',
      priority: newTicket.priority,
      assignee: newTicket.assignee || 'Unassigned',
      created: 'Just now',
      category: newTicket.category,
      progress: 0,
      startDate: newTicket.startDate || new Date().toISOString().split('T')[0],
      endDate: newTicket.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      subtasks: [],
      description: newTicket.description || ''
    };
    
    setTickets([ticket, ...tickets]);
    setShowNewTicketModal(false);
    setNewTicket({
      title: '',
      category: 'Bug',
      priority: 'medium',
      assignee: '',
      description: '',
      startDate: '',
      endDate: ''
    });
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentPage('home');
    setShowProfileMenu(false);
  };

  // Login Handler
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setTimeout(() => {
      setCurrentPage('dashboard');
    }, 0);
  };

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || ticket.status === selectedFilter;
    const matchesPriority = filterOptions.priorities.length === 0 || filterOptions.priorities.includes(ticket.priority);
    const matchesCategory = filterOptions.categories.length === 0 || filterOptions.categories.includes(ticket.category);
    
    return matchesSearch && matchesFilter && matchesPriority && matchesCategory;
  });

  const dashboardProps = {
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
    sidebarPage,
    setSidebarPage,
    updateTicket,
    openTicketDetails
  };

  return (
    <>
      {currentPage === 'home' && (
        <HomePage onNavigate={setCurrentPage} />
      )}
      
      {currentPage === 'login' && (
        <LoginPage 
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          onLogin={handleLogin}
        />
      )}
      
      {currentPage === 'dashboard' && (
        <DashboardPage {...dashboardProps} />
      )}
      
      {currentPage === 'demo' && (
        <DashboardPage {...dashboardProps} isDemo={true} onNavigate={setCurrentPage} />
      )}

      {/* New Ticket Modal */}
      <NewTicketModal 
        isOpen={showNewTicketModal}
        onClose={() => setShowNewTicketModal(false)}
        newTicket={newTicket}
        setNewTicket={setNewTicket}
        onCreate={createNewTicket}
      />

      {/* Ticket Details Modal */}
      <TicketDetailsModal 
        ticket={selectedTicket}
        isOpen={showTicketDetails}
        onClose={() => setShowTicketDetails(false)}
        onUpdateTicket={updateTicket}
        priorityMenuOpen={priorityMenuOpen}
        setPriorityMenuOpen={setPriorityMenuOpen}
        updatePriority={updatePriority}
      />
    </>
  );
}

export default App;
