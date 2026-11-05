import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const DriverDashboard = () => {
  const { t } = useTranslation();
  const [deliveries, setDeliveries] = useState([
    {
      delivery_id: 1,
      order_id: 101,
      pickup_location: 'Addis Ababa, Bole',
      delivery_location: 'Addis Ababa, Piazza',
      current_status: 'pending',
      pickup_time: null
    },
    {
      delivery_id: 2,
      order_id: 102,
      pickup_location: 'Bahir Dar',
      delivery_location: 'Gondar',
      current_status: 'in_transit',
      pickup_time: new Date()
    }
  ]);

  const updateDeliveryStatus = (deliveryId, newStatus) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.delivery_id === deliveryId 
        ? { ...delivery, current_status: newStatus }
        : delivery
    ));
    alert(`${t('dashboard.deliveryId')} #${deliveryId}: ${t(`dashboard.statuses.${newStatus}`, newStatus)}`);
  };

  const translateStatus = (status) => {
    return t(`dashboard.statuses.${status}`, status);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <h1>🚚 {t('dashboard.driverDashboard')}</h1>

        <div className="dashboard-section">
          <h2>📦 {t('dashboard.myDeliveries')}</h2>
          <div className="deliveries-list">
            {deliveries.length === 0 ? (
              <p>{t('dashboard.noDeliveries')}</p>
            ) : (
              deliveries.map((delivery) => (
                <div key={delivery.delivery_id} className="delivery-card">
                  <div className="delivery-header">
                    <h3>{t('dashboard.deliveryId')} #{delivery.delivery_id}</h3>
                    <span className={`status ${delivery.current_status}`}>
                      {translateStatus(delivery.current_status)}
                    </span>
                  </div>
                  
                  <div className="delivery-info">
                    <div className="location-info">
                      <p><strong>📍 {t('dashboard.pickup')}:</strong> {delivery.pickup_location}</p>
                      <p><strong>🏁 {t('dashboard.dropoff')}:</strong> {delivery.delivery_location}</p>
                    </div>
                    
                    {delivery.pickup_time && (
                      <p><strong>⏰ {t('dashboard.pickupTime')}:</strong> {new Date(delivery.pickup_time).toLocaleString()}</p>
                    )}
                  </div>

                  <div className="delivery-actions">
                    {delivery.current_status === 'pending' && (
                      <button 
                        className="btn-primary"
                        onClick={() => updateDeliveryStatus(delivery.delivery_id, 'in_transit')}
                      >
                        {t('dashboard.startDelivery')}
                      </button>
                    )}
                    
                    {delivery.current_status === 'in_transit' && (
                      <>
                        <button 
                          className="btn-success"
                          onClick={() => updateDeliveryStatus(delivery.delivery_id, 'delivered')}
                        >
                          {t('dashboard.markDelivered')}
                        </button>
                        <button 
                          className="btn-danger"
                          onClick={() => updateDeliveryStatus(delivery.delivery_id, 'failed')}
                        >
                          {t('dashboard.markFailed')}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>📊 {t('dashboard.deliveryHistory')}</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{t('dashboard.completed')}</h3>
                <p className="stat-number">45</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🚚</div>
              <div className="stat-info">
                <h3>{t('dashboard.inTransit')}</h3>
                <p className="stat-number">2</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❌</div>
              <div className="stat-info">
                <h3>{t('dashboard.failed')}</h3>
                <p className="stat-number">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
