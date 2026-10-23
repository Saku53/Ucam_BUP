import React from 'react';
import { BarChart3, Calendar, AlertCircle, Heart, MapPin, Zap, BookOpen, Users, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'CGPA', value: '3.85', icon: <BarChart3 size={24} />, color: 'from-blue-500 to-blue-600', path: '/cgpa-calculator' },
    { label: 'Attendance', value: '92%', icon: <Users size={24} />, color: 'from-green-500 to-green-600', path: '/attendance' },
    { label: 'Pending Tasks', value: '3', icon: <AlertCircle size={24} />, color: 'from-yellow-500 to-yellow-600', path: '/complaints' },
    { label: 'Library Fine', value: '500 BDT', icon: <Clock size={24} />, color: 'from-red-500 to-red-600', path: '/library' }
  ];

  const quickLinks = [
    { title: 'Class Schedule', icon: <Calendar size={32} />, color: 'from-blue-500 to-blue-600', path: '/class-schedule' },
    { title: 'Complaints', icon: <AlertCircle size={32} />, color: 'from-orange-500 to-orange-600', path: '/complaints' },
    { title: 'Counseling', icon: <Heart size={32} />, color: 'from-pink-500 to-pink-600', path: '/counseling' },
    { title: 'Lost & Found', icon: <MapPin size={32} />, color: 'from-purple-500 to-purple-600', path: '/lost-found' }
  ];

  const moreLinks = [
    { title: 'Library', icon: <BookOpen size={28} />, color: 'from-indigo-500 to-indigo-600', path: '/library' },
    { title: 'Events', icon: <Zap size={28} />, color: 'from-cyan-500 to-cyan-600', path: '/events' },
    { title: 'Bus Timing', icon: <Clock size={28} />, color: 'from-violet-500 to-violet-600', path: '/transport' },
    { title: 'Scholarships', icon: <TrendingUp size={28} />, color: 'from-emerald-500 to-emerald-600', path: '/scholarships' }
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome back, Nazmus! 👋</h2>
        <p className="text-gray-600 mt-2">Here's what's happening with your account today. Semester 4 • Computer Science</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Link
            key={idx}
            to={stat.path}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer group"
          >
            <div className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition`}>
              {stat.icon}
            </div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Access */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`bg-gradient-to-br ${link.color} text-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 group`}
            >
              <div className="mb-4 group-hover:scale-110 transition">{link.icon}</div>
              <h4 className="font-semibold text-lg">{link.title}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* More Services */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">More Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moreLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`bg-gradient-to-br ${link.color} text-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition transform hover:scale-105 text-center group`}
            >
              <div className="flex justify-center mb-2 group-hover:scale-110 transition">{link.icon}</div>
              <p className="text-sm font-semibold">{link.title}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Notices</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded hover:bg-blue-100 transition cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Semester Results Available</h4>
                  <p className="text-sm text-gray-600 mt-1">Your final semester results have been posted on the portal</p>
                </div>
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">NEW</span>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded hover:bg-yellow-100 transition cursor-pointer">
              <h4 className="font-semibold text-gray-800">Library Books Due</h4>
              <p className="text-sm text-gray-600 mt-1">3 books are due for return by March 30, 2026</p>
            </div>
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded hover:bg-green-100 transition cursor-pointer">
              <h4 className="font-semibold text-gray-800">Scholarship News</h4>
              <p className="text-sm text-gray-600 mt-1">New merit-based scholarship applications are open until April 15</p>
            </div>
            <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded hover:bg-purple-100 transition cursor-pointer">
              <h4 className="font-semibold text-gray-800">Exam Schedule Released</h4>
              <p className="text-sm text-gray-600 mt-1">Final exams will begin from June 1st. Check exam guidelines section</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="font-semibold text-sm text-gray-800">Midterm Exams</p>
              <p className="text-xs text-gray-600 mt-1">Starts April 5, 2026</p>
            </div>
            <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
              <p className="font-semibold text-sm text-gray-800">Course Registration</p>
              <p className="text-xs text-gray-600 mt-1">April 10-15, 2026</p>
            </div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="font-semibold text-sm text-gray-800">Alumni Meet</p>
              <p className="text-xs text-gray-600 mt-1">April 20, 2026</p>
            </div>
            <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
              <p className="font-semibold text-sm text-gray-800">Final Exams</p>
              <p className="text-xs text-gray-600 mt-1">Starts June 1, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;