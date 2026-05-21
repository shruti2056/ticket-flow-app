import { X, Plus, Trash2, Users, Briefcase, Calendar } from 'lucide-react';
import { useState } from 'react';
import { createTicket } from '../services/ticketapi';

// Extracted component to safely use useState inside map
const MemberRow = ({ member, isSelected, subtasks, onToggle, onAddSubtask, onRemoveSubtask }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAddSubtask(member.id, input.trim());
      setInput('');
    }
  };

  return (
    <div
      className={`border rounded-xl transition-all duration-200 ${
        isSelected ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/5 border-white/10'
      }`}
    >
      {/* Member Header */}
      <label className="flex items-center gap-3 p-4 cursor-pointer">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(member.id)}
          className="w-4 h-4 cursor-pointer accent-indigo-500"
        />
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0 text-white">
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>
        <span className="font-semibold text-gray-200">{member.name}</span>
        {isSelected && (
          <span className="ml-auto text-xs text-indigo-400 font-medium">
            {subtasks.length} subtask{subtasks.length !== 1 ? 's' : ''}
          </span>
        )}
      </label>

      {/* Subtasks Panel */}
      {isSelected && (
        <div className="px-4 pb-4 border-t border-white/10 pt-3 space-y-2">
          <p className="text-xs text-gray-400 mb-2">Subtasks for {member.name.split(' ')[0]}</p>

          {subtasks.map(subtask => (
            <div key={subtask.id} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
              <span className="flex-1 text-sm text-gray-200">{subtask.title}</span>
              <button
                type="button"
                onClick={() => onRemoveSubtask(member.id, subtask.id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
              placeholder={`Add subtask for ${member.name.split(' ')[0]}...`}
              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors flex items-center"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
const NewTicketModal = ({ isOpen, onClose, newTicket, setNewTicket, onCreate }) => {
  const [teamName, setTeamName] = useState('');
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [memberSubtasks, setMemberSubtasks] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const teamMembers = [
    { id: 1, name: 'Sarah Chen' },
    { id: 2, name: 'Mike Johnson' },
    { id: 3, name: 'Emma Wilson' },
    { id: 4, name: 'Alex Kumar' },
  ];

  if (!isOpen) return null;

  const handleToggleMember = (memberId) => {
    if (assignedMembers.includes(memberId)) {
      const newSubtasks = { ...memberSubtasks };
      delete newSubtasks[memberId];
      setAssignedMembers(assignedMembers.filter(id => id !== memberId));
      setMemberSubtasks(newSubtasks);
    } else {
      setAssignedMembers([...assignedMembers, memberId]);
      setMemberSubtasks({ ...memberSubtasks, [memberId]: [] });
    }
  };

  const handleAddSubtask = (memberId, title) => {
    setMemberSubtasks(prev => ({
      ...prev,
      [memberId]: [...(prev[memberId] || []), { id: Date.now(), title, completed: false }]
    }));
  };

  const handleRemoveSubtask = (memberId, subtaskId) => {
    setMemberSubtasks(prev => ({
      ...prev,
      [memberId]: prev[memberId].filter(st => st.id !== subtaskId)
    }));
  };

  const handleCreate = async () => {
    setError('');

    if (!newTicket.title?.trim()) {
      setError('Please enter a ticket title.');
      return;
    }
    if (!newTicket.category) {
      setError('Please select a category.');
      return;
    }
    if (!newTicket.priority) {
      setError('Please select a priority.');
      return;
    }

    setLoading(true);
    try {
      const assignedMembersData = assignedMembers.map(memberId => {
        const member = teamMembers.find(m => m.id === memberId);
        return { memberId, memberName: member?.name ?? 'Unknown' };
      });

      const allSubtasks = [];
      Object.entries(memberSubtasks).forEach(([memberId, subtasks]) => {
        const member = teamMembers.find(m => m.id === parseInt(memberId));
        subtasks.forEach(subtask => {
          allSubtasks.push({
            id: subtask.id,
            title: subtask.title,
            completed: false,
            assignedTo: { memberId: parseInt(memberId), memberName: member?.name ?? 'Unknown' }
          });
        });
      });

      const ticketData = {
        title: newTicket.title,
        description: newTicket.description || '',
        category: newTicket.category,
        priority: newTicket.priority,
        status: 'open',
        teamName,
        assignedMembers: assignedMembersData,
        subtasks: allSubtasks,
        startDate: newTicket.startDate || null,
        endDate: newTicket.endDate || null,
        createdBy: { userId: '1', userName: 'Current User' }
      };

      const result = await createTicket(ticketData);

      if (result.success) {
        // Reset
        setTeamName('');
        setAssignedMembers([]);
        setMemberSubtasks({});
        setNewTicket({ title: '', description: '', category: 'Bug', priority: 'medium', assignee: '', startDate: '', endDate: '' });
        onCreate(result.ticket);
        onClose();
      } else {
        setError(result.message || 'Failed to create ticket.');
      }
    } catch (err) {
      console.error('Error creating ticket:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] animate-fadeIn backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-dark rounded-[20px] p-8 max-w-[800px] w-[90%] max-h-[90vh] overflow-y-auto shadow-[0_24px_48px_rgba(0,0,0,0.5)] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-[1.75rem] font-bold text-white">Create New Ticket</h2>
          <button
            className="w-8 h-8 glass rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 text-gray-400/60 hover:bg-white/10 hover:text-gray-200"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Title */}
        <div className="mb-5">
          <label className="block font-semibold mb-2 text-gray-200 text-[0.9rem]">Title <span className="text-red-400">*</span></label>
          <input
            type="text"
            placeholder="Enter ticket title"
            value={newTicket.title}
            onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[0.95rem] font-sans text-gray-200 transition-all duration-300 placeholder:text-gray-200/30 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category & Priority */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block font-semibold mb-2 text-gray-200 text-[0.9rem]">Category <span className="text-red-400">*</span></label>
            <select
              value={newTicket.category}
              onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[0.95rem] font-sans text-gray-200 transition-all duration-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Documentation">Documentation</option>
              <option value="Enhancement">Enhancement</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-200 text-[0.9rem]">Priority <span className="text-red-400">*</span></label>
            <select
              value={newTicket.priority}
              onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[0.95rem] font-sans text-gray-200 transition-all duration-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Start & End Date */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block font-semibold mb-2 text-gray-200 text-[0.9rem] flex items-center gap-1.5">
              <Calendar size={14} /> Start Date
            </label>
            <input
              type="date"
              value={newTicket.startDate}
              onChange={(e) => setNewTicket({ ...newTicket, startDate: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[0.95rem] font-sans text-gray-200 transition-all duration-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-200 text-[0.9rem] flex items-center gap-1.5">
              <Calendar size={14} /> End Date
            </label>
            <input
              type="date"
              value={newTicket.endDate}
              onChange={(e) => setNewTicket({ ...newTicket, endDate: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[0.95rem] font-sans text-gray-200 transition-all duration-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Team Name */}
        <div className="mb-5">
          <label className="block font-semibold mb-2 text-gray-200 text-[0.9rem] flex items-center gap-1.5">
            <Briefcase size={14} /> Team Name <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Frontend Team, Backend Squad"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[0.95rem] font-sans text-gray-200 transition-all duration-300 placeholder:text-gray-200/30 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Assign Team Members & Subtasks */}
        <div className="mb-5">
          <label className="block font-semibold mb-1 text-gray-200 text-[0.9rem] flex items-center gap-1.5">
            <Users size={14} /> Assign Team Members & Subtasks
          </label>
          <p className="text-gray-500 text-xs mb-3">Select members and add per-person subtasks</p>
          <div className="space-y-3">
            {teamMembers.map(member => (
              <MemberRow
                key={member.id}
                member={member}
                isSelected={assignedMembers.includes(member.id)}
                subtasks={memberSubtasks[member.id] || []}
                onToggle={handleToggleMember}
                onAddSubtask={handleAddSubtask}
                onRemoveSubtask={handleRemoveSubtask}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block font-semibold mb-2 text-gray-200 text-[0.9rem]">Description</label>
          <textarea
            placeholder="Enter ticket description..."
            value={newTicket.description}
            onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[0.95rem] font-sans text-gray-200 min-h-[100px] resize-y transition-all duration-300 placeholder:text-gray-200/30 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end mt-7">
          <button
            className="px-7 py-3 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 border-none font-sans bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-7 py-3 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 border-none font-sans gradient-button text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Ticket'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTicketModal;
