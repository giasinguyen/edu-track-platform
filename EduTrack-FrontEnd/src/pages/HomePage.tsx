import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  Star, 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  Clock,
  Globe
} from 'lucide-react';
import { courseApi, adminApi, handleApiError } from '../services/api';
import { trackPageView } from '../utils/tracking';
import type { Course, DashboardStats } from '../types/api';
import LeadForm from '../components/LeadForm';
import Loading from '../components/Loading';

const HomePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track page view
    trackPageView('/');
    
    // Load data
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [coursesResponse, statsResponse] = await Promise.all([
        courseApi.getAll(),
        adminApi.getDashboard().catch(() => ({ data: null }))
      ]);

      setCourses(coursesResponse.data);
      if (statsResponse.data) {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Error loading data:', handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Học trực tuyến
                <br />
                <span className="text-yellow-300">hiệu quả nhất</span>
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Khám phá hàng nghìn khóa học chất lượng cao với giáo viên dày dạn kinh nghiệm. 
                Học mọi lúc, mọi nơi với phương pháp hiện đại.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Khám phá khóa học
                </Link>
                <button
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Tư vấn miễn phí
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">Thống kê thực tế</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      {stats?.totalLeads || 150}+
                    </div>
                    <div className="text-sm opacity-90">Học viên đăng ký</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      {courses.length || 3}
                    </div>
                    <div className="text-sm opacity-90">Khóa học</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      {stats?.conversionRate ? `${(stats.conversionRate * 100).toFixed(1)}%` : '12.5%'}
                    </div>
                    <div className="text-sm opacity-90">Tỷ lệ thành công</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">
                      {stats?.todayTraffic || 45}
                    </div>
                    <div className="text-sm opacity-90">Lượt truy cập hôm nay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn EduTrack?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cam kết mang đến trải nghiệm học tập tốt nhất với công nghệ hiện đại 
              và đội ngũ giảng viên chuyên nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Giáo viên chuyên nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ giảng viên có kinh nghiệm nhiều năm trong lĩnh vực giáo dục và thực tế.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Học mọi lúc, mọi nơi</h3>
              <p className="text-gray-600">
                Truy cập khóa học 24/7 trên mọi thiết bị. Học theo tốc độ của riêng bạn.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Chứng chỉ uy tín</h3>
              <p className="text-gray-600">
                Nhận chứng chỉ hoàn thành khóa học được công nhận bởi các tổ chức giáo dục.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khóa học nổi bật
            </h2>
            <p className="text-xl text-gray-600">
              Các khóa học được thiết kế bởi chuyên gia với nội dung cập nhật và thực tế
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {course.name}
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-blue-600">
                      {course.price.toLocaleString('vi-VN')}đ
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Xem tất cả khóa học
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Bắt đầu hành trình học tập của bạn
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Đăng ký ngay hôm nay để nhận tư vấn miễn phí từ đội ngũ chuyên gia của chúng tôi.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Tư vấn miễn phí về lộ trình học tập</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Hỗ trợ 24/7 trong quá trình học</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Đảm bảo chất lượng hoặc hoàn tiền</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <LeadForm 
                source="homepage"
                onSuccess={() => {
                  // Track conversion
                  console.log('Lead form submitted successfully');
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
