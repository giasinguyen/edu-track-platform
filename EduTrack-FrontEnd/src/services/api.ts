import axios from 'axios';
import type { 
  Course, 
  Lead, 
  Order, 
  TrafficEvent, 
  DashboardStats, 
  LeadFormData, 
  ApiResponse,
  PaginatedResponse 
} from '../types/api';

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add common headers
api.interceptors.request.use((config) => {
  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Course API
export const courseApi = {
  getAll: () => api.get<Course[]>('/courses'),
  getById: (id: number) => api.get<Course>(`/courses/${id}`),
  create: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => 
    api.post<Course>('/courses', course),
  update: (id: number, course: Partial<Course>) => 
    api.put<Course>(`/courses/${id}`, course),
  delete: (id: number) => api.delete(`/courses/${id}`),
};

// Lead API
export const leadApi = {
  getAll: (page = 0, size = 10) => 
    api.get<PaginatedResponse<Lead>>(`/leads?page=${page}&size=${size}`),
  getById: (id: number) => api.get<Lead>(`/leads/${id}`),
  create: (lead: LeadFormData) => api.post<Lead>('/leads', lead),
  update: (id: number, lead: Partial<Lead>) => 
    api.put<Lead>(`/leads/${id}`, lead),
  delete: (id: number) => api.delete(`/leads/${id}`),
  getByStatus: (status: string, page = 0, size = 10) =>
    api.get<PaginatedResponse<Lead>>(`/leads/status/${status}?page=${page}&size=${size}`),
};

// Order API
export const orderApi = {
  getAll: (page = 0, size = 10) => 
    api.get<PaginatedResponse<Order>>(`/orders?page=${page}&size=${size}`),
  getById: (id: number) => api.get<Order>(`/orders/${id}`),
  create: (order: { leadId: number; courseId: number; totalAmount: number }) => 
    api.post<Order>('/orders', order),
  updateStatus: (id: number, status: string) => 
    api.patch<Order>(`/orders/${id}/status`, { status }),
  delete: (id: number) => api.delete(`/orders/${id}`),
};

// Traffic Tracking API
export const trackingApi = {
  track: (event: Omit<TrafficEvent, 'id' | 'createdAt'>) => 
    api.post<TrafficEvent>('/tracking/event', event),
  getEvents: (page = 0, size = 10) => 
    api.get<PaginatedResponse<TrafficEvent>>(`/tracking/events?page=${page}&size=${size}`),
};

// Admin Dashboard API
export const adminApi = {
  getDashboard: () => api.get<DashboardStats>('/admin/dashboard'),
  getLeads: (page = 0, size = 10) => 
    api.get<PaginatedResponse<Lead>>(`/admin/leads?page=${page}&size=${size}`),
  getOrders: (page = 0, size = 10) => 
    api.get<PaginatedResponse<Order>>(`/admin/orders?page=${page}&size=${size}`),
};

// Helper function for error handling
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.status === 404) {
    return 'Resource not found';
  }
  if (error.response?.status >= 500) {
    return 'Server error. Please try again later.';
  }
  return error.message || 'An unexpected error occurred';
};

export default api;
