import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import Chatbot from '../components/Chatbot';
import '../styles/Home.css';

const Home = () => {
  const { t } = useTranslation();
  const [showAuth, setShowAuth] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalDeliveries: 0
  });
  const [displayedStats, setDisplayedStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalDeliveries: 0
  });
  const [animationStarted, setAnimationStarted] = useState(false);
  const statsSectionRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (stats.totalUsers > 0 && !animationStarted) {
      // Check if stats section is already visible
      const checkVisible = () => {
        const el = statsSectionRef.current;
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
      };

      if (checkVisible()) {
        startCounterAnimation(stats);
      } else {
        const handleScroll = () => {
          if (checkVisible()) {
            startCounterAnimation(stats);
            window.removeEventListener('scroll', handleScroll);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats/get_stats.php`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to realistic demo numbers if API unavailable
      setStats({
        totalUsers: 1247,
        totalProducts: 384,
        totalOrders: 2893,
        totalDeliveries: 2641
      });
    }
  };

  const startCounterAnimation = (targetStats) => {
    if (animationStarted) return;
    setAnimationStarted(true);

    const duration = 2200;
    const startTime = performance.now();
    const keys = ['totalUsers', 'totalProducts', 'totalOrders', 'totalDeliveries'];

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      const updated = {};
      keys.forEach(k => {
        updated[k] = Math.round((targetStats[k] || 0) * eased);
      });
      setDisplayedStats(updated);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayedStats({ ...targetStats });
      }
    };

    animationRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="home">
      <Navbar onOpenAuth={() => setShowAuth(true)} />
      
      <section className="hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1>{t('home.welcome')}</h1>
          <p className="hero-subtitle">{t('home.subtitle')}</p>
          <p className="hero-description">
            {t('home.description')}
          </p>
          <button className="btn-hero" onClick={() => setShowAuth(true)}>
            {t('home.getStarted')}
          </button>
        </div>
      </section>

      {/* Live Statistics Section */}
      <section className="stats-section" id="stats-section" ref={statsSectionRef}>
        <div className="container">
          <h2>{t('home.ourSuccess')}</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{displayedStats.totalUsers.toLocaleString()}</div>
              <div className="stat-label">{t('home.users')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🌾</div>
              <div className="stat-number">{displayedStats.totalProducts.toLocaleString()}</div>
              <div className="stat-label">{t('home.products')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📦</div>
              <div className="stat-number">{displayedStats.totalOrders.toLocaleString()}</div>
              <div className="stat-label">{t('home.orders')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🚚</div>
              <div className="stat-number">{displayedStats.totalDeliveries.toLocaleString()}</div>
              <div className="stat-label">{t('home.deliveries')}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>{t('home.platformTitle')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌾</div>
              <h3>{t('home.forFarmers')}</h3>
              <p>{t('home.forFarmersDesc')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>{t('home.forBuyers')}</h3>
              <p>{t('home.forBuyersDesc')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>{t('home.logistics')}</h3>
              <p>{t('home.logisticsDesc')}</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>{t('home.securePayment')}</h3>
              <p>{t('home.securePaymentDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>{t('home.joinToday')}</h2>
          <p>{t('home.startSelling')}</p>
          <button className="btn-cta" onClick={() => setShowAuth(true)}>
            {t('home.registerNow')}
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>{t('home.welcome').split(' ')[2] + ' ' + t('home.welcome').split(' ')[3]}</h3>
              <p>{t('footer.description')}</p>
            </div>
            <div className="footer-section">
              <h3>{t('footer.links')}</h3>
              <ul>
                <li><Link to="/about">{t('nav.about')}</Link></li>
                <li><Link to="/contact">{t('nav.contact')}</Link></li>
                <li><Link to="/products">{t('nav.products')}</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>{t('footer.help')}</h3>
              <ul>
                <li><a href="#faq">{t('footer.faq')}</a></li>
                <li><a href="#support">{t('footer.support')}</a></li>
                <li><a href="#terms">{t('footer.terms')}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Ke Geberew. {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      <Chatbot />
    </div>
  );
};

export default Home;
