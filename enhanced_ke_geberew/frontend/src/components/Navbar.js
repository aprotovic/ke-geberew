import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSelector from './LanguageSelector';
import '../styles/Navbar.css';

const Navbar = ({ onOpenAuth }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'farmer': return '/farmer/dashboard';
      case 'buyer':  return '/buyer/dashboard';
      case 'admin':  return '/admin/dashboard';
      case 'driver': return '/driver/dashboard';
      default:       return '/';
    }
  };

  const isDark = theme === 'dark';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🌾</span>
          <span>ከ ገበሬው</span>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/"        className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
          <Link to="/about"   className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</Link>
          <Link to="/products"className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.products')}</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>

          {user && (
            <Link to={getDashboardLink()} className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t('nav.dashboard')}
            </Link>
          )}

          <div className="navbar-actions">
            {/* ── Dark / Light Toggle ── */}
            <button
              className={`theme-toggle-switch ${isDark ? 'dark' : 'light'}`}
              onClick={toggleTheme}
              title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
              aria-label="Toggle dark mode"
            >
              <span className="toggle-track">
                <span className="toggle-thumb">
                  <span className="toggle-icon">{isDark ? '🌙' : '☀️'}</span>
                </span>
              </span>
              <span className="toggle-label">{isDark ? 'Dark' : 'Light'}</span>
            </button>

            <LanguageSelector />

            {user ? (
              <div className="user-menu">
                <span className="user-name">👤 {user.name}</span>
                <button onClick={handleLogout} className="btn-logout">
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth && onOpenAuth(); setMobileMenuOpen(false); }}
                className="btn-login"
              >
                {t('nav.login')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
