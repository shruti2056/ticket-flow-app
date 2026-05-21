import { useState } from 'react';
import { Bell, Check, X, Trash2, CheckCheck, Filter, AlertCircle, MessageSquare, UserPlus, Calendar } from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'ticket',
      title: 'New ticket assigned to you',
      message: 'You have been assigned to ticket #142: "Login page not loading"',
      time: '5 minutes ago',
      read: false,
      icon: AlertCircle,
      color: 'red'
    },
    {
      id: 2,
      type: 'comment',
      title: 'New comment on your ticket',
      message: 'Mike Johnson commented on ticket #138',
      time: '1 hour ago',
      read: false,
      icon: MessageSquare,
      color: 'blue'
    },
    {
      id: 3,
      type: 'team',
      title: 'Added to team',
      message: 'You have been added to the Engineering team',
      time: '3 hours ago',
      read: true,
      icon: UserPlus,
      color: 'green'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Ticket deadline approaching',
      message: 'Ticket #135 is due tomorrow',
      time: '5 hours ago',
      read: true,
      icon: Calendar,
      color: 'yellow'
    },
    {
      id: 5,
      type: 'ticket',
      title: 'Ticket status changed',
      message: 'Ticket #140 status changed from "In Progress" to "Resolved"',
      time: '1 day ago',
      read: true,
      icon: CheckCheck,
      color: 'purple'
    },
  ]);

  const [filter, setFilter] = useState('all'); // all, unread, read

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const getIconColor = (color) => {
    const colors = {
      red: 'bg-red-500/20 text-red-400',
      blue: 'bg-blue-500/20 text-blue-400',
      green: 'bg-emerald-500/20 text-emerald-400',
      yellow: 'bg-yellow-500/20 text-yellow-400',
      purple: 'bg-purple-500/20 text-purple-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
            <Bell size={28} />
            Notifications
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">
                {unreadCount} unread
              </span>
            )}
          </h2>
          <p className="text-gray-400 text-sm">Stay updated with your ticket activities</p>
        </div>
        
        {notifications.length > 0 && (
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-indigo-500/20 text-purple-400 hover:bg-indigo-500/30 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
              >
                <CheckCheck size={16} />
                Mark all as read
              </button>
            )}
            <button
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
            >
              <Trash2 size={16} />
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'unread', 'read'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              filter === f
                ? 'bg-indigo-500/20 text-purple-400'
                : 'bg-white/5 text-gray-400 hover:bg-white/8 hover:text-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-red-500/30 text-red-300 rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center">
          <Bell size={64} className="mx-auto text-gray-600 mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-white mb-2">
            {filter === 'unread' ? 'No unread notifications' : 
             filter === 'read' ? 'No read notifications' : 
             'No notifications'}
          </h3>
          <p className="text-gray-400">
            {filter === 'all' 
              ? "You're all caught up! Notifications will appear here when you have updates."
              : `Switch to "${filter === 'unread' ? 'all' : 'unread'}" to see other notifications.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map(notification => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`glass rounded-xl p-5 transition-all duration-300 hover:bg-white/8 group ${
                  !notification.read ? 'border-l-4 border-indigo-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(notification.color)}`}>
                    <Icon size={24} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-semibold text-white text-base">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-indigo-500 rounded-full inline-block"></span>
                        )}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{notification.message}</p>

                    {/* Actions */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="px-3 py-1.5 bg-indigo-500/20 text-purple-400 hover:bg-indigo-500/30 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                        >
                          <Check size={14} />
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="px-3 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
