import axios from "axios"

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(async (config) => {
  return config
})

axiosInstance.interceptors.response.use(async (response) => {
  return response
})

export default axiosInstance
