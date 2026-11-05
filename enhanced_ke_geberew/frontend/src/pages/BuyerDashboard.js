import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const BuyerDashboard = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/get_all.php`);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOrder = async (productId) => {
    try {
      await axios.post(`${API_BASE_URL}/orders/create.php`, {
        product_id: productId,
        quantity: Number(quantity),
        transport_cost: 50.00
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert(t('dashboard.orderSuccess'));
      setSelectedProduct(null);
      setQuantity(1);
      fetchOrders();
      fetchProducts();
    } catch (error) {
      alert(t('dashboard.orderError') + ': ' + (error.response?.data?.message || ''));
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
        <h1>🛒 {t('dashboard.buyerDashboard')}</h1>

        <div className="dashboard-section">
          <h2>🌾 {t('dashboard.availableProducts')}</h2>
          <div className="products-grid">
            {products.length === 0 ? (
              <p>{t('products.noProducts')}</p>
            ) : (
              products.map((product) => (
                <div key={product.product_id} className="product-card">
                  <h3>{product.name}</h3>
                  <p className="category">{translateCategory(product.category)}</p>
                  <p className="price">{Number(product.price).toLocaleString()} {t('common.etb')}</p>
                  <p className="quantity">{t('products.available')}: {product.quantity} {t('common.kg')}</p>
                  <p className="location">📍 {product.location}</p>
                  <p className="farmer">👨‍🌾 {t('products.farmer')}: {product.farmer_name || t('common.na')}</p>
                  
                  {selectedProduct === product.product_id ? (
                    <div className="order-form">
                      <input
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <button 
                        className="btn-primary" 
                        onClick={() => handleOrder(product.product_id)}
                      >
                        {t('dashboard.confirmOrder')}
                      </button>
                      <button 
                        className="btn-secondary" 
                        onClick={() => setSelectedProduct(null)}
                      >
                        {t('common.cancel')}
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="btn-primary" 
                      onClick={() => setSelectedProduct(product.product_id)}
                      disabled={product.quantity === 0}
                    >
                      {t('products.orderNow')}
                    </button>
                  )}
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
                  <p>👨‍🌾 {t('products.farmer')}: {order.farmer_name || t('common.na')}</p>
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

export default BuyerDashboard;
