import axios from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = axios.create({
    baseURL: config.public.apiUrl,
  });

  // 👉 request interceptor (optional)
  api.interceptors.request.use((config) => {
    // example: attach token
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
  });

  // 👉 response interceptor (optional)
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error);
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      api,
    },
  };
});
