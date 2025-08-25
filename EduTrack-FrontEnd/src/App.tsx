import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeTracking } from './utils/tracking';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

function App() {
  useEffect(() => {
    // Initialize analytics tracking
    initializeTracking();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
