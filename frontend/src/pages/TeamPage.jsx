import { useState, useRef, useEffect } from 'react';
import { Users, Mail, Phone, MoreVertical, X, Edit2, Trash2, Check, Plus } from 'lucide-react';
import Portal from '../components/Portal';

const ROLES = [
  'Senior Support Engineer',
  'Support Specialist',
  'Technical Support Lead',
  'Support Engineer',
  'Product Manager',
  'Developer',
  'QA Engineer',
];

const AVATAR_COLORS = [
  'from-indigo-500 to-purple-600',
  'from-pink-500 to-rose-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-sky-500 to-blue-600',
  'from-violet-500 to-fuchsia-600',
];

const getInitials = (name) =>
  name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const emptyForm = { name: '', role: ROLES[0], email: '', phone: '' };

/* ─── Member Card Menu (Portal-based) ─── */
const MemberMenu = ({ buttonRef, onEdit, onRemove, onClose }) => {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const update = () => {
    if (buttonRef?.current) {
      const r = buttonRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 8, left: r.right - 160 });
    }
  };

  useEffect(() => {
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <Portal>
      {/* backdrop */}
      <div className="fixed inset-0" style={{ zIndex: 999998 }} onClick={onClose} />
      {/* menu */}
      <div
        className="glass-dark rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.4)] animate-slideDown"
        style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 999999, minWidth: 160 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-white/8 transition-colors"
          onClick={() => { onEdit(); onClose(); }}
        >
          <Edit2 size={15} className="text-indigo-400" /> Edit Member
        </button>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          onClick={() => { onRemove(); onClose(); }}
        >
          <Trash2 size={15} /> Remove Member
        </button>
      </div>
    </Portal>
  );
};

/* ─── Add / Edit Member Modal ─── */
const MemberModal = ({ member, onSave, onClose }) => {
  const [form, setForm] = useState(member || emptyForm);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(member);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
  };

  const field = (key, label, placeholder, type = 'text') => (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: '' }); }}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-gray-200 text-sm placeholder:text-gray-500
          focus:outline-none focus:bg-white/8 transition-all duration-200
          ${errors[key] ? 'border-red-500' : 'border-white/10 focus:border-indigo-500'}`}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
      style={{ zIndex: 1000000 }}
      onClick={onClose}
    >
      <div
        className="glass-dark rounded-2xl p-8 w-full max-w-[500px] shadow-[0_24px_48px_rgba(0,0,0,0.5)] animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-bold text-white">
            {isEdit ? 'Edit Member' : 'Add New Member'}
          </h2>
          <button
            className="w-8 h-8 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* avatar preview */}
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${AVATAR_COLORS[(form.name.length) % AVATAR_COLORS.length]} flex items-center justify-center font-bold text-2xl text-white shadow-lg`}>
            {form.name ? getInitials(form.name) : '?'}
          </div>
        </div>

        <div className="space-y-4">
          {field('name', 'Full Name', 'e.g. John Smith')}

          {/* role dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1.5">Role</label>
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-200 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white/8 transition-all"
            >
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {field('email', 'Email Address', 'john@company.com', 'email')}
          {field('phone', 'Phone Number', '+1 234-567-8900')}
        </div>

        <div className="flex gap-3 justify-end mt-7">
          <button
            className="px-6 py-3 rounded-xl text-sm font-semibold bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 rounded-xl text-sm font-semibold gradient-button text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(99,102,241,0.4)] transition-all flex items-center gap-2"
            onClick={handleSubmit}
          >
            {isEdit ? <><Check size={16} /> Save Changes</> : <><Plus size={16} /> Add Member</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Confirm Remove Modal ─── */
const ConfirmModal = ({ member, onConfirm, onClose }) => (
  <div
    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
    style={{ zIndex: 1000000 }}
    onClick={onClose}
  >
    <div
      className="glass-dark rounded-2xl p-8 w-full max-w-[400px] shadow-[0_24px_48px_rgba(0,0,0,0.5)] animate-slideUp"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
          <Trash2 size={28} className="text-red-400" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-white text-center mb-2">Remove Member</h2>
      <p className="text-gray-400 text-center text-sm mb-6">
        Are you sure you want to remove <span className="text-white font-semibold">{member.name}</span>? This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 transition-all"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="flex-1 px-5 py-3 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-all flex items-center justify-center gap-2"
          onClick={onConfirm}
        >
          <Trash2 size={15} /> Remove
        </button>
      </div>
    </div>
  </div>
);

/* ─── Main TeamPage ─── */
const TeamPage = () => {
  const [members, setMembers] = useState([
    { id: 1, name: 'Sarah Chen',   role: 'Senior Support Engineer', email: 'sarah.chen@company.com',   phone: '+1 234-567-8901', tickets: 12, colorIdx: 0 },
    { id: 2, name: 'Mike Johnson', role: 'Support Specialist',       email: 'mike.johnson@company.com', phone: '+1 234-567-8902', tickets: 8,  colorIdx: 1 },
    { id: 3, name: 'Emma Wilson',  role: 'Technical Support Lead',   email: 'emma.wilson@company.com',  phone: '+1 234-567-8903', tickets: 15, colorIdx: 2 },
    { id: 4, name: 'Alex Kumar',   role: 'Support Engineer',         email: 'alex.kumar@company.com',   phone: '+1 234-567-8904', tickets: 6,  colorIdx: 3 },
  ]);

  const [openMenuId, setOpenMenuId]       = useState(null);
  const [showAddModal, setShowAddModal]   = useState(false);
  const [editMember, setEditMember]       = useState(null);
  const [removeMember, setRemoveMember]   = useState(null);
  const menuButtonRefs = useRef({});

  /* ── handlers ── */
  const handleAdd = (form) => {
    const newMember = {
      id: Date.now(),
      ...form,
      tickets: 0,
      colorIdx: members.length % AVATAR_COLORS.length,
    };
    setMembers([...members, newMember]);
    setShowAddModal(false);
  };

  const handleEdit = (form) => {
    setMembers(members.map(m => m.id === editMember.id ? { ...m, ...form } : m));
    setEditMember(null);
  };

  const handleRemove = () => {
    setMembers(members.filter(m => m.id !== removeMember.id));
    setRemoveMember(null);
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Team Members</h2>
          <p className="text-gray-400 text-sm">{members.length} member{members.length !== 1 ? 's' : ''} in your team</p>
        </div>
        <button
          className="px-5 py-3 rounded-xl font-semibold gradient-button text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} /> Add Member
        </button>
      </div>

      {/* cards */}
      {members.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <Users size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400 text-lg">No team members yet.</p>
          <button
            className="mt-4 px-6 py-3 rounded-xl gradient-button text-white text-sm font-semibold"
            onClick={() => setShowAddModal(true)}
          >
            Add your first member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {members.map(member => (
            <div key={member.id} className="glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 relative overflow-visible">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${AVATAR_COLORS[member.colorIdx ?? 0]} flex items-center justify-center font-bold text-lg text-white shadow-lg flex-shrink-0`}>
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg leading-tight">{member.name}</h3>
                    <p className="text-purple-400 text-sm mt-0.5">{member.role}</p>
                  </div>
                </div>

                {/* hamburger menu button */}
                <button
                  ref={el => menuButtonRefs.current[member.id] = el}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  onClick={e => { e.stopPropagation(); setOpenMenuId(openMenuId === member.id ? null : member.id); }}
                >
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Mail size={15} className="text-gray-500 flex-shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Phone size={15} className="text-gray-500 flex-shrink-0" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-gray-400 text-sm">Active Tickets</span>
                <span className="px-3 py-1 bg-indigo-500/20 text-purple-400 rounded-lg font-semibold text-sm">
                  {member.tickets}
                </span>
              </div>

              {/* portal dropdown menu */}
              {openMenuId === member.id && (
                <MemberMenu
                  buttonRef={{ current: menuButtonRefs.current[member.id] }}
                  onEdit={() => setEditMember(member)}
                  onRemove={() => setRemoveMember(member)}
                  onClose={() => setOpenMenuId(null)}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <MemberModal onSave={handleAdd} onClose={() => setShowAddModal(false)} />
      )}

      {/* Edit Modal */}
      {editMember && (
        <MemberModal member={editMember} onSave={handleEdit} onClose={() => setEditMember(null)} />
      )}

      {/* Confirm Remove Modal */}
      {removeMember && (
        <ConfirmModal member={removeMember} onConfirm={handleRemove} onClose={() => setRemoveMember(null)} />
      )}
    </div>
  );
};

export default TeamPage;

