import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const FarmerDashboard = () => {
  const { t } = useTranslation();
  const { token, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    location: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/get_all.php`);
      // Filter for this farmer if farmer_id matches
      const all = response.data || [];
      const mine = user ? all.filter(p => p.farmer_id === user.id) : all;
      setProducts(mine.length > 0 ? mine : all);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/get_user_orders.php`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/products/create.php`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setFormData({
        name: '',
        category: '',
        quantity: '',
        price: '',
        location: ''
      });
      setShowAddProduct(false);
      fetchProducts();
      alert(t('dashboard.productSuccess'));
    } catch (error) {
      alert(t('dashboard.productError') + ': ' + (error.response?.data?.message || ''));
    }
  };

  const translateStatus = (status) => {
    return t(`dashboard.statuses.${status}`, status);
  };

  const translateCategory = (cat) => {
    return t(`products.categories.${cat}`, cat);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <h1>🌾 {t('dashboard.farmerDashboard')}</h1>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>{t('dashboard.myProducts')}</h2>
            <button 
              className="btn-primary" 
              onClick={() => setShowAddProduct(!showAddProduct)}
            >
              {showAddProduct ? t('common.cancel') : `+ ${t('dashboard.addProduct')}`}
            </button>
          </div>

          {showAddProduct && (
            <div className="form-card">
              <h3>{t('dashboard.addNewProduct')}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder={t('dashboard.productName')}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder={t('dashboard.category')}
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
                <input
                  type="number"
                  placeholder={`${t('dashboard.quantity')} (${t('common.kg')})`}
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder={`${t('dashboard.price')} (${t('common.etb')})`}
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder={t('products.location')}
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
                <button type="submit" className="btn-primary">{t('dashboard.addProduct')}</button>
              </form>
            </div>
          )}

          <div className="products-grid">
            {products.length === 0 ? (
              <p>{t('products.noProducts')}</p>
            ) : (
              products.map((product) => (
                <div key={product.product_id} className="product-card">
                  <h3>{product.name}</h3>
                  <p className="category">{translateCategory(product.category)}</p>
                  <p className="price">{Number(product.price).toLocaleString()} {t('common.etb')}</p>
                  <p className="quantity">{t('dashboard.quantity')}: {product.quantity} {t('common.kg')}</p>
                  <p className="location">📍 {product.location}</p>
                  <span className={`status ${product.status}`}>{translateStatus(product.status)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>📦 {t('dashboard.myOrders')}</h2>
          <div className="orders-list">
            {orders.length === 0 ? (
              <p>{t('dashboard.noOrders')}</p>
            ) : (
              orders.map((order) => (
                <div key={order.order_id} className="order-card">
                  <div className="order-header">
                    <h3>{order.product_name}</h3>
                    <span className={`status ${order.status}`}>{translateStatus(order.status)}</span>
                  </div>
                  <p>👤 {t('dashboard.buyer')}: {order.buyer_name || t('common.na')}</p>
                  <p>⚖️ {t('dashboard.quantity')}: {order.quantity} {t('common.kg')}</p>
                  <p>💰 {t('dashboard.totalPrice')}: {Number(order.total_price).toLocaleString()} {t('common.etb')}</p>
                  <p className="order-date">
                    📅 {new Date(order.order_date).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
