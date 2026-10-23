import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, Zap, Filter, Search, X, Eye, Bell, Download } from 'lucide-react';
import { Event } from '../../types';

const UpcomingEvents: React.FC = () => {
  const [events] = useState<Event[]>([
    { id: '1', title: 'Midterm Exams Begin', description: 'Spring semester midterm examinations start from Monday. Check your exam schedule.', date: new Date('2026-04-05'), type: 'exam', priority: 'high', location: 'All Exam Halls', eventCategory: 'Academic' },
    { id: '2', title: 'Course Registration Deadline', description: 'Last day to register for Fall 2026 courses. After this date, late registration fee will apply.', date: new Date('2026-04-10'), time: '11:59 PM', type: 'deadline', priority: 'high', eventCategory: 'Academic' },
    { id: '3', title: 'Annual Sports Day', description: 'University-wide sports competition and athletic events. All students welcome to participate.', date: new Date('2026-04-20'), time: '08:00 AM', type: 'event', priority: 'medium', location: 'Sports Field', eventCategory: 'Sports' },
    { id: '4', title: 'Alumni Meet 2026', description: 'Meet with distinguished alumni and network with professionals in the industry.', date: new Date('2026-04-25'), time: '04:00 PM', type: 'event', priority: 'medium', location: 'Auditorium', eventCategory: 'General' },
    { id: '5', title: 'Scholarship Application Deadline', description: 'Apply for merit-based and need-based scholarships. Deadline is 11:59 PM.', date: new Date('2026-05-01'), time: '11:59 PM', type: 'deadline', priority: 'high', eventCategory: 'Financial' },
    { id: '6', title: 'Summer Break Starts', description: 'University closed for summer vacation. Classes resume on August 1, 2026.', date: new Date('2026-06-01'), type: 'holiday', priority: 'low', eventCategory: 'Administrative' },
    { id: '7', title: 'Final Exams Begin', description: 'Spring semester final examinations. Check exam schedule and instructions.', date: new Date('2026-06-15'), type: 'exam', priority: 'high', location: 'All Exam Halls', eventCategory: 'Academic' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'deadline' | 'event' | 'holiday' | 'exam'>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || e.type === typeFilter;
      return matchesSearch && matchesType;
    }).sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events, searchTerm, typeFilter]);

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'deadline': return 'bg-red-100 text-red-800 border-red-300';
      case 'event': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'holiday': return 'bg-green-100 text-green-800 border-green-300';
      case 'exam': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'deadline': return '⏰';
      case 'event': return '🎉';
      case 'holiday': return '🎊';
      case 'exam': return '📝';
      default: return '📅';
    }
  };

  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Passed';
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `${diff} days away`;
  };

  const upcomingCount = events.filter(e => new Date(e.date) > new Date()).length;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Upcoming Events & Deadlines</h1>
          <p className="text-gray-600 mt-1">{upcomingCount} upcoming events</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            <Download size={20} />
            Export Calendar
          </button>
          <button
            onClick={() => setNotificationEnabled(!notificationEnabled)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition font-semibold ${
              notificationEnabled
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <Bell size={20} />
            {notificationEnabled ? 'Notifications On' : 'Notifications Off'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events and deadlines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              typeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:border-blue-500'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setTypeFilter('deadline')}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              typeFilter === 'deadline' ? 'bg-red-600 text-white' : 'bg-white border border-gray-300 hover:border-red-500'
            }`}
          >
            Deadlines
          </button>
          <button
            onClick={() => setTypeFilter('exam')}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              typeFilter === 'exam' ? 'bg-purple-600 text-white' : 'bg-white border border-gray-300 hover:border-purple-500'
            }`}
          >
            Exams
          </button>
          <button
            onClick={() => setTypeFilter('event')}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              typeFilter === 'event' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:border-blue-500'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setTypeFilter('holiday')}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              typeFilter === 'holiday' ? 'bg-green-600 text-white' : 'bg-white border border-gray-300 hover:border-green-500'
            }`}
          >
            Holidays
          </button>
        </div>
      </div>

      {/* Events Timeline */}
      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No events found</p>
          </div>
        ) : (
          filteredEvents.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {getTypeIcon(event.type)}
                </div>
                {index < filteredEvents.length - 1 && (
                  <div className="w-1 h-12 bg-gray-200 mt-2"></div>
                )}
              </div>
              <div
                onClick={() => {
                  setSelectedEvent(event);
                  setShowDetail(true);
                }}
                className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border ${getTypeColor(event.type)}`}>
                    {event.type.toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    {event.date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  {event.time && (
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-600" />
                      {event.time}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-600" />
                      {event.location}
                    </div>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="font-semibold text-gray-800">{getDaysUntil(event.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {showDetail && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">{selectedEvent.title}</h2>
              <button onClick={() => setShowDetail(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Description</p>
                <p className="text-gray-800">{selectedEvent.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Date</p>
                  <p className="font-semibold text-gray-800">{selectedEvent.date.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Type</p>
                  <p className="font-semibold text-gray-800">{selectedEvent.type.toUpperCase()}</p>
                </div>
                {selectedEvent.time && (
                  <div>
                    <p className="text-gray-500 text-sm">Time</p>
                    <p className="font-semibold text-gray-800">{selectedEvent.time}</p>
                  </div>
                )}
                {selectedEvent.location && (
                  <div>
                    <p className="text-gray-500 text-sm">Location</p>
                    <p className="font-semibold text-gray-800">{selectedEvent.location}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Add to Calendar
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition font-semibold">
                  Set Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;