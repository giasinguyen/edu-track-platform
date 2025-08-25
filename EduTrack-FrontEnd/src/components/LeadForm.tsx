import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { leadApi, handleApiError } from '../services/api';
import type { LeadFormData } from '../types/api';
import Loading from './Loading';

interface LeadFormProps {
  interestedCourse?: string;
  source?: string;
  onSuccess?: () => void;
  className?: string;
}

const LeadForm = ({ 
  interestedCourse = '', 
  source = 'website', 
  onSuccess,
  className = '' 
}: LeadFormProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    interestedCourse,
    source,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await leadApi.create(formData);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          interestedCourse,
          source,
        });
        setIsSuccess(false);
        onSuccess?.();
      }, 2000);
      
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
        <div className="flex items-center space-x-3 text-green-800">
          <CheckCircle className="h-8 w-8" />
          <div>
            <h3 className="font-semibold">Đăng ký thành công!</h3>
            <p className="text-sm">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Đăng ký tư vấn miễn phí
      </h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Họ và tên *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nhập họ và tên của bạn"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Số điện thoại
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="+84 123 456 789"
        />
      </div>

      <div>
        <label htmlFor="interestedCourse" className="block text-sm font-medium text-gray-700 mb-1">
          Khóa học quan tâm
        </label>
        <select
          id="interestedCourse"
          name="interestedCourse"
          value={formData.interestedCourse}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Chọn khóa học</option>
          <option value="English">Tiếng Anh giao tiếp</option>
          <option value="Math">Toán học cơ bản</option>
          <option value="IT">Lập trình IT</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <Loading size="sm" />
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Gửi thông tin</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Bằng cách gửi thông tin, bạn đồng ý với{' '}
        <a href="#" className="text-blue-600 hover:underline">điều khoản sử dụng</a>{' '}
        của chúng tôi.
      </p>
    </form>
  );
};

export default LeadForm;
