import { X, Calendar, User, Tag, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import SubtaskManager from './SubtaskManager';

const TicketDetailsModal = ({ 
  ticket, 
  isOpen, 
  onClose, 
  onUpdateTicket,
  priorityMenuOpen,
  setPriorityMenuOpen,
  updatePriority,
  availableAssignees = [
    'Sarah Chen',
    'Mike Johnson',
    'Emma Wilson',
    'Alex Kumar',
    'Unassigned'
  ]
}) => {
  const [showAssigneeMenu, setShowAssigneeMenu] = useState(false);

  if (!isOpen || !ticket) return null;

  const handleAssigneeChange = (newAssignee) => {
    onUpdateTicket(ticket.id, { assignee: newAssignee });
    setShowAssigneeMenu(false);
  };

  const handleSubtasksUpdate = (newSubtasks) => {
    onUpdateTicket(ticket.id, { subtasks: newSubtasks });
  };

  const handleStatusChange = (newStatus) => {
    onUpdateTicket(ticket.id, { status: newStatus });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] animate-fadeIn backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="glass-dark rounded-[24px] w-full max-w-[800px] max-h-[90vh] overflow-y-auto shadow-[0_24px_48px_rgba(0,0,0,0.5)] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 sticky top-0 glass-dark z-10 rounded-t-[24px]">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3 flex-1">
              <PriorityBadge 
                priority={ticket.priority}
                ticketId={ticket.id}
                onUpdate={updatePriority}
                priorityMenuOpen={priorityMenuOpen}
                setPriorityMenuOpen={setPriorityMenuOpen}
              />
              <h2 className="text-2xl font-bold text-white flex-1">{ticket.title}</h2>
            </div>
            <button 
              className="w-10 h-10 glass rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 text-gray-400/60 hover:bg-white/10 hover:text-gray-200"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <StatusBadge status={ticket.status} />
            <span className="px-3 py-1 bg-white/5 text-gray-200/70 rounded-lg text-sm border border-white/10">
              <Tag size={14} className="inline mr-1" />
              {ticket.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Assignee Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-3">Assigned To</label>
            <div className="relative">
              <button
                onClick={() => setShowAssigneeMenu(!showAssigneeMenu)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/8 transition-all duration-300"
              >
                <div className="w-10 h-10 gradient-button rounded-full flex items-center justify-center font-semibold text-sm">
                  {ticket.assignee.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-gray-200 flex-1 text-left">{ticket.assignee}</span>
                <svg className={`w-4 h-4 transition-transform ${showAssigneeMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showAssigneeMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 glass-dark rounded-xl p-2 shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-50 max-h-[200px] overflow-y-auto">
                  {availableAssignees.map(assignee => (
                    <button
                      key={assignee}
                      onClick={() => handleAssigneeChange(assignee)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                        ticket.assignee === assignee 
                          ? 'bg-indigo-500/20 text-purple-400' 
                          : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <div className="w-8 h-8 gradient-button rounded-full flex items-center justify-center font-semibold text-xs">
                        {assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{assignee}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Start Date</label>
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 flex items-center gap-2">
                <Calendar size={16} />
                {ticket.startDate}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">End Date</label>
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 flex items-center gap-2">
                <Calendar size={16} />
                {ticket.endDate}
              </div>
            </div>
          </div>

          {/* Status Change */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-3">Status</label>
            <div className="flex flex-wrap gap-2">
              {['open', 'in-progress', 'resolved', 'closed'].map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    ticket.status === status
                      ? 'bg-indigo-500/30 text-purple-300 border-2 border-indigo-500'
                      : 'bg-white/5 text-gray-400 border-2 border-white/10 hover:bg-white/10 hover:text-gray-300'
                  }`}
                >
                  {status.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          {ticket.description && (
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Description</label>
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300">
                {ticket.description}
              </div>
            </div>
          )}

          {/* Subtasks */}
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">Subtasks</label>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <SubtaskManager 
                subtasks={ticket.subtasks || []}
                onUpdateSubtasks={handleSubtasksUpdate}
              />
            </div>
          </div>

          {/* Activity Note */}
          <div className="flex items-start gap-3 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
            <AlertCircle size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <p className="font-semibold mb-1">Activity Log</p>
              <p className="text-gray-400">Created {ticket.created}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;
