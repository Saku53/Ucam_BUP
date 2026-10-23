import React, { useState } from 'react';
import { Bell, X, CheckCheck } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const NotificationDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { notifications, removeNotification, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const navigate = useNavigate();

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800'
    };
    return colors[type] || colors.info;
  };

  const handleNotificationClick = (notif: any) => {
    markAsRead(notif.id);
    if (notif.action) {
      navigate(notif.action);
      setOpen(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <Bell size={24} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden flex flex-col border border-gray-200">
          <div className="p-4 border-b border-gray-200 sticky top-0 bg-white flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              <p className="text-xs text-gray-500">{unreadCount} unread</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={() => markAllAsRead()}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                <CheckCheck size={14} />
                Mark all as read
              </button>
            )}
          </div>
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500 flex-1 flex items-center justify-center">
              <div>
                <Bell size={32} className="mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            </div>
          ) : (
            <div className="overflow-y-auto flex-1">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${
                    !notif.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notif)}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeColor(notif.type)}`}>
                          {notif.type.toUpperCase()}
                        </span>
                        {!notif.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                      </div>
                      <h4 className="font-medium text-gray-800 mt-1">{notif.title}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatTime(notif.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notif.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded transition"
                    >
                      <X size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;