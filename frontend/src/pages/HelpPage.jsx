import { useState } from 'react';
import { HelpCircle, Mail, MessageCircle, Book, Video, FileText, ChevronDown, ChevronUp, Search, Send } from 'lucide-react';

const HelpPage = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: Book },
    { id: 'tickets', name: 'Managing Tickets', icon: FileText },
    { id: 'account', name: 'Account Settings', icon: HelpCircle },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: MessageCircle },
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'How do I create my first ticket?',
        answer: 'Click the "New Ticket" button in the top right corner of your dashboard. Fill in the ticket details including title, category, priority, and description. You can also assign team members and add subtasks.'
      },
      {
        question: 'What are the different priority levels?',
        answer: 'We have 4 priority levels: Urgent (critical issues), High (important issues), Medium (standard issues), and Low (minor issues). Choose the appropriate priority based on the ticket\'s impact and urgency.'
      },
      {
        question: 'How do I navigate between different pages?',
        answer: 'Use the sidebar on the left to navigate between Dashboard, All Tickets, Team, Analytics, Notifications, Settings, and Help pages. Click on any menu item to switch pages.'
      },
    ],
    'tickets': [
      {
        question: 'How do I assign a ticket to team members?',
        answer: 'When creating a ticket, select team members from the "Assign to Team Members" section. You can assign multiple team members to collaborate on a ticket. Each subtask can also be assigned to specific team members.'
      },
      {
        question: 'What are subtasks and how do I use them?',
        answer: 'Subtasks break down a ticket into smaller, manageable tasks. Add subtasks in the ticket creation form, and assign each subtask to specific team members. You can check off subtasks as they\'re completed to track progress.'
      },
      {
        question: 'How do I filter tickets?',
        answer: 'Use the filter tabs (All, Open, In Progress, Resolved, Closed) above the ticket list. You can also use the Filter button to filter by priority, category, and assignee. Use the search bar to find specific tickets.'
      },
      {
        question: 'Can I change a ticket\'s priority or status?',
        answer: 'Yes! Click on the priority badge to change priority levels. Click on a ticket to open details, where you can update status, priority, assignee, and other information.'
      },
    ],
    'account': [
      {
        question: 'How do I update my profile information?',
        answer: 'Go to Settings from the sidebar or profile menu. In the Profile tab, you can update your name, email, and phone number. Click "Save Changes" to apply updates.'
      },
      {
        question: 'How do I change my password?',
        answer: 'Navigate to Settings → Security tab. Enter your current password, new password, and confirm the new password. Click "Update Password" to save changes.'
      },
      {
        question: 'Can I change my avatar?',
        answer: 'Yes! Go to Settings → Profile tab and click the "Change Avatar" button next to your current avatar. You can upload a new profile picture.'
      },
    ],
    'troubleshooting': [
      {
        question: 'Why can\'t I see the logout button?',
        answer: 'The profile menu should appear when you click your avatar in the top right. If it\'s hidden, try refreshing the page (Ctrl+Shift+R). The dropdown uses Portal rendering to appear on top of all content.'
      },
      {
        question: 'The priority dropdown is hiding behind cards',
        answer: 'This has been fixed in the latest version using React Portals. If you still see this issue, please refresh your browser cache (Ctrl+Shift+R) to load the updated components.'
      },
      {
        question: 'My filters aren\'t working',
        answer: 'Make sure you\'ve clicked "Apply" after selecting filter options. To reset filters, click "Clear all" in the active filters row or individual X buttons on filter badges.'
      },
    ],
  };

  const resources = [
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides on using TicketFlow',
      action: 'Watch Videos',
      color: 'red'
    },
    {
      icon: Book,
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      action: 'Read Docs',
      color: 'blue'
    },
    {
      icon: MessageCircle,
      title: 'Community Forum',
      description: 'Connect with other users and share tips',
      action: 'Join Forum',
      color: 'green'
    },
  ];

  const filteredFaqs = Object.entries(faqs).reduce((acc, [category, items]) => {
    const filtered = items.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  const handleSubmitContact = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend
    alert('Thank you for contacting us! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 gradient-button rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={40} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">How can we help you?</h2>
        <p className="text-gray-400">Search our help center or browse categories below</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
          />
        </div>
      </div>

      {/* Quick Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, idx) => {
          const Icon = resource.icon;
          return (
            <div key={idx} className="glass rounded-2xl p-6 hover:bg-white/8 transition-all duration-300 group cursor-pointer">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                resource.color === 'red' ? 'bg-red-500/20 text-red-400' :
                resource.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                'bg-emerald-500/20 text-emerald-400'
              }`}>
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{resource.description}</p>
              <button className="text-purple-400 text-sm font-semibold hover:text-purple-300 transition-colors">
                {resource.action} →
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="border-b border-white/10">
          <div className="flex overflow-x-auto">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-indigo-500/20 text-purple-400 border-b-2 border-indigo-500'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {searchQuery && Object.keys(filteredFaqs).length === 0 ? (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto text-gray-600 mb-4 opacity-50" />
              <p className="text-gray-400">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-3">
              {(searchQuery ? filteredFaqs : { [activeCategory]: faqs[activeCategory] })[activeCategory]?.map((faq, idx) => (
                <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === `${activeCategory}-${idx}` ? null : `${activeCategory}-${idx}`)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-white pr-4">{faq.question}</span>
                    {expandedFaq === `${activeCategory}-${idx}` ? (
                      <ChevronUp size={20} className="text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === `${activeCategory}-${idx}` && (
                    <div className="px-4 pb-4 text-gray-300 text-sm border-t border-white/10 pt-4 bg-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Form */}
      <div className="glass rounded-2xl p-8">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Mail size={24} />
            Still need help?
          </h3>
          <p className="text-gray-400 mb-6">Send us a message and we'll get back to you within 24 hours.</p>

          <form onSubmit={handleSubmitContact} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                required
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={contactForm.subject}
              onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
            />
            <textarea
              placeholder="Your Message"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              required
              rows={5}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 gradient-button text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
            >
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
