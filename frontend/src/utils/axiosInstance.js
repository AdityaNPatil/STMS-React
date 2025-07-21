/* Pre-configures axios with base URL and attaches JWT token to every request if available. */
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
})

// allows to modify request before its sent 
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    (err) => Promise.reject(err)
)

export default axiosInstance

/*
Uses a base URL (https://demoBackendApi/api) -- for all get,put,post,delete requests made through this axiosInstance

Automatically adds a Bearer token from localStorage to all outgoing requests (if token exists)

Makes token-based authenticated HTTP requests easy and consistent throughout application
*/