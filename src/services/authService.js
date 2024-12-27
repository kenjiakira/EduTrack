import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

class AuthService {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  }

  logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  setAuthHeader() {
    const token = this.getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  async register(userData) {
    const response = await axios.post(`${API_URL}/register`, userData);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  }

  async verifyToken() {
    try {
      const response = await axios.get(`${API_URL}/verify`);
      return response.data;
    } catch (error) {
      this.logout();
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
