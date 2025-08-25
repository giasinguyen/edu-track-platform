import { useEffect, useState } from 'react';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { courseApi, handleApiError } from '../services/api';
import { trackPageView } from '../utils/tracking';
import type { Course } from '../types/api';
import Loading from '../components/Loading';
import LeadForm from '../components/LeadForm';

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    // Track page view
    trackPageView('/courses');
    
    // Load courses
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await courseApi.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrollClick = (course: Course) => {
    setSelectedCourse(course);
    // Scroll to form
    document.getElementById('enrollment-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Đang tải khóa học..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Khóa học của chúng tôi
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Khám phá các khóa học chất lượng cao được thiết kế bởi chuyên gia. 
              Học với phương pháp hiệu quả và nhận chứng chỉ uy tín.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Chưa có khóa học nào
              </h3>
              <p className="text-gray-500">
                Các khóa học mới sẽ được cập nhật sớm
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden">
                  {/* Course Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white opacity-80" />
                  </div>
                  
                  <div className="p-6">
                    {/* Course Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {course.name}
                      </span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">5.0</span>
                      </div>
                    </div>
                    
                    {/* Course Title */}
                    <h3 className="text-xl font-semibold mb-3">{course.name}</h3>
                    
                    {/* Course Description */}
                    <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                    
                    {/* Course Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>12 tuần</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>25+ học viên</span>
                      </div>
                    </div>
                    
                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {course.price.toLocaleString('vi-VN')}đ
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="line-through">{(course.price * 1.5).toLocaleString('vi-VN')}đ</span>
                          <span className="text-green-600 ml-2">-33%</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEnrollClick(course)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                      >
                        Đăng ký ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Course Details Modal/Section */}
      {selectedCourse && (
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Bạn quan tâm đến khóa "{selectedCourse.name}"?
              </h2>
              <p className="text-lg text-gray-600">
                Điền thông tin bên dưới để nhận tư vấn chi tiết và ưu đãi đặc biệt
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Course Info */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-2xl font-semibold mb-4">{selectedCourse.name}</h3>
                <p className="text-gray-600 mb-6">{selectedCourse.description}</p>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Thời gian:</span>
                    <span>12 tuần (3 tháng)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Hình thức:</span>
                    <span>Online trực tuyến</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Chứng chỉ:</span>
                    <span>Có (sau khi hoàn thành)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Giá khóa học:</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedCourse.price.toLocaleString('vi-VN')}đ
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="line-through">{(selectedCourse.price * 1.5).toLocaleString('vi-VN')}đ</span>
                        <span className="text-green-600 ml-2">Giảm 33%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollment Form */}
              <div id="enrollment-form" className="bg-white rounded-xl shadow-sm p-8">
                <LeadForm 
                  interestedCourse={selectedCourse.name}
                  source="courses-page"
                  onSuccess={() => {
                    setSelectedCourse(null);
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* General CTA Section */}
      {!selectedCourse && (
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Chưa tìm được khóa học phù hợp?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Liên hệ với chúng tôi để được tư vấn lộ trình học tập cá nhân hóa
            </p>
            <button
              onClick={() => {
                document.getElementById('general-contact-form')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Tư vấn miễn phí
            </button>
          </div>
        </section>
      )}

      {/* General Contact Form */}
      {!selectedCourse && (
        <section id="general-contact-form" className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <LeadForm 
                source="courses-page-general"
                onSuccess={() => {
                  console.log('General inquiry submitted');
                }}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CoursesPage;
