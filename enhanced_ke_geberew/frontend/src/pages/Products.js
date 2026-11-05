import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import '../styles/Products.css';

const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/get_all.php`);
      setProducts(response.data || []);
      setFilteredProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    let filtered = products;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        (product.name && product.name.toLowerCase().includes(term)) ||
        (product.category && product.category.toLowerCase().includes(term)) ||
        (product.location && product.location.toLowerCase().includes(term))
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, categoryFilter, products]);

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const translateCategory = (cat) => {
    return t(`products.categories.${cat}`, cat);
  };

  return (
    <div className="products-page">
      <Navbar onOpenAuth={() => setShowAuth(true)} />
      
      <div className="products-container">
        <h1>🌾 {t('products.title')}</h1>

        <div className="filters">
          <input
            type="text"
            placeholder={t('products.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="category-select"
          >
            <option value="">{t('products.allCategories')}</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{translateCategory(category)}</option>
            ))}
          </select>
        </div>

        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <p className="no-products">{t('products.noProducts')}</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.product_id} className="product-card">
                <div className="product-image">
                  <span className="product-icon">🌾</span>
                </div>
                <h3>{product.name}</h3>
                <p className="category">{translateCategory(product.category)}</p>
                <p className="price">{Number(product.price).toLocaleString()} {t('common.etb')}</p>
                <p className="quantity">{t('products.available')}: {product.quantity} {t('common.kg')}</p>
                <p className="location">📍 {t('products.location')}: {product.location}</p>
                <p className="farmer">👨‍🌾 {t('products.farmer')}: {product.farmer_name || t('common.na')}</p>
                <button 
                  className="btn-primary"
                  onClick={() => setShowAuth(true)}
                >
                  {t('products.orderNow')}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default Products;
