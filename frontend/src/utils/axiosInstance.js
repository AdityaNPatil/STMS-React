/* Pre-configures axios with base URL and attaches JWT token to every request if available. */
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://demoBackendApi/api",
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    (err) => Promise.reject(err)
)

export default axiosInstance