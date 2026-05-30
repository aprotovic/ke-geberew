import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';

const DriverDashboard = () => {
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
    alert(`Delivery #${deliveryId} status updated to ${newStatus}`);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <h1>Driver Dashboard</h1>

        <div className="dashboard-section">
          <h2>My Deliveries</h2>
          <div className="deliveries-list">
            {deliveries.length === 0 ? (
              <p>No deliveries assigned yet.</p>
            ) : (
              deliveries.map((delivery) => (
                <div key={delivery.delivery_id} className="delivery-card">
                  <div className="delivery-header">
                    <h3>Delivery #{delivery.delivery_id}</h3>
                    <span className={`status ${delivery.current_status}`}>
                      {delivery.current_status}
                    </span>
                  </div>
                  
                  <div className="delivery-info">
                    <div className="location-info">
                      <p><strong>📍 Pickup:</strong> {delivery.pickup_location}</p>
                      <p><strong>📍 Delivery:</strong> {delivery.delivery_location}</p>
                    </div>
                    
                    {delivery.pickup_time && (
                      <p><strong>Pickup Time:</strong> {new Date(delivery.pickup_time).toLocaleString()}</p>
                    )}
                  </div>

                  <div className="delivery-actions">
                    {delivery.current_status === 'pending' && (
                      <button 
                        className="btn-primary"
                        onClick={() => updateDeliveryStatus(delivery.delivery_id, 'in_transit')}
                      >
                        Start Delivery
                      </button>
                    )}
                    
                    {delivery.current_status === 'in_transit' && (
                      <>
                        <button 
                          className="btn-success"
                          onClick={() => updateDeliveryStatus(delivery.delivery_id, 'delivered')}
                        >
                          Mark as Delivered
                        </button>
                        <button 
                          className="btn-danger"
                          onClick={() => updateDeliveryStatus(delivery.delivery_id, 'failed')}
                        >
                          Mark as Failed
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
          <h2>Delivery History</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>Completed</h3>
                <p className="stat-number">45</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🚚</div>
              <div className="stat-info">
                <h3>In Transit</h3>
                <p className="stat-number">2</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❌</div>
              <div className="stat-info">
                <h3>Failed</h3>
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
