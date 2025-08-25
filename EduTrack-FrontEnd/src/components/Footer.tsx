import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">EduTrack</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Nền tảng học trực tuyến hàng đầu Việt Nam, cung cấp các khóa học chất lượng cao 
              với giáo viên dày dạn kinh nghiệm và phương pháp học tập hiện đại.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                YouTube
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Giới thiệu</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Khóa học</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Giảng viên</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Tin tức</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">123 Phố Học Tập, Hà Nội</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">info@edutrack.vn</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">
            © 2025 EduTrack. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
              Chính sách bảo mật
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
