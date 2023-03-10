import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// AUTH
export const register = (data) => api.post('/api/register', data);

export const logout = () => api.post('/api/logout');
export const login = (data) => api.post('/api/login', data);
export const refresh = () => api.get('/api/refresh');
export const forgotPassword = (data) =>
  api.post('/api/request-password-reset', data);
export const resetPassword = (data) => api.post('/api/reset-password', data);
export const verifyMagicToken = (data) =>
  api.post('/api/validate-magictoken', data);
export const verifyEmail = (data) => api.post('/api/verify-email', data);
export const requestEmailVerification = () => api.get('/api/verify-email');

export const checkDomain = (data) => api.post('/api/check-domain', data);
export const buildWebsite = (data) => api.post('/api/create-website', data);
export const getAllDomains = () => api.get('/api/get-all-domains');

// UPDATE
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, {
          withCredentials: true,
        });
        return api.request(originalRequest);
      } catch (err) {
        // console.log(err);
      }
    }
    throw error;
  }
);

export default api;
