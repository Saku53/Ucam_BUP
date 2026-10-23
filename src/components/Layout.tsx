import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Home, BookOpen, User, History, CheckCircle, Award,
  CreditCard, Book, FileText, Download, MessageSquare, Bell, LogOut,
  ChevronDown, MapPin, AlertCircle, Heart, Calendar, Clock,
  BarChart3, Library, Gift, Bus, IdCard, Search, Building2, Utensils,
  ClipboardList, Settings
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  submenu?: MenuItem[];
  badge?: number;
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { label: 'Home', icon: <Home size={20} />, path: '/' },
    { label: 'LMS', icon: <BookOpen size={20} />, path: '/lms' },
    { label: 'Profile', icon: <User size={20} />, path: '/profile' },
    { label: 'Course history', icon: <History size={20} />, path: '/course-history' },
    { label: 'Attendance Summary', icon: <CheckCircle size={20} />, path: '/attendance' },
    { label: 'Current Exam Mark', icon: <Award size={20} />, path: '/exam-marks' },
    { label: 'Bill and Payment History', icon: <CreditCard size={20} />, path: '/bills' },
    { label: 'Student CourseKit', icon: <Book size={20} />, path: '/coursekit' },
    { label: 'Admit Card Download', icon: <Download size={20} />, path: '/admit-card' },
    { label: 'Mid-Term Course Feedback Form', icon: <FileText size={20} />, path: '/midterm-feedback' },
    {
      label: 'Services',
      icon: <MessageSquare size={20} />,
      submenu: [
        { label: 'Lost and Found', icon: <MapPin size={20} />, path: '/lost-found' },
        { label: 'Complaint Box', icon: <AlertCircle size={20} />, path: '/complaints' },
        { label: 'Counseling & Wellness', icon: <Heart size={20} />, path: '/counseling' },
        { label: 'Daily Class Schedule', icon: <Calendar size={20} />, path: '/class-schedule' },
        { label: 'Upcoming Events', icon: <Clock size={20} />, path: '/events' },
        { label: 'CGPA Calculator', icon: <BarChart3 size={20} />, path: '/cgpa-calculator' },
        { label: 'Library Management', icon: <Library size={20} />, path: '/library' },
        { label: 'Scholarship Tracker', icon: <Gift size={20} />, path: '/scholarships' },
        { label: 'Transport/Bus Timing', icon: <Bus size={20} />, path: '/transport' },
        { label: 'ID Card Lost', icon: <IdCard size={20} />, path: '/id-card-lost' },
        { label: 'Hostel Management', icon: <Building2 size={20} />, path: '/hostel' },
        { label: 'Mess Billing', icon: <Utensils size={20} />, path: '/mess-billing' }
      ]
    },
    { label: 'Exam Guidelines', icon: <ClipboardList size={20} />, path: '/exam-guidelines' },
    { label: 'Final Term Evaluation', icon: <FileText size={20} />, path: '/final-feedback' }
  ];

  const isActive = (path?: string) => path && location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-sm`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  UC
                </div>
                <span className="text-sm font-bold text-gray-800">UCAM-Ext</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search */}
        {sidebarOpen && (
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-100 transition text-gray-700 font-medium"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {sidebarOpen && <span className="text-sm">{item.label}</span>}
                  </div>
                  {sidebarOpen && (
                    <ChevronDown
                      size={18}
                      className={`transition transform ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>
              ) : (
                <Link
                  to={item.path || '#'}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {sidebarOpen && <span className="text-sm">{item.label}</span>}
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}

              {/* Submenu */}
              {item.submenu && servicesOpen && sidebarOpen && (
                <div className="ml-4 mt-2 space-y-1 pl-4 border-l-2 border-blue-200">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.label}
                      to={subitem.path || '#'}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                        isActive(subitem.path)
                          ? 'bg-blue-100 text-blue-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {subitem.icon}
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition font-medium">
              <LogOut size={20} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Bangladesh University of Professionals</h1>
            <p className="text-sm text-gray-500">Excellence through Knowledge | UCAM-Ext Portal</p>
          </div>
          <div className="flex items-center gap-6">
            <NotificationDropdown />
            <div className="flex items-center gap-3 pl-6 border-l border-gray-300">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Md. Nazmus Sakib</p>
                <p className="text-xs text-gray-500">CSE-2024-001</p>
              </div>
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Md.Nazmus"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-green-500"
              />
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;