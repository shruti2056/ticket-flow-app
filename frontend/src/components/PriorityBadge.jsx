import { useState, useRef, useEffect } from 'react';
import Portal from './Portal';

const PriorityBadge = ({ priority, ticketId, onUpdate, priorityMenuOpen, setPriorityMenuOpen }) => {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  const priorityConfig = {
    'urgent': { label: 'Urgent', icon: '🚨' },
    'high': { label: 'High', icon: '🔴' },
    'medium': { label: 'Medium', icon: '🟡' },
    'low': { label: 'Low', icon: '🟢' }
  };
  
  const config = priorityConfig[priority];
  const isMenuOpen = priorityMenuOpen === ticketId;
  
  const getPriorityDotColor = (priority) => {
    const colors = {
      'urgent': 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
      'high': 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]',
      'medium': 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]',
      'low': 'bg-green-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'
    };
    return colors[priority];
  };

  // Update position function
  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
    }
  };

  // Calculate dropdown position when menu opens and on scroll
  useEffect(() => {
    if (isMenuOpen) {
      updatePosition();
      
      // Update position on scroll and resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isMenuOpen]);
  
  return (
    <div className="relative inline-block">
      <button 
        ref={buttonRef}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/8 hover:border-indigo-500/30 hover:-translate-y-0.5 font-semibold text-gray-200 text-[0.85rem]"
        onClick={(e) => {
          e.stopPropagation();
          setPriorityMenuOpen(isMenuOpen ? null : ticketId);
        }}
        title={`Priority: ${config.label}`}
      >
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityDotColor(priority)}`}></span>
        <span className="text-[0.8rem]">{config.label}</span>
      </button>
      
      {isMenuOpen && (
        <Portal>
          <div 
            className="glass-dark rounded-xl p-2 min-w-[160px] shadow-[0_8px_24px_rgba(0,0,0,0.4)] animate-slideDown" 
            style={{
              position: 'fixed',
              top: `${position.top}px`,
              left: `${position.left}px`,
              zIndex: 999999
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {Object.entries(priorityConfig).map(([key, val]) => (
              <button
                key={key}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 border-none font-sans text-[0.9rem] text-left ${
                  priority === key 
                    ? 'bg-indigo-500/20 text-purple-400 font-semibold' 
                    : 'bg-transparent text-gray-200/80 hover:bg-indigo-500/15 hover:text-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdate(ticketId, key);
                }}
              >
                <span className={`w-2 h-2 rounded-full ${getPriorityDotColor(key)}`}></span>
                <span>{val.icon} {val.label}</span>
              </button>
            ))}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default PriorityBadge;
