import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notification } from '../types';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Midterm Results Released',
      message: 'Your midterm exam results are now available in the portal',
      type: 'success',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      action: '/exam-marks'
    },
    {
      id: '2',
      title: 'Library Fine Due',
      message: 'You have an outstanding library fine of 500 BDT. Please pay within 7 days.',
      type: 'warning',
      timestamp: new Date(Date.now() - 86400000),
      read: false,
      action: '/library'
    },
    {
      id: '3',
      title: 'Counseling Appointment Confirmed',
      message: 'Your counseling appointment with Dr. Sarah Khan is confirmed for tomorrow at 2:00 PM',
      type: 'success',
      timestamp: new Date(Date.now() - 172800000),
      read: true
    },
    {
      id: '4',
      title: 'Bus Schedule Updated',
      message: 'Route 5 bus schedule has been updated. Check transport for new timings.',
      type: 'info',
      timestamp: new Date(Date.now() - 259200000),
      read: true
    }
  ]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setNotifications([newNotification, ...notifications]);
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, markAsRead, markAllAsRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within NotificationProvider');
  return context;
};