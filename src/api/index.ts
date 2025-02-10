import axios from 'axios';

const baseUrl = 'http://localhost:8000/';

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Timeout set to 10 seconds (10000 milliseconds)
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      //   failureNotify("Network error, please check your connection.");
    }

    if (error.code === 'ECONNABORTED') {
      //   failureNotify("An Error Occured Please try again later");
    }

    if (error.response && error.response.status === 403) {
      window.location.href = '/';
      sessionStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
