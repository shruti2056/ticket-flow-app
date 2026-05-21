import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const AnalyticsPage = () => {
  const metrics = [
    { label: 'Avg. Response Time', value: '2.5 hrs', change: '-15%', trend: 'down', color: 'green' },
    { label: 'Resolution Rate', value: '87%', change: '+5%', trend: 'up', color: 'green' },
    { label: 'Customer Satisfaction', value: '4.6/5', change: '+0.3', trend: 'up', color: 'green' },
    { label: 'Pending Tickets', value: '24', change: '+8%', trend: 'up', color: 'red' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Analytics & Reports</h2>
        <p className="text-gray-400">Track performance and key metrics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="glass rounded-2xl p-6 hover:bg-white/5 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="text-gray-400 text-sm">{metric.label}</div>
              <Activity size={18} className="text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${
              metric.color === 'green' ? 'text-green-500' : 'text-red-500'
            }`}>
              {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Ticket Volume Over Time</h3>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl">
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Tickets by Category</h3>
        <div className="space-y-4">
          {[
            { category: 'Bug', count: 45, percentage: 35, color: 'bg-red-500' },
            { category: 'Feature', count: 32, percentage: 25, color: 'bg-blue-500' },
            { category: 'Enhancement', count: 28, percentage: 22, color: 'bg-yellow-500' },
            { category: 'Documentation', count: 23, percentage: 18, color: 'bg-green-500' },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">{item.category}</span>
                <span className="text-gray-400">{item.count} tickets</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
