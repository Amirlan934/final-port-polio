import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { PortfolioHome } from './pages/PortfolioHome';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { AllProjectsPage } from './pages/AllProjectsPage';

// Admin wrapper component to handle routing
function AdminRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_logged_in');
    navigate('/');
  };

  return !isLoggedIn ? (
    <AdminLogin onLogin={handleLogin} />
  ) : (
    <AdminDashboard onLogout={handleLogout} />
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/case-study/:id" element={<CaseStudyDetail />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/all-projects" element={<AllProjectsPage />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl text-white mb-4">404</h1>
                  <p className="text-xl text-gray-400 mb-8">Page not found</p>
                  <a
                    href="/"
                    className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  >
                    Back to Homepage
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}