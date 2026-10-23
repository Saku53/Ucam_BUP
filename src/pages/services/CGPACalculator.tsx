import React, { useState } from 'react';
import { Calculator, Plus, Trash2, BarChart2 } from 'lucide-react';
 
interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}
 
const GRADE_POINTS: Record<string, number> = {
  'A+': 4.00,
  'A': 3.75,
  'A-': 3.50,
  'B+': 3.25,
  'B': 3.00,
  'B-': 2.75,
  'C+': 2.50,
  'C': 2.25,
  'D': 2.00,
  'F': 0.00,
};
 
const GRADE_SCALE = [
  { grade: 'A+', range: '80% and above', points: '4.00' },
  { grade: 'A',  range: '75% to 79%',   points: '3.75' },
  { grade: 'A-', range: '70% to 74%',   points: '3.50' },
  { grade: 'B+', range: '65% to 69%',   points: '3.25' },
  { grade: 'B',  range: '60% to 64%',   points: '3.00' },
  { grade: 'B-', range: '55% to 59%',   points: '2.75' },
  { grade: 'C+', range: '50% to 54%',   points: '2.50' },
  { grade: 'C',  range: '45% to 49%',   points: '2.25' },
  { grade: 'D',  range: '40% to 44%',   points: '2.00' },
  { grade: 'F',  range: 'Below 40%',    points: '0.00' },
];
 
export default function CGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', credits: 3, grade: 'A+' },
    { id: '2', name: 'Course 2', credits: 3, grade: 'A' },
    { id: '3', name: 'Course 3', credits: 3, grade: 'A-' },
  ]);
 
  const [gpa, setGpa] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);
 
  const handleAddCourse = () => {
    setCourses(prev => [
      ...prev,
      { id: Date.now().toString(), name: `Course ${prev.length + 1}`, credits: 3, grade: 'A' },
    ]);
    setGpa(null);
  };
 
  const handleRemoveCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setGpa(null);
  };
 
  const handleChange = (id: string, field: keyof Course, value: string | number) => {
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, [field]: value } : c)));
    setGpa(null);
  };
 
  const calculateGPA = () => {
    let points = 0;
    let credits = 0;
    courses.forEach(course => {
      const gp = GRADE_POINTS[course.grade] ?? 0;
      const cr = Number(course.credits) || 0;
      points += gp * cr;
      credits += cr;
    });
    setTotalCredits(credits);
    setGpa(credits > 0 ? points / credits : 0);
  };
 
  const getGPAColor = (val: number) => {
    if (val >= 3.75) return '#22c55e';
    if (val >= 3.25) return '#84cc16';
    if (val >= 2.75) return '#eab308';
    if (val >= 2.00) return '#f97316';
    return '#ef4444';
  };
 
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">CGPA Calculator</h1>
        <p className="text-sm text-slate-500 mt-1">
          Calculate your semester GPA based on your courses and grades.
        </p>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <div className="grid grid-cols-12 gap-3 mb-3 pb-2 border-b border-slate-100">
              <div className="col-span-5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Course Name</div>
              <div className="col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Credits</div>
              <div className="col-span-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Grade</div>
              <div className="col-span-1" />
            </div>
 
            <div className="space-y-3">
              {courses.map(course => (
                <div key={course.id} className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      value={course.name}
                      onChange={e => handleChange(course.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={course.credits}
                      onChange={e => handleChange(course.id, 'credits', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <select
                      value={course.grade}
                      onChange={e => handleChange(course.id, 'grade', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm bg-white"
                    >
                      {Object.keys(GRADE_POINTS).map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      className="text-slate-400 hover:text-red-500 transition p-1.5 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
 
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={handleAddCourse}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-2 hover:bg-slate-50 rounded-lg transition"
              >
                <Plus className="w-4 h-4" /> Add Another Course
              </button>
              <button
                onClick={calculateGPA}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition font-semibold text-sm shadow-sm"
              >
                <Calculator className="w-4 h-4" /> Calculate GPA
              </button>
            </div>
          </div>
        </div>
 
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-xl shadow-md text-white text-center">
            <BarChart2 className="w-8 h-8 mx-auto mb-3 opacity-70" />
            <h3 className="text-xs font-medium uppercase tracking-widest opacity-70 mb-2">Semester GPA</h3>
            <p
              className="text-5xl font-bold tracking-tight mb-3"
              style={{ color: gpa !== null ? getGPAColor(gpa) : '#94a3b8' }}
            >
              {gpa !== null ? gpa.toFixed(2) : '—'}
            </p>
            {gpa !== null ? (
              <p className="text-xs font-medium bg-white/10 inline-block px-3 py-1 rounded-full">
                Based on {totalCredits} credits
              </p>
            ) : (
              <p className="text-xs text-slate-400">Press Calculate to see your GPA</p>
            )}
          </div>
 
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-3 text-sm">Grading Scale</h3>
            <div className="space-y-1.5">
              {GRADE_SCALE.map((row, i) => (
                <div
                  key={row.grade}
                  className={`flex justify-between text-xs py-1.5 ${i < GRADE_SCALE.length - 1 ? 'border-b border-slate-50' : ''}`}
                >
                  <span className="text-slate-500">
                    <span className="font-semibold text-slate-700 mr-1">{row.grade}</span>
                    ({row.range})
                  </span>
                  <span className="font-bold text-slate-800">{row.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}