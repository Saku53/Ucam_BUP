export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  phone: string;
  avatar?: string;
  status: 'online' | 'offline';
  semester: number;
  department: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
  action?: string;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'lost' | 'found' | 'returned';
  location: string;
  date: Date;
  image?: string;
  contactName: string;
  contactPhone: string;
  studentId: string;
  claimStatus?: 'unclaimed' | 'claimed' | 'rejected';
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-review' | 'resolved' | 'closed';
  createdDate: Date;
  updatedDate: Date;
  attachment?: string;
  resolution?: string;
  studentId: string;
  priority: 'low' | 'medium' | 'high';
}

export interface CounselingAppointment {
  id: string;
  counselorName: string;
  counselorSpecialization: string;
  date: Date;
  time: string;
  duration: number;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  studentId: string;
  location: string;
}

export interface ClassSchedule {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  building: string;
  credits: number;
  capacity: number;
  enrolled: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time?: string;
  type: 'deadline' | 'event' | 'holiday' | 'exam' | 'registration';
  priority: 'high' | 'medium' | 'low';
  location?: string;
  eventCategory: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: 'available' | 'issued' | 'reserved';
  copies: number;
  issuedDate?: Date;
  dueDate?: Date;
  renewalCount?: number;
  fineAmount?: number;
  location: string;
  shelfNumber: string;
}

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'approved' | 'rejected' | 'received' | 'active';
  applicationDate: Date;
  resultDate?: Date;
  documents?: string[];
  provider: string;
  criteria: string;
  renewalDate?: Date;
  disbursementStatus: 'pending' | 'disbursed' | 'delayed';
}

export interface BusSchedule {
  id: string;
  routeNumber: string;
  routeName: string;
  departureTime: string;
  arrivalTime: string;
  stops: string[];
  capacity: number;
  availableSeats: number;
  driver: string;
  status: 'on-time' | 'delayed' | 'cancelled';
  fare: number;
  nextBusTime?: string;
}

export interface IDCardLost {
  id: string;
  reportDate: Date;
  status: 'pending' | 'approved' | 'card-issued' | 'collected' | 'rejected';
  approvalDate?: Date;
  newCardIssueDate?: Date;
  pickupLocation?: string;
  pickupDate?: Date;
  studentId: string;
  reportNumber: string;
}

export interface HostelRoom {
  id: string;
  roomNumber: string;
  building: string;
  floor: number;
  type: 'single' | 'double' | 'triple';
  status: 'available' | 'assigned' | 'maintenance';
  occupants: string[];
  rent: number;
}

export interface MessBill {
  id: string;
  month: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: Date;
  paidDate?: Date;
  fineAmount?: number;
}

export interface ExamGuideline {
  id: string;
  title: string;
  content: string;
  category: string;
  attachmentUrl?: string;
  uploadedDate: Date;
  validTill: Date;
}

export interface CourseHistory {
  id: string;
  courseCode: string;
  courseName: string;
  semester: number;
  year: number;
  grade: string;
  credits: number;
  instructor: string;
  status: 'completed' | 'dropped';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}