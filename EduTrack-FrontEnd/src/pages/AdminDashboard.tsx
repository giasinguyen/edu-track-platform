import { useEffect, useState } from 'react';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { format, parseISO, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';

import { adminApi, leadApi, orderApi, handleApiError } from '../services/api';
import { trackPageView } from '../utils/tracking';
import type { DashboardStats, Lead, Order } from '../types/api';
import Loading from '../components/Loading';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  useEffect(() => {
    // Track page view
    trackPageView('/admin');
    
    // Load dashboard data
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsResponse, leadsResponse, ordersResponse] = await Promise.all([
        adminApi.getDashboard(),
        leadApi.getAll(0, 10),
        orderApi.getAll(0, 10),
      ]);

      setStats(statsResponse.data);
      setLeads(leadsResponse.data.content);
      setOrders(ordersResponse.data.content);
    } catch (error) {
      console.error('Error loading dashboard data:', handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare chart data
  const prepareChartData = () => {
    if (!stats?.dailyStats) return null;

    const labels = stats.dailyStats.map(stat => 
      format(parseISO(stat.date), 'dd/MM', { locale: vi })
    );

    const trafficData = stats.dailyStats.map(stat => stat.traffic);
    const leadsData = stats.dailyStats.map(stat => stat.leads);
    const ordersData = stats.dailyStats.map(stat => stat.orders);
    const revenueData = stats.dailyStats.map(stat => stat.revenue);

    return {
      labels,
      datasets: [
        {
          label: 'Lượt truy cập',
          data: trafficData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Leads',
          data: leadsData,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
        },
        {
          label: 'Đơn hàng',
          data: ordersData,
          borderColor: 'rgb(245, 158, 11)',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          tension: 0.4,
        },
      ],
    };
  };

  const prepareRevenueChartData = () => {
    if (!stats?.dailyStats) return null;

    const labels = stats.dailyStats.map(stat => 
      format(parseISO(stat.date), 'dd/MM', { locale: vi })
    );

    const revenueData = stats.dailyStats.map(stat => stat.revenue);

    return {
      labels,
      datasets: [
        {
          label: 'Doanh thu (VNĐ)',
          data: revenueData,
          backgroundColor: 'rgba(147, 51, 234, 0.8)',
          borderColor: 'rgb(147, 51, 234)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Thống kê theo ngày',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'NEW': 'Mới',
      'CONTACTED': 'Đã liên hệ',
      'QUALIFIED': 'Tiềm năng',
      'CONVERTED': 'Chuyển đổi',
      'LOST': 'Mất',
      'PENDING': 'Chờ xử lý',
      'COMPLETED': 'Hoàn thành',
      'CANCELLED': 'Hủy',
      'REFUNDED': 'Hoàn tiền',
    };
    return statusMap[status] || status;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Đang tải dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Quản trị</h1>
              <p className="text-gray-600 mt-1">
                Tổng quan về hoạt động platform EduTrack
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">7 ngày qua</option>
                <option value="30d">30 ngày qua</option>
                <option value="90d">90 ngày qua</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Leads</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.totalLeads || 0}
                </p>
                <p className="text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  +12% so với tuần trước
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Đơn hàng</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.totalOrders || 0}
                </p>
                <p className="text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  +8% so với tuần trước
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng Doanh thu</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.totalRevenue ? `${stats.totalRevenue.toLocaleString('vi-VN')}đ` : '0đ'}
                </p>
                <p className="text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  +15% so với tuần trước
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ chuyển đổi</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats?.conversionRate ? `${(stats.conversionRate * 100).toFixed(1)}%` : '0%'}
                </p>
                <p className="text-sm text-gray-600">
                  <Eye className="h-4 w-4 inline mr-1" />
                  {stats?.todayTraffic || 0} lượt truy cập hôm nay
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Thống kê tổng quan</h3>
            {prepareChartData() && (
              <Line data={prepareChartData()!} options={chartOptions} />
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Doanh thu theo ngày</h3>
            {prepareRevenueChartData() && (
              <Bar data={prepareRevenueChartData()!} options={chartOptions} />
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Leads gần đây</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{lead.fullName}</p>
                      <p className="text-sm text-gray-600">{lead.email}</p>
                      <p className="text-xs text-gray-500">
                        {format(parseISO(lead.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                      {getStatusText(lead.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Đơn hàng gần đây</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Đơn hàng #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.totalAmount.toLocaleString('vi-VN')}đ
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(parseISO(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
