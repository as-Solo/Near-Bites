import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL;

const service = axios.create({
    baseURL: `${API_URL}/api`
})

service.interceptors.request.use((config) => {
    const storedToken = localStorage.getItem("authToken")

    if(storedToken){
        config.headers.authorization = `Bearer ${storedToken}`
    }

    return config
})

export default service