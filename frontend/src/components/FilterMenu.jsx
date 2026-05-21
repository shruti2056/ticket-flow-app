import { useEffect, useRef } from 'react';

const FilterMenu = ({ filterOptions, setFilterOptions, onClose }) => {
  const menuRef = useRef(null);

  const handleCheckboxChange = (type, value, isChecked) => {
    if (isChecked) {
      setFilterOptions({
        ...filterOptions,
        [type]: [...filterOptions[type], value]
      });
    } else {
      setFilterOptions({
        ...filterOptions,
        [type]: filterOptions[type].filter(item => item !== value)
      });
    }
  };

  // Adjust position if dropdown goes off screen
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If dropdown bottom is below viewport, adjust max-height
      if (rect.bottom > windowHeight - 20) {
        const availableHeight = windowHeight - rect.top - 20;
        menuRef.current.style.maxHeight = `${availableHeight}px`;
      }
    }
  }, []);

  return (
    <div 
      ref={menuRef}
      className="absolute top-[calc(100%+8px)] right-0 glass-dark rounded-2xl min-w-[320px] shadow-[0_12px_32px_rgba(0,0,0,0.4)] z-[200] animate-slideDown filter-dropdown overflow-hidden"
      style={{ display: 'flex', flexDirection: 'column', maxHeight: '450px' }}
    >
      {/* Scrollable Content Area */}
      <div className="overflow-y-auto p-5" style={{ flex: '1 1 auto', minHeight: 0 }}>
        <div className="mb-4">
          <h4 className="text-[0.875rem] font-semibold text-gray-200/70 mb-3 uppercase tracking-wider">Priority</h4>
          <div className="flex flex-col gap-2">
            {['urgent', 'high', 'medium', 'low'].map(priority => (
              <label 
                key={priority} 
                className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white/5"
              >
                <input
                  type="checkbox"
                  checked={filterOptions.priorities.includes(priority)}
                  onChange={(e) => handleCheckboxChange('priorities', priority, e.target.checked)}
                  className="w-[18px] h-[18px] cursor-pointer"
                />
                <span className="text-gray-200 text-[0.9rem] capitalize">{priority}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-[0.875rem] font-semibold text-gray-200/70 mb-3 uppercase tracking-wider">Category</h4>
          <div className="flex flex-col gap-2">
            {['Bug', 'Feature', 'Documentation', 'Enhancement'].map(category => (
              <label 
                key={category} 
                className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white/5"
              >
                <input
                  type="checkbox"
                  checked={filterOptions.categories.includes(category)}
                  onChange={(e) => handleCheckboxChange('categories', category, e.target.checked)}
                  className="w-[18px] h-[18px] cursor-pointer"
                />
                <span className="text-gray-200 text-[0.9rem]">{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Buttons at Bottom */}
      <div 
        className="border-t border-white/10 p-4 bg-[rgba(26,31,58,0.95)] rounded-b-2xl"
        style={{ flexShrink: 0 }}
      >
        <div className="flex gap-3 justify-end">
          <button 
            className="px-5 py-2 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 border-none font-sans bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10"
            onClick={() => setFilterOptions({ priorities: [], categories: [], assignees: [] })}
          >
            Clear All
          </button>
          <button 
            className="px-5 py-2 rounded-xl text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 border-none font-sans gradient-button text-white shadow-[0_4px_12px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(99,102,241,0.4)]"
            onClick={onClose}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
