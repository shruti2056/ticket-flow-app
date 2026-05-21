import { LogOut, Settings, HelpCircle } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Portal from './Portal';

const ProfileMenu = ({ onLogout, onClose, buttonRef, onNavigateSettings }) => {
  const [position, setPosition] = useState({ top: 0, right: 0 });

  // Update position function
  const updatePosition = () => {
    if (buttonRef && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 12,
        right: window.innerWidth - rect.right
      });
    }
  };

  useEffect(() => {
    updatePosition();
    
    // Update position on scroll and resize
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [buttonRef]);

  const handleSettingsClick = () => {
    onNavigateSettings();
    onClose();
  };

  return (
    <Portal>
      <div 
        className="glass-dark rounded-2xl p-3 min-w-[220px] shadow-[0_12px_32px_rgba(0,0,0,0.4)] animate-slideDown"
        style={{ 
          position: 'fixed',
          top: `${position.top}px`,
          right: `${position.right}px`,
          zIndex: 999999
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-white/10 mb-2">
          <div className="font-semibold text-white mb-1">Sarah Chen</div>
          <div className="text-[0.85rem] text-gray-200/60">sarah.chen@company.com</div>
        </div>
        
        <button 
          className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border-none bg-transparent text-gray-200 text-[0.9rem] font-sans text-left hover:bg-white/8"
          onClick={handleSettingsClick}
        >
          <Settings size={18} />
          Settings
        </button>
        
        <button 
          className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border-none bg-transparent text-gray-200 text-[0.9rem] font-sans text-left hover:bg-white/8"
          onClick={onClose}
        >
        
          <HelpCircle size={18} />
          Help & Support
        </button>
        
        <button 
          className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border-none bg-transparent text-red-500 text-[0.9rem] font-sans text-left hover:bg-red-500/10"
          onClick={onLogout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </Portal>
  );
};

export default ProfileMenu;
