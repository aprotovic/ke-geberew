import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    national_id: '',
    license_number: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login.php' : '/auth/register.php';
      // For login: only send email + password — server detects role automatically
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { ...formData, role };

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);

      if (isLogin) {
        login(response.data.user, response.data.token);

        // Navigate based on role returned by server (not user-selected)
        const userRole = response.data.user?.role;
        switch(userRole) {
          case 'farmer':
            navigate('/farmer/dashboard');
            break;
          case 'buyer':
            navigate('/buyer/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'driver':
            navigate('/driver/dashboard');
            break;
          default:
            navigate('/');
        }

        onClose();
      } else {
        // After registration, switch to login
        setIsLogin(true);
        setError(t('auth.regSuccess'));
      }
    } catch (err) {
      setError(err.response?.data?.message || t('auth.errorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      location: '',
      national_id: '',
      license_number: ''
    });
    setError('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">&times;</button>
        
        <h2>{isLogin ? t('auth.login') : t('auth.register')}</h2>

        {/* Role selector only shown during REGISTRATION — login detects role from credentials */}
        {!isLogin && (
          <div className="role-selector">
            <label>{t('auth.registerAs')}</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="farmer">{t('auth.farmer')}</option>
              <option value="buyer">{t('auth.buyer')}</option>
              <option value="driver">{t('auth.driver')}</option>
            </select>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder={t('auth.name')}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t('auth.email')}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder={t('auth.password')}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (role === 'farmer' || role === 'buyer') && (
            <div className="form-group">
              <input
                type="text"
                name="location"
                placeholder={t('auth.location')}
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          )}

          {!isLogin && role === 'driver' && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="national_id"
                  placeholder={t('auth.nationalId')}
                  value={formData.national_id}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="license_number"
                  placeholder={t('auth.licenseNumber')}
                  value={formData.license_number}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? t('auth.pleaseWait') : (isLogin ? t('auth.login') : t('auth.register'))}
          </button>
        </form>

        <p className="toggle-mode">
          {isLogin ? t('auth.noAccount') : t('auth.haveAccount')}{' '}
          <span onClick={toggleMode} role="button" tabIndex={0}>
            {isLogin ? t('auth.register') : t('auth.login')}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
