import { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { trackPageView } from '../utils/tracking';
import LeadForm from '../components/LeadForm';

const ContactPage = () => {
  useEffect(() => {
    // Track page view
    trackPageView('/contact');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn trong hành trình học tập. 
              Hãy liên hệ để được tư vấn miễn phí!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Thông tin liên hệ
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Địa chỉ</h3>
                    <p className="text-gray-600">
                      123 Phố Học Tập, Quận Hai Bà Trưng<br />
                      Thành phố Hà Nội, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Điện thoại</h3>
                    <p className="text-gray-600">
                      Hotline: <a href="tel:+84123456789" className="text-blue-600 hover:underline">+84 123 456 789</a><br />
                      Zalo/WhatsApp: <a href="tel:+84987654321" className="text-blue-600 hover:underline">+84 987 654 321</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-600">
                      Hỗ trợ: <a href="mailto:support@edutrack.vn" className="text-blue-600 hover:underline">support@edutrack.vn</a><br />
                      Tư vấn: <a href="mailto:info@edutrack.vn" className="text-blue-600 hover:underline">info@edutrack.vn</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Giờ làm việc</h3>
                    <p className="text-gray-600">
                      Thứ 2 - Thứ 6: 8:00 - 18:00<br />
                      Thứ 7 - Chủ nhật: 9:00 - 17:00<br />
                      <span className="text-green-600 font-medium">Hỗ trợ online 24/7</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Kết nối với chúng tôi</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                    aria-label="Facebook"
                  >
                    Facebook
                  </a>
                  <a 
                    href="#" 
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors"
                    aria-label="YouTube"
                  >
                    YouTube
                  </a>
                  <a 
                    href="#" 
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <LeadForm 
                source="contact-page"
                onSuccess={() => {
                  console.log('Contact form submitted successfully');
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-lg text-gray-600">
              Một số câu hỏi mà học viên thường quan tâm
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">
                Tôi có thể học trực tuyến từ bất kỳ đâu không?
              </h3>
              <p className="text-gray-600">
                Có! Tất cả khóa học của chúng tôi đều được thiết kế để học trực tuyến. 
                Bạn chỉ cần có kết nối internet và thiết bị (máy tính, điện thoại, tablet) 
                để tham gia học tập.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">
                Có hỗ trợ sau khi mua khóa học không?
              </h3>
              <p className="text-gray-600">
                Chúng tôi cung cấp hỗ trợ 24/7 qua nhiều kênh: chat trực tuyến, email, 
                điện thoại. Đội ngũ giảng viên và hỗ trợ kỹ thuật luôn sẵn sàng giúp đỡ bạn.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">
                Tôi có nhận được chứng chỉ sau khi hoàn thành khóa học?
              </h3>
              <p className="text-gray-600">
                Có! Sau khi hoàn thành khóa học và vượt qua bài kiểm tra cuối khóa, 
                bạn sẽ nhận được chứng chỉ điện tử có thể xác minh và in ra.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-3">
                Chính sách hoàn tiền như thế nào?
              </h3>
              <p className="text-gray-600">
                Chúng tôi có chính sách hoàn tiền 100% trong vòng 7 ngày đầu nếu bạn không hài lòng 
                với khóa học. Sau 7 ngày, chúng tôi sẽ xem xét từng trường hợp cụ thể.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tìm chúng tôi trên bản đồ
            </h2>
            <p className="text-lg text-gray-600">
              Ghé thăm văn phòng của chúng tôi tại trung tâm Hà Nội
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Bản đồ Google Maps sẽ được tích hợp tại đây
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  123 Phố Học Tập, Quận Hai Bà Trưng, Hà Nội
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
