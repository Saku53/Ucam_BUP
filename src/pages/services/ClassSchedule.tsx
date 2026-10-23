import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Filter, Download, Share2 } from 'lucide-react';
import { ClassSchedule } from '../../types';

const ClassScheduleView: React.FC = () => {
  const [schedule] = useState<ClassSchedule[]>([
    { id: '1', courseCode: 'ICE-301', courseName: 'Web Tech', instructor: 'Atika Akter', day: 'Monday', startTime: '08:30 AM', endTime: '10:30 AM', room: 'CR-301', building: 'Academic Building', credits: 3, capacity: 50, enrolled: 48 },
    { id: '2', courseCode: 'ICE-302', courseName: 'Database Management Systems', instructor: 'Sharmeen Jahan', day: 'Monday', startTime: '11:00 AM', endTime: '12:30 PM', room: '402', building: 'Science', credits: 4, capacity: 50, enrolled: 49 },
    { id: '3', courseCode: 'CSE-303', courseName: 'Mobile Development', instructor: 'Dr. Karim Hassan', day: 'Tuesday', startTime: '09:00 AM', endTime: '10:30 AM', room: '501', building: 'Science', credits: 3, capacity: 40, enrolled: 38 },
    { id: '4', courseCode: 'CSE-304', courseName: 'Artificial Intelligence & ML', instructor: 'Dr. Nasrin Jahan', day: 'Wednesday', startTime: '02:00 PM', endTime: '03:30 PM', room: '301', building: 'Tech', credits: 4, capacity: 60, enrolled: 55 },
    { id: '5', courseCode: 'CSE-305', courseName: 'Data Structures', instructor: 'Dr. Reza Ahmed', day: 'Thursday', startTime: '10:00 AM', endTime: '11:30 AM', room: '203', building: 'Tech', credits: 3, capacity: 50, enrolled: 50 },
    { id: '6', courseCode: 'CSE-306', courseName: 'Software Engineering', instructor: 'Dr. Shahin Islam', day: 'Friday', startTime: '09:00 AM', endTime: '10:30 AM', room: '105', building: 'Admin', credits: 3, capacity: 45, enrolled: 42 },
  ]);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredSchedule = selectedDay ? schedule.filter(s => s.day === selectedDay) : schedule;
  const totalCredits = schedule.reduce((sum, s) => sum + s.credits, 0);

  const getTimeBlocks = (day: string) => {
    return schedule.filter(s => s.day === day).sort((a, b) => {
      const aTime = parseInt(a.startTime.split(':')[0]);
      const bTime = parseInt(b.startTime.split(':')[0]);
      return aTime - bTime;
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Daily Class Schedule</h1>
          <p className="text-gray-600 mt-1">Total Credits: {totalCredits} | Total Courses: {schedule.length}</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            <Download size={20} />
            Download
          </button>
          <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold">
            <Share2 size={20} />
            Share
          </button>
        </div>
      </div>

      {/* View Toggle and Filters */}
      <div className="mb-6 flex gap-4 flex-wrap items-center">
        <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => setViewType('list')}
            className={`px-4 py-2 rounded transition font-medium ${
              viewType === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewType('grid')}
            className={`px-4 py-2 rounded transition font-medium ${
              viewType === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'
            }`}
          >
            Grid View
          </button>
        </div>
      </div>

      {/* Day Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedDay(null)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
            selectedDay === null ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:border-blue-500'
          }`}
        >
          All Days
        </button>
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
              selectedDay === day ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 hover:border-blue-500'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Grid View */}
      {viewType === 'grid' && (
        <div className="mb-8">
          <div className="grid grid-cols-5 gap-4 mb-4">
            {days.map(day => (
              <div key={day} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="font-bold text-gray-800 text-center mb-4">{day}</h3>
                <div className="space-y-2">
                  {getTimeBlocks(day).map(cls => (
                    <div
                      key={cls.id}
                      className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded cursor-pointer hover:shadow-md transition"
                    >
                      <p className="text-xs font-bold text-blue-900">{cls.courseName}</p>
                      <p className="text-xs text-blue-700 mt-1">{cls.startTime} - {cls.endTime}</p>
                      <p className="text-xs text-blue-600">{cls.room}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewType === 'list' && (
        <div className="space-y-4">
          {filteredSchedule.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No classes scheduled for this day</p>
            </div>
          ) : (
            filteredSchedule.sort((a, b) => {
              const aTime = parseInt(a.startTime.split(':')[0]);
              const bTime = parseInt(b.startTime.split(':')[0]);
              return aTime - bTime;
            }).map(cls => (
              <div key={cls.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{cls.courseName}</h3>
                    <p className="text-sm text-gray-500 mt-1">{cls.courseCode}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">{cls.day}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-semibold">{cls.startTime} - {cls.endTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Room</p>
                      <p className="font-semibold">{cls.room}, {cls.building}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <User size={18} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Instructor</p>
                      <p className="font-semibold">{cls.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Filter size={18} className="text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Credits</p>
                      <p className="font-semibold">{cls.credits} credits</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{cls.enrolled}/{cls.capacity}</span> students enrolled
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition font-semibold text-sm">
                      Add to Calendar
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition font-semibold text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ClassScheduleView;