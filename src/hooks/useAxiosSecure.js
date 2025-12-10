import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_apiBaseUrl || "http://localhost:3000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
