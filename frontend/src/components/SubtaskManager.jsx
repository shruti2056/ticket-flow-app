import { Plus, Check, X, Trash2 } from 'lucide-react';
import { useState } from 'react';

const SubtaskManager = ({ subtasks = [], onUpdateSubtasks }) => {
  const [newSubtask, setNewSubtask] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addSubtask = () => {
    if (newSubtask.trim()) {
      const subtask = {
        id: Date.now(),
        title: newSubtask,
        completed: false
      };
      onUpdateSubtasks([...subtasks, subtask]);
      setNewSubtask('');
      setIsAdding(false);
    }
  };

  const toggleSubtask = (id) => {
    onUpdateSubtasks(
      subtasks.map(st => 
        st.id === id ? { ...st, completed: !st.completed } : st
      )
    );
  };

  const deleteSubtask = (id) => {
    onUpdateSubtasks(subtasks.filter(st => st.id !== id));
  };

  const completedCount = subtasks.filter(st => st.completed).length;
  const totalCount = subtasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="mt-4">
      {/* Progress Header */}
      {totalCount > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Subtasks ({completedCount}/{totalCount})
            </span>
            <span className="text-sm font-semibold text-purple-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full gradient-button rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      )}

      {/* Subtask List */}
      <div className="space-y-2">
        {subtasks.map(subtask => (
          <div 
            key={subtask.id}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/8 transition-all duration-200 group"
          >
            <button
              onClick={() => toggleSubtask(subtask.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                subtask.completed 
                  ? 'bg-indigo-500 border-indigo-500' 
                  : 'border-gray-500 hover:border-indigo-400'
              }`}
            >
              {subtask.completed && <Check size={14} className="text-white" />}
            </button>
            <span className={`flex-1 text-sm ${
              subtask.completed 
                ? 'text-gray-500 line-through' 
                : 'text-gray-300'
            }`}>
              {subtask.title}
            </span>
            <button
              onClick={() => deleteSubtask(subtask.id)}
              className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-200"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Subtask */}
      {isAdding ? (
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSubtask()}
            placeholder="Enter subtask title..."
            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-200 text-sm focus:outline-none focus:border-indigo-500"
            autoFocus
          />
          <button
            onClick={addSubtask}
            className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <Check size={16} />
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
              setNewSubtask('');
            }}
            className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-3 py-2 mt-3 text-sm text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-lg transition-all duration-200 w-full"
        >
          <Plus size={16} />
          Add subtask
        </button>
      )}
    </div>
  );
};

export default SubtaskManager;
