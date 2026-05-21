import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    'open': { 
      color: 'bg-blue-100 text-blue-700', 
      icon: AlertCircle 
    },
    'in-progress': { 
      color: 'bg-amber-100 text-amber-700', 
      icon: Clock 
    },
    'resolved': { 
      color: 'bg-emerald-100 text-emerald-700', 
      icon: CheckCircle 
    },
    'closed': { 
      color: 'bg-gray-100 text-gray-700', 
      icon: XCircle 
    }
  };
  
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
      <Icon size={12} />
      {status.replace('-', ' ')}
    </span>
  );
};

export default StatusBadge;
