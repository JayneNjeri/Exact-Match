import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Battery API endpoints
export const batteryAPI = {
  // Get all batteries with optional filtering
  getBatteries: (params = {}) => api.get('/batteries/', { params }),
  
  // Get single battery by ID
  getBattery: (id) => api.get(`/batteries/${id}/`),
  
  // Get featured batteries
  getFeaturedBatteries: () => api.get('/batteries/featured/'),
  
  // Get popular batteries
  getPopularBatteries: () => api.get('/batteries/popular/'),
  
  // Search batteries
  searchBatteries: (query) => api.get('/batteries/search/', { params: { q: query } }),
};

// Category API endpoints
export const categoryAPI = {
  getCategories: (params = {}) => api.get('/categories/', { params }),
  getCategory: (id) => api.get(`/categories/${id}/`),
  getCategoriesByType: (type) => api.get('/categories/', { params: { type } }),
};

// Brand API endpoints
export const brandAPI = {
  getBrands: () => api.get('/brands/'),
  getBrand: (id) => api.get(`/brands/${id}/`),
};

// Order API endpoints
export const orderAPI = {
  createOrder: (orderData) => api.post('/orders/', orderData),
  getOrder: (id) => api.get(`/orders/${id}/`),
  updateOrder: (id, orderData) => api.patch(`/orders/${id}/`, orderData),
};

// Review API endpoints
export const reviewAPI = {
  getBatteryReviews: (batteryId) => api.get(`/batteries/${batteryId}/reviews/`),
  createReview: (reviewData) => api.post('/reviews/', reviewData),
};

// Inquiry API endpoints
export const inquiryAPI = {
  createInquiry: (inquiryData) => api.post('/inquiries/', inquiryData),
};

export default api;
