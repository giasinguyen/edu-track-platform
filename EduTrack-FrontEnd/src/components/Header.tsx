import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, BarChart3 } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">EduTrack</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-2' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Trang chủ
            </Link>
            <Link 
              to="/courses" 
              className={`font-medium transition-colors ${
                isActive('/courses') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-2' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Khóa học
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-2' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Liên hệ
            </Link>
          </nav>

          {/* Admin Access */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/admin" 
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
