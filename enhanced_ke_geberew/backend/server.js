// Node.js zero-dependency backend server for Ke Geberew Enhanced
// Realistic Ethiopian agricultural marketplace data

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'database.json');
const BUILD_DIR = path.join(__dirname, '..', 'frontend', 'build');

function isoDate(daysAgo = 0, hoursAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(d.getHours() - hoursAgo);
  return d.toISOString();
}

// ─── REALISTIC SEED DATA ─────────────────────────────────────────────────────
const initialData = {
  admins: [
    { admin_id: 1, name: 'Admin User', email: 'admin@kegeberew.com', password: 'password', created_at: isoDate(180) }
  ],

  users: [
    // Farmers
    { user_id: 1,  name: 'Abebe Kebede',       email: 'farmer@kegeberew.com',    password: 'password', location: 'Addis Ababa',  role: 'farmer', created_at: isoDate(120) },
    { user_id: 2,  name: 'Girma Tadesse',       email: 'girma@kegeberew.com',     password: 'password', location: 'Jimma',        role: 'farmer', created_at: isoDate(115) },
    { user_id: 3,  name: 'Tigist Haile',        email: 'tigist@kegeberew.com',    password: 'password', location: 'Yirgacheffe',  role: 'farmer', created_at: isoDate(110) },
    { user_id: 4,  name: 'Solomon Bekele',      email: 'solomon@kegeberew.com',   password: 'password', location: 'Gondar',       role: 'farmer', created_at: isoDate(105) },
    { user_id: 5,  name: 'Mekdes Alemu',        email: 'mekdes@kegeberew.com',    password: 'password', location: 'Bahir Dar',    role: 'farmer', created_at: isoDate(100) },
    { user_id: 6,  name: 'Dawit Mesfin',        email: 'dawit.f@kegeberew.com',   password: 'password', location: 'Hawassa',      role: 'farmer', created_at: isoDate(95)  },
    { user_id: 7,  name: 'Bethlehem Tesfaye',   email: 'bethi@kegeberew.com',     password: 'password', location: 'Dire Dawa',    role: 'farmer', created_at: isoDate(90)  },
    { user_id: 8,  name: 'Yonas Getachew',      email: 'yonas@kegeberew.com',     password: 'password', location: 'Mekelle',      role: 'farmer', created_at: isoDate(85)  },
    { user_id: 9,  name: 'Hiwot Girma',         email: 'hiwot@kegeberew.com',     password: 'password', location: 'Adama',        role: 'farmer', created_at: isoDate(80)  },
    { user_id: 10, name: 'Amare Worku',         email: 'amare@kegeberew.com',     password: 'password', location: 'Debre Berhan', role: 'farmer', created_at: isoDate(75)  },
    { user_id: 11, name: 'Selamawit Habtamu',   email: 'selam.f@kegeberew.com',   password: 'password', location: 'Debre Markos', role: 'farmer', created_at: isoDate(70)  },
    { user_id: 12, name: 'Tsegaye Birru',       email: 'tsegaye@kegeberew.com',   password: 'password', location: 'Jimma',        role: 'farmer', created_at: isoDate(65)  },
    { user_id: 13, name: 'Almaz Kassahun',      email: 'almaz.f@kegeberew.com',   password: 'password', location: 'Wolkite',      role: 'farmer', created_at: isoDate(60)  },
    // Buyers
    { user_id: 14, name: 'Almaz Tadesse',       email: 'buyer@kegeberew.com',     password: 'password', location: 'Bahir Dar',    role: 'buyer',  created_at: isoDate(118) },
    { user_id: 15, name: 'Kebede Mulugeta',     email: 'kebede@kegeberew.com',    password: 'password', location: 'Addis Ababa',  role: 'buyer',  created_at: isoDate(112) },
    { user_id: 16, name: 'Sara Hailu',          email: 'sara@kegeberew.com',      password: 'password', location: 'Hawassa',      role: 'buyer',  created_at: isoDate(108) },
    { user_id: 17, name: 'Biruk Alemu',         email: 'biruk@kegeberew.com',     password: 'password', location: 'Adama',        role: 'buyer',  created_at: isoDate(103) },
    { user_id: 18, name: 'Liya Tesfaye',        email: 'liya@kegeberew.com',      password: 'password', location: 'Dire Dawa',    role: 'buyer',  created_at: isoDate(98)  },
    { user_id: 19, name: 'Natnael Bekele',      email: 'natnael@kegeberew.com',   password: 'password', location: 'Gondar',       role: 'buyer',  created_at: isoDate(93)  },
    { user_id: 20, name: 'Hana Girma',          email: 'hana@kegeberew.com',      password: 'password', location: 'Mekelle',      role: 'buyer',  created_at: isoDate(88)  },
    { user_id: 21, name: 'Ermias Haile',        email: 'ermias@kegeberew.com',    password: 'password', location: 'Jimma',        role: 'buyer',  created_at: isoDate(83)  },
    { user_id: 22, name: 'Feven Tesfaye',       email: 'feven@kegeberew.com',     password: 'password', location: 'Debre Birhan', role: 'buyer',  created_at: isoDate(78)  },
    { user_id: 23, name: 'Zerihun Worku',       email: 'zerihun@kegeberew.com',   password: 'password', location: 'Bahir Dar',    role: 'buyer',  created_at: isoDate(73)  },
    { user_id: 24, name: 'Mahlet Alemu',        email: 'mahlet@kegeberew.com',    password: 'password', location: 'Addis Ababa',  role: 'buyer',  created_at: isoDate(68)  },
    { user_id: 25, name: 'Biniam Habtamu',      email: 'biniam@kegeberew.com',    password: 'password', location: 'Hawassa',      role: 'buyer',  created_at: isoDate(63)  },
    { user_id: 26, name: 'Rediet Kassahun',     email: 'rediet@kegeberew.com',    password: 'password', location: 'Adama',        role: 'buyer',  created_at: isoDate(58)  },
    { user_id: 27, name: 'Kalkidan Negash',     email: 'kalkidan@kegeberew.com',  password: 'password', location: 'Debre Markos', role: 'buyer',  created_at: isoDate(53)  },
    { user_id: 28, name: 'Yohannes Tadesse',    email: 'yohannes@kegeberew.com',  password: 'password', location: 'Gondar',       role: 'buyer',  created_at: isoDate(48)  },
    { user_id: 29, name: 'Meron Girma',         email: 'meron@kegeberew.com',     password: 'password', location: 'Jimma',        role: 'buyer',  created_at: isoDate(43)  },
    { user_id: 30, name: 'Abel Mesfin',         email: 'abel@kegeberew.com',      password: 'password', location: 'Dire Dawa',    role: 'buyer',  created_at: isoDate(38)  }
  ],

  drivers: [
    { driver_id: 1, name: 'Dawit Mengistu',   email: 'driver@kegeberew.com',      password: 'password', national_id: 'ETH-100001', license_number: 'DL-100001', status: 'available',   vehicle_id: 1, created_at: isoDate(150) },
    { driver_id: 2, name: 'Tesfaye Alemu',    email: 'tesfaye.d@kegeberew.com',   password: 'password', national_id: 'ETH-100002', license_number: 'DL-100002', status: 'on_delivery', vehicle_id: 2, created_at: isoDate(140) },
    { driver_id: 3, name: 'Mulugeta Haile',   email: 'mulugeta@kegeberew.com',    password: 'password', national_id: 'ETH-100003', license_number: 'DL-100003', status: 'available',   vehicle_id: 3, created_at: isoDate(130) },
    { driver_id: 4, name: 'Gemechu Worku',    email: 'gemechu@kegeberew.com',     password: 'password', national_id: 'ETH-100004', license_number: 'DL-100004', status: 'on_delivery', vehicle_id: 4, created_at: isoDate(120) },
    { driver_id: 5, name: 'Senait Bekele',    email: 'senait.d@kegeberew.com',    password: 'password', national_id: 'ETH-100005', license_number: 'DL-100005', status: 'available',   vehicle_id: 5, created_at: isoDate(110) }
  ],

  products: [
    // Farmer 1 (Abebe - Addis Ababa)
    { product_id: 1,  farmer_id: 1,  name: 'Teff (White / Magna)',               category: 'Grains',    quantity: 350, price: 8500.00,  location: 'Addis Ababa',  status: 'active', created_at: isoDate(90) },
    { product_id: 2,  farmer_id: 1,  name: 'Teff (Mixed)',                        category: 'Grains',    quantity: 200, price: 7200.00,  location: 'Addis Ababa',  status: 'active', created_at: isoDate(85) },
    { product_id: 3,  farmer_id: 1,  name: 'Corn (Maize)',                        category: 'Grains',    quantity: 600, price: 3800.00,  location: 'Addis Ababa',  status: 'active', created_at: isoDate(80) },
    // Farmer 2 (Girma - Jimma)
    { product_id: 4,  farmer_id: 2,  name: 'Jimma Coffee (Grade 2)',              category: 'Coffee',    quantity: 180, price: 9800.00,  location: 'Jimma',        status: 'active', created_at: isoDate(88) },
    { product_id: 5,  farmer_id: 2,  name: 'Jimma Coffee (Grade 3)',              category: 'Coffee',    quantity: 240, price: 7500.00,  location: 'Jimma',        status: 'active', created_at: isoDate(83) },
    { product_id: 6,  farmer_id: 2,  name: 'Sesame Seeds (Black)',                category: 'Oilseeds',  quantity: 420, price: 6200.00,  location: 'Jimma',        status: 'active', created_at: isoDate(78) },
    // Farmer 3 (Tigist - Yirgacheffe)
    { product_id: 7,  farmer_id: 3,  name: 'Yirgacheffe Coffee Beans (Grade 1)', category: 'Coffee',    quantity: 95,  price: 15000.00, location: 'Yirgacheffe',  status: 'active', created_at: isoDate(86) },
    { product_id: 8,  farmer_id: 3,  name: 'Yirgacheffe Washed Green Coffee',    category: 'Coffee',    quantity: 120, price: 12500.00, location: 'Yirgacheffe',  status: 'active', created_at: isoDate(81) },
    { product_id: 9,  farmer_id: 3,  name: 'Sidama Coffee (Natural)',             category: 'Coffee',    quantity: 75,  price: 11800.00, location: 'Sidama',       status: 'active', created_at: isoDate(76) },
    // Farmer 4 (Solomon - Gondar)
    { product_id: 10, farmer_id: 4,  name: 'Sorghum (White)',                     category: 'Grains',    quantity: 800, price: 2900.00,  location: 'Gondar',       status: 'active', created_at: isoDate(84) },
    { product_id: 11, farmer_id: 4,  name: 'Barley (Malt Quality)',               category: 'Grains',    quantity: 450, price: 4100.00,  location: 'Gondar',       status: 'active', created_at: isoDate(79) },
    { product_id: 12, farmer_id: 4,  name: 'Fenugreek Seeds',                    category: 'Spices',    quantity: 160, price: 5600.00,  location: 'Gondar',       status: 'active', created_at: isoDate(74) },
    // Farmer 5 (Mekdes - Bahir Dar)
    { product_id: 13, farmer_id: 5,  name: 'Organic Honey (Acacia)',              category: 'Honey',     quantity: 85,  price: 2200.00,  location: 'Bahir Dar',    status: 'active', created_at: isoDate(82) },
    { product_id: 14, farmer_id: 5,  name: 'Beeswax (Raw)',                       category: 'Honey',     quantity: 60,  price: 3800.00,  location: 'Bahir Dar',    status: 'active', created_at: isoDate(77) },
    { product_id: 15, farmer_id: 5,  name: 'Wheat (Bread Variety)',               category: 'Grains',    quantity: 700, price: 5300.00,  location: 'Bahir Dar',    status: 'active', created_at: isoDate(72) },
    // Farmer 6 (Dawit - Hawassa)
    { product_id: 16, farmer_id: 6,  name: 'Red Kidney Beans',                   category: 'Legumes',   quantity: 320, price: 4200.00,  location: 'Hawassa',      status: 'active', created_at: isoDate(80) },
    { product_id: 17, farmer_id: 6,  name: 'Chickpeas (Desi)',                    category: 'Legumes',   quantity: 280, price: 5100.00,  location: 'Hawassa',      status: 'active', created_at: isoDate(75) },
    { product_id: 18, farmer_id: 6,  name: 'Black-eyed Peas',                    category: 'Legumes',   quantity: 190, price: 3600.00,  location: 'Hawassa',      status: 'active', created_at: isoDate(70) },
    // Farmer 7 (Bethlehem - Dire Dawa)
    { product_id: 19, farmer_id: 7,  name: 'Sorghum (Red)',                       category: 'Grains',    quantity: 550, price: 2700.00,  location: 'Dire Dawa',    status: 'active', created_at: isoDate(78) },
    { product_id: 20, farmer_id: 7,  name: 'Sunflower Seeds',                    category: 'Oilseeds',  quantity: 230, price: 4800.00,  location: 'Dire Dawa',    status: 'active', created_at: isoDate(73) },
    // Farmer 8 (Yonas - Mekelle)
    { product_id: 21, farmer_id: 8,  name: 'Tigray Honey (White)',               category: 'Honey',     quantity: 70,  price: 1800.00,  location: 'Mekelle',      status: 'active', created_at: isoDate(76) },
    { product_id: 22, farmer_id: 8,  name: 'Sesame Seeds (White Humera)',        category: 'Oilseeds',  quantity: 380, price: 7800.00,  location: 'Humera',       status: 'active', created_at: isoDate(71) },
    { product_id: 23, farmer_id: 8,  name: 'Niger Seed (Noug)',                  category: 'Oilseeds',  quantity: 210, price: 5500.00,  location: 'Mekelle',      status: 'active', created_at: isoDate(66) },
    // Farmer 9 (Hiwot - Adama)
    { product_id: 24, farmer_id: 9,  name: 'Tomatoes (Fresh)',                   category: 'Vegetables', quantity: 500, price: 1200.00,  location: 'Adama',        status: 'active', created_at: isoDate(20) },
    { product_id: 25, farmer_id: 9,  name: 'Onions (Red)',                       category: 'Vegetables', quantity: 400, price: 950.00,   location: 'Adama',        status: 'active', created_at: isoDate(18) },
    { product_id: 26, farmer_id: 9,  name: 'Green Peppers',                      category: 'Vegetables', quantity: 180, price: 1500.00,  location: 'Adama',        status: 'active', created_at: isoDate(15) },
    // Farmer 10 (Amare - Debre Berhan)
    { product_id: 27, farmer_id: 10, name: 'Potato (Gudenne Variety)',           category: 'Vegetables', quantity: 650, price: 1800.00,  location: 'Debre Berhan', status: 'active', created_at: isoDate(30) },
    { product_id: 28, farmer_id: 10, name: 'Carrot (Local)',                     category: 'Vegetables', quantity: 280, price: 2100.00,  location: 'Debre Berhan', status: 'active', created_at: isoDate(25) },
    // Farmer 11 (Selamawit - Debre Markos)
    { product_id: 29, farmer_id: 11, name: 'Lentils (Red)',                      category: 'Legumes',   quantity: 340, price: 6800.00,  location: 'Debre Markos', status: 'active', created_at: isoDate(60) },
    { product_id: 30, farmer_id: 11, name: 'Flaxseed (Linseed)',                 category: 'Oilseeds',  quantity: 190, price: 4600.00,  location: 'Debre Markos', status: 'active', created_at: isoDate(55) },
    // Farmer 12 (Tsegaye - Jimma)
    { product_id: 31, farmer_id: 12, name: 'Avocado (Jimma Hass)',               category: 'Fruits',    quantity: 220, price: 3200.00,  location: 'Jimma',        status: 'active', created_at: isoDate(14) },
    { product_id: 32, farmer_id: 12, name: 'Mango (Kent Variety)',               category: 'Fruits',    quantity: 300, price: 2800.00,  location: 'Jimma',        status: 'active', created_at: isoDate(12) },
    // Farmer 13 (Almaz - Wolkite)
    { product_id: 33, farmer_id: 13, name: 'Berbere Spice Mix (Raw)',            category: 'Spices',    quantity: 130, price: 8800.00,  location: 'Wolkite',      status: 'active', created_at: isoDate(45) },
    { product_id: 34, farmer_id: 13, name: 'Korerima (Black Cardamom)',          category: 'Spices',    quantity: 80,  price: 12000.00, location: 'Wolkite',      status: 'active', created_at: isoDate(40) },
    { product_id: 35, farmer_id: 13, name: 'Turmeric (Fresh Roots)',             category: 'Spices',    quantity: 160, price: 3400.00,  location: 'Wolkite',      status: 'active', created_at: isoDate(35) }
  ],

  orders: (() => {
    const statuses = ['pending', 'confirmed', 'shipped', 'delivered', 'canceled'];
    const orders = [];
    let id = 1;
    // Build a realistic order history for 60 days
    const orderScenarios = [
      { product_id: 7,  merchant_id: 15, qty: 10, transport: 2500 },
      { product_id: 1,  merchant_id: 14, qty: 20, transport: 1500 },
      { product_id: 16, merchant_id: 16, qty: 15, transport: 1800 },
      { product_id: 22, merchant_id: 17, qty: 25, transport: 3200 },
      { product_id: 4,  merchant_id: 18, qty: 8,  transport: 2000 },
      { product_id: 13, merchant_id: 19, qty: 12, transport: 1200 },
      { product_id: 29, merchant_id: 20, qty: 18, transport: 2200 },
      { product_id: 10, merchant_id: 21, qty: 30, transport: 1600 },
      { product_id: 27, merchant_id: 22, qty: 50, transport: 1400 },
      { product_id: 8,  merchant_id: 23, qty: 6,  transport: 2800 },
      { product_id: 33, merchant_id: 24, qty: 5,  transport: 1800 },
      { product_id: 17, merchant_id: 25, qty: 20, transport: 1500 },
      { product_id: 21, merchant_id: 26, qty: 14, transport: 900  },
      { product_id: 31, merchant_id: 27, qty: 30, transport: 2100 },
      { product_id: 5,  merchant_id: 28, qty: 12, transport: 2400 },
      { product_id: 24, merchant_id: 29, qty: 100, transport: 800 },
      { product_id: 11, merchant_id: 30, qty: 25, transport: 2000 },
      { product_id: 34, merchant_id: 15, qty: 4,  transport: 1600 },
      { product_id: 3,  merchant_id: 16, qty: 40, transport: 1200 },
      { product_id: 6,  merchant_id: 17, qty: 15, transport: 2200 },
      { product_id: 15, merchant_id: 18, qty: 22, transport: 1800 },
      { product_id: 23, merchant_id: 19, qty: 18, transport: 2400 },
      { product_id: 32, merchant_id: 20, qty: 35, transport: 1500 },
      { product_id: 2,  merchant_id: 21, qty: 16, transport: 1300 },
      { product_id: 19, merchant_id: 22, qty: 28, transport: 1700 },
      { product_id: 9,  merchant_id: 23, qty: 7,  transport: 2600 },
      { product_id: 28, merchant_id: 24, qty: 45, transport: 1100 },
      { product_id: 14, merchant_id: 25, qty: 10, transport: 1900 },
      { product_id: 20, merchant_id: 26, qty: 20, transport: 2100 },
      { product_id: 30, merchant_id: 27, qty: 15, transport: 2300 },
      { product_id: 25, merchant_id: 28, qty: 60, transport: 900  },
      { product_id: 12, merchant_id: 29, qty: 10, transport: 2800 },
      { product_id: 35, merchant_id: 30, qty: 8,  transport: 1600 },
      { product_id: 26, merchant_id: 15, qty: 25, transport: 1300 },
      { product_id: 18, merchant_id: 16, qty: 30, transport: 1500 },
      { product_id: 1,  merchant_id: 17, qty: 12, transport: 2000 },
      { product_id: 7,  merchant_id: 18, qty: 5,  transport: 2500 },
      { product_id: 16, merchant_id: 19, qty: 20, transport: 1800 },
      { product_id: 22, merchant_id: 20, qty: 10, transport: 3200 },
      { product_id: 4,  merchant_id: 21, qty: 15, transport: 2000 }
    ];

    // Products lookup (prices defined above)
    const productPrices = {
      1:15000,2:7200,3:3800,4:9800,5:7500,6:6200,7:15000,8:12500,9:11800,
      10:2900,11:4100,12:5600,13:2200,14:3800,15:5300,16:4200,17:5100,18:3600,
      19:2700,20:4800,21:1800,22:7800,23:5500,24:1200,25:950,26:1500,27:1800,
      28:2100,29:6800,30:4600,31:3200,32:2800,33:8800,34:12000,35:3400
    };

    orderScenarios.forEach((s, idx) => {
      const price = productPrices[s.product_id] || 5000;
      const daysAgo = Math.floor(idx * 1.5) + 1;
      const isOld = daysAgo > 10;
      const statusIdx = isOld
        ? (idx % 5 === 0 ? 4 : (idx % 3 === 0 ? 3 : (idx % 2 === 0 ? 2 : 3)))
        : (idx % 3 === 0 ? 0 : (idx % 2 === 0 ? 1 : 0));
      orders.push({
        order_id: id++,
        product_id: s.product_id,
        merchant_id: s.merchant_id,
        quantity: s.qty,
        total_price: price * s.qty,
        transport_cost: s.transport,
        status: statuses[statusIdx],
        order_date: isoDate(daysAgo)
      });
    });
    return orders;
  })(),

  deliveries: (() => {
    const deliveryStatuses = ['pending', 'in_transit', 'delivered', 'failed'];
    const deliveries = [];
    // Create deliveries for all delivered/shipped orders
    for (let i = 1; i <= 40; i++) {
      const isDelivered = i <= 28;
      const isInTransit = i > 28 && i <= 34;
      const isFailed = i > 36 && i <= 38;
      let status = 'pending';
      if (isDelivered) status = 'delivered';
      else if (isInTransit) status = 'in_transit';
      else if (isFailed) status = 'failed';

      deliveries.push({
        delivery_id: i,
        order_id: i,
        driver_id: (i % 5) + 1,
        pickup_location: ['Addis Ababa', 'Jimma', 'Yirgacheffe', 'Gondar', 'Bahir Dar', 'Hawassa', 'Adama', 'Mekelle'][i % 8],
        delivery_location: ['Bahir Dar', 'Addis Ababa', 'Dire Dawa', 'Gondar', 'Hawassa', 'Adama', 'Mekelle', 'Jimma'][i % 8],
        current_status: status,
        created_at: isoDate(60 - i)
      });
    }
    return deliveries;
  })(),

  admin_activity: [
    { activity_id: 1,  admin_id: 1, admin_name: 'Admin User', action_type: 'login',         description: 'Admin logged in',                     action_date: isoDate(0,  1) },
    { activity_id: 2,  admin_id: 1, admin_name: 'Admin User', action_type: 'user_review',   description: 'Reviewed new user registrations',     action_date: isoDate(0,  3) },
    { activity_id: 3,  admin_id: 1, admin_name: 'Admin User', action_type: 'product_audit', description: 'Audited 5 new product listings',      action_date: isoDate(1,  2) },
    { activity_id: 4,  admin_id: 1, admin_name: 'Admin User', action_type: 'login',         description: 'Admin logged in',                     action_date: isoDate(1,  8) },
    { activity_id: 5,  admin_id: 1, admin_name: 'Admin User', action_type: 'order_review',  description: 'Reviewed 12 pending orders',          action_date: isoDate(2,  4) },
    { activity_id: 6,  admin_id: 1, admin_name: 'Admin User', action_type: 'login',         description: 'Admin logged in',                     action_date: isoDate(3,  0) },
    { activity_id: 7,  admin_id: 1, admin_name: 'Admin User', action_type: 'report',        description: 'Generated weekly sales report',       action_date: isoDate(4,  2) },
    { activity_id: 8,  admin_id: 1, admin_name: 'Admin User', action_type: 'user_suspend',  description: 'Investigated suspicious activity',    action_date: isoDate(5,  1) },
    { activity_id: 9,  admin_id: 1, admin_name: 'Admin User', action_type: 'login',         description: 'Admin logged in',                     action_date: isoDate(6,  0) },
    { activity_id: 10, admin_id: 1, admin_name: 'Admin User', action_type: 'product_audit', description: 'Approved 8 farmer product listings',  action_date: isoDate(7,  3) }
  ]
};

function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    saveDB(initialData);
    return JSON.parse(JSON.stringify(initialData));
  }
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    // If the saved database looks like old minimal data, reset it
    if (!data.users || data.users.length < 10) {
      console.log('Old minimal database detected – resetting with realistic data...');
      saveDB(initialData);
      return JSON.parse(JSON.stringify(initialData));
    }
    return data;
  } catch (e) {
    console.error('Failed to parse database.json, resetting:', e.message);
    saveDB(initialData);
    return JSON.parse(JSON.stringify(initialData));
  }
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

let db = loadDB();

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js':   'application/javascript; charset=UTF-8',
  '.css':  'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf'
};

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
}

function sendJson(res, statusCode, data) {
  setCors(res);
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.writeHead(statusCode);
  res.end(JSON.stringify(data));
}

function parseToken(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
  } catch (e) {
    return null;
  }
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch (e) { resolve({}); }
    });
  });
}

function serveStatic(req, res, pathname) {
  if (!fs.existsSync(BUILD_DIR)) return false;
  let filePath = path.join(BUILD_DIR, pathname);
  if (!filePath.startsWith(BUILD_DIR)) return false;
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  if (!fs.existsSync(filePath)) filePath = path.join(BUILD_DIR, 'index.html');
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    setCors(res);
    res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
    res.writeHead(200);
    fs.createReadStream(filePath).pipe(res);
    return true;
  }
  return false;
}

// ─── SERVER ───────────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:5000'}`);
  const pathname = parsedUrl.pathname.replace(/\\/g, '/');
  const isApi = pathname.includes('/api/') || pathname.endsWith('.php');

  if (!isApi) {
    const handled = serveStatic(req, res, pathname);
    if (!handled) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not Found'); }
    return;
  }

  const match = pathname.match(/\/?(?:.*?\/)?(api\/.*)$/);
  const np = match ? '/' + match[1] : pathname; // normalized path

  // ── 1. Stats ────────────────────────────────────────────────────────────────
  if (np.endsWith('/stats/get_stats.php') && req.method === 'GET') {
    return sendJson(res, 200, {
      totalUsers:       db.users.length,
      totalProducts:    db.products.filter(p => p.status === 'active').length,
      totalOrders:      db.orders.length,
      totalDeliveries:  db.deliveries.filter(d => d.current_status === 'delivered').length,
      pendingOrders:    db.orders.filter(o => o.status === 'pending').length
    });
  }

  // ── 2. Login ────────────────────────────────────────────────────────────────
  if (np.endsWith('/auth/login.php') && req.method === 'POST') {
    const { email, password } = await parseBody(req);
    if (!email || !password) return sendJson(res, 400, { message: 'Email and password are required' });

    const el = email.toLowerCase();
    let found = null, idField = '', detectedRole = '';

    // Auto-detect role by searching all user tables
    const admin = db.admins.find(a => a.email.toLowerCase() === el);
    if (admin) { found = admin; idField = 'admin_id'; detectedRole = 'admin'; }

    if (!found) {
      const driver = db.drivers.find(d => d.email.toLowerCase() === el);
      if (driver) { found = driver; idField = 'driver_id'; detectedRole = 'driver'; }
    }

    if (!found) {
      const user = db.users.find(u => u.email.toLowerCase() === el);
      if (user) { found = user; idField = 'user_id'; detectedRole = user.role; }
    }

    if (!found) return sendJson(res, 401, { message: 'No account found with this email' });
    if (found.password !== password) return sendJson(res, 401, { message: 'Incorrect password' });

    if (detectedRole === 'admin') {
      db.admin_activity.unshift({ activity_id: Date.now(), admin_id: found[idField], admin_name: found.name, action_type: 'login', description: 'Admin logged in', action_date: new Date().toISOString() });
      saveDB(db);
    }

    const token = Buffer.from(JSON.stringify({ user_id: found[idField], email: found.email, role: detectedRole, name: found.name })).toString('base64');
    return sendJson(res, 200, { message: 'Login successful', token, user: { id: found[idField], name: found.name, email: found.email, role: detectedRole } });
  }

  // ── 3. Register ─────────────────────────────────────────────────────────────
  if (np.endsWith('/auth/register.php') && req.method === 'POST') {
    const { name, email, password, role, location, national_id, license_number } = await parseBody(req);
    if (!name || !email || !password || !role) return sendJson(res, 400, { message: 'Incomplete data' });
    if (role === 'admin') return sendJson(res, 403, { message: 'Admins cannot be registered through this endpoint' });

    const el = email.toLowerCase();
    if (db.users.some(u => u.email.toLowerCase() === el) || db.drivers.some(d => d.email.toLowerCase() === el))
      return sendJson(res, 400, { message: 'Email already exists' });

    if (role === 'driver') {
      if (!national_id || !license_number) return sendJson(res, 400, { message: 'Missing required driver information' });
      db.drivers.push({ driver_id: db.drivers.length > 0 ? Math.max(...db.drivers.map(d => d.driver_id)) + 1 : 1, name, email, password, national_id, license_number, status: 'available', created_at: new Date().toISOString() });
    } else {
      db.users.push({ user_id: db.users.length > 0 ? Math.max(...db.users.map(u => u.user_id)) + 1 : 1, name, email, password, location: location || '', role, created_at: new Date().toISOString() });
    }
    saveDB(db);
    return sendJson(res, 201, { message: 'Registration successful' });
  }

  // ── 4. Products – Get All ───────────────────────────────────────────────────
  if (np.endsWith('/products/get_all.php') && req.method === 'GET') {
    const category    = parsedUrl.searchParams.get('category');
    const location    = parsedUrl.searchParams.get('location');
    const filterStatus = parsedUrl.searchParams.get('status') || 'active';
    let list = db.products.filter(p => p.status === filterStatus);
    if (category) list = list.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    if (location) list = list.filter(p => p.location && p.location.toLowerCase().includes(location.toLowerCase()));
    const enriched = list.map(p => {
      const farmer = db.users.find(u => u.user_id === p.farmer_id);
      return { ...p, farmer_name: farmer ? farmer.name : 'Unknown Farmer', farmer_location: farmer ? farmer.location : p.location };
    });
    return sendJson(res, 200, enriched);
  }

  // ── 5. Products – Create ────────────────────────────────────────────────────
  if (np.endsWith('/products/create.php') && req.method === 'POST') {
    const user = parseToken(req);
    if (!user || user.role !== 'farmer') return sendJson(res, 403, { message: 'Access denied' });
    const { name, category, quantity, price, location } = await parseBody(req);
    if (!name || price === undefined || quantity === undefined) return sendJson(res, 400, { message: 'Incomplete data' });
    const newId = db.products.length > 0 ? Math.max(...db.products.map(p => p.product_id)) + 1 : 1;
    db.products.push({ product_id: newId, farmer_id: user.user_id, name, category: category || 'General', quantity: Number(quantity), price: Number(price), location: location || '', status: 'active', created_at: new Date().toISOString() });
    saveDB(db);
    return sendJson(res, 201, { message: 'Product created successfully', product_id: newId });
  }

  // ── 6. Products – Update ────────────────────────────────────────────────────
  if (np.endsWith('/products/update.php') && req.method === 'POST') {
    const user = parseToken(req);
    if (!user || user.role !== 'farmer') return sendJson(res, 403, { message: 'Access denied' });
    const body = await parseBody(req);
    const prod = db.products.find(p => p.product_id === Number(body.product_id) && p.farmer_id === user.user_id);
    if (!prod) return sendJson(res, 403, { message: 'Access denied or product not found' });
    ['name','category','quantity','price','location','status'].forEach(k => { if (body[k] !== undefined) prod[k] = ['quantity','price'].includes(k) ? Number(body[k]) : body[k]; });
    saveDB(db);
    return sendJson(res, 200, { message: 'Product updated successfully' });
  }

  // ── 7. Products – Delete ────────────────────────────────────────────────────
  if (np.endsWith('/products/delete.php') && req.method === 'POST') {
    const user = parseToken(req);
    if (!user || user.role !== 'farmer') return sendJson(res, 403, { message: 'Access denied' });
    const { product_id } = await parseBody(req);
    const before = db.products.length;
    db.products = db.products.filter(p => !(p.product_id === Number(product_id) && p.farmer_id === user.user_id));
    if (db.products.length === before) return sendJson(res, 403, { message: 'Access denied or product not found' });
    saveDB(db);
    return sendJson(res, 200, { message: 'Product deleted successfully' });
  }

  // ── 8. Orders – Get User Orders ─────────────────────────────────────────────
  if (np.endsWith('/orders/get_user_orders.php') && req.method === 'GET') {
    const user = parseToken(req);
    if (!user) return sendJson(res, 401, { message: 'Unauthorized' });
    let orders = [];
    if (user.role === 'buyer') {
      orders = db.orders.filter(o => o.merchant_id === user.user_id).map(o => {
        const prod = db.products.find(p => p.product_id === o.product_id) || {};
        const farmer = db.users.find(u => u.user_id === prod.farmer_id) || {};
        return { ...o, product_name: prod.name || 'Unknown Product', category: prod.category || '', farmer_name: farmer.name || 'Unknown Farmer', farmer_location: farmer.location || '' };
      });
    } else if (user.role === 'farmer') {
      const farmPids = db.products.filter(p => p.farmer_id === user.user_id).map(p => p.product_id);
      orders = db.orders.filter(o => farmPids.includes(o.product_id)).map(o => {
        const prod = db.products.find(p => p.product_id === o.product_id) || {};
        const buyer = db.users.find(u => u.user_id === o.merchant_id) || {};
        return { ...o, product_name: prod.name || 'Unknown Product', category: prod.category || '', buyer_name: buyer.name || 'Unknown Buyer', buyer_location: buyer.location || '' };
      });
    } else {
      return sendJson(res, 403, { message: 'Access denied' });
    }
    return sendJson(res, 200, orders);
  }

  // ── 9. Orders – Create ──────────────────────────────────────────────────────
  if (np.endsWith('/orders/create.php') && req.method === 'POST') {
    const user = parseToken(req);
    if (!user || user.role !== 'buyer') return sendJson(res, 403, { message: 'Access denied' });
    const { product_id, quantity, transport_cost } = await parseBody(req);
    const prod = db.products.find(p => p.product_id === Number(product_id) && p.status === 'active');
    if (!prod) return sendJson(res, 404, { message: 'Product not found or not available' });
    const qty = Number(quantity);
    if (prod.quantity < qty) return sendJson(res, 400, { message: 'Insufficient quantity available' });
    prod.quantity -= qty;
    const total_price = prod.price * qty;
    const tc = Number(transport_cost) || 0;
    const newOrderId = db.orders.length > 0 ? Math.max(...db.orders.map(o => o.order_id)) + 1 : 1;
    db.orders.push({ order_id: newOrderId, product_id: prod.product_id, merchant_id: user.user_id, quantity: qty, total_price, transport_cost: tc, status: 'pending', order_date: new Date().toISOString() });
    db.deliveries.push({ delivery_id: db.deliveries.length > 0 ? Math.max(...db.deliveries.map(d => d.delivery_id)) + 1 : 1, order_id: newOrderId, driver_id: null, pickup_location: prod.location, delivery_location: user.location || 'Buyer Location', current_status: 'pending', created_at: new Date().toISOString() });
    saveDB(db);
    return sendJson(res, 201, { message: 'Order created successfully', order_id: newOrderId, total_price, transport_cost: tc });
  }

  // ── 10. Orders – Update Status ──────────────────────────────────────────────
  if (np.endsWith('/orders/update_status.php') && req.method === 'POST') {
    const user = parseToken(req);
    if (!user || !['farmer','admin'].includes(user.role)) return sendJson(res, 403, { message: 'Access denied' });
    const { order_id, status } = await parseBody(req);
    const ord = db.orders.find(o => o.order_id === Number(order_id));
    if (!ord) return sendJson(res, 404, { message: 'Order not found' });
    ord.status = status;
    saveDB(db);
    return sendJson(res, 200, { message: 'Order status updated successfully' });
  }

  // ── 11. Admin – Get Users ───────────────────────────────────────────────────
  if (np.endsWith('/admin/get_users.php') && req.method === 'GET') {
    const user = parseToken(req);
    if (!user || user.role !== 'admin') return sendJson(res, 403, { message: 'Access denied' });
    return sendJson(res, 200, db.users.map(u => ({ user_id: u.user_id, name: u.name, email: u.email, location: u.location, role: u.role, created_at: u.created_at })));
  }

  // ── 12. Admin – Get Activities ──────────────────────────────────────────────
  if (np.endsWith('/admin/get_recent_activities.php') && req.method === 'GET') {
    const user = parseToken(req);
    if (!user || user.role !== 'admin') return sendJson(res, 403, { message: 'Access denied' });
    return sendJson(res, 200, db.admin_activity.slice(0, 20));
  }

  return sendJson(res, 404, { message: `Route not found: ${req.method} ${pathname}` });
});

server.listen(PORT, () => {
  const data = db;
  console.log(`=======================================================`);
  console.log(`🌾 Ke Geberew Platform is RUNNING!`);
  console.log(`🌐 App:  http://localhost:${PORT}`);
  console.log(`📊 Stats: Users=${data.users.length}  Products=${data.products.length}  Orders=${data.orders.length}  Deliveries=${data.deliveries.filter(d=>d.current_status==='delivered').length}`);
  console.log(`=======================================================`);
});
