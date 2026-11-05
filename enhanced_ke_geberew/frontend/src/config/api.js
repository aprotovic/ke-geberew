// In production, use relative path (same server serves API + frontend)
// In development, use localhost:5000
const API_BASE_URL = process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

export default API_BASE_URL;
