// API Response Types
export interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  interestedCourse?: string;
  source: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'LOST';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  leadId: number;
  courseId: number;
  totalAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
  createdAt: string;
  updatedAt: string;
}

export interface TrafficEvent {
  id: number;
  sessionId: string;
  referrer: string;
  page: string;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  totalOrders: number;
  totalRevenue: number;
  conversionRate: number;
  todayTraffic: number;
  dailyStats: DailyStats[];
}

export interface DailyStats {
  date: string;
  traffic: number;
  leads: number;
  orders: number;
  revenue: number;
}

// Form Types
export interface LeadFormData {
  fullName: string;
  email: string;
  phone?: string;
  interestedCourse?: string;
  source: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
