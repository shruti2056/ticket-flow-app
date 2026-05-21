const StatsCard = ({ label, value, change, trend }) => (
  <div className="glass rounded-2xl p-6 transition-all duration-300 hover:bg-white/5 hover:border-indigo-500/30 hover:-translate-y-1">
    <div className="text-sm text-gray-400/60 mb-2 font-medium">{label}</div>
    <div className="text-[2rem] font-bold font-display text-white mb-2">{value}</div>
    <div className={`text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
      {trend === 'up' ? '↑' : '↓'} {change}
    </div>
  </div>
);

export default StatsCard;
