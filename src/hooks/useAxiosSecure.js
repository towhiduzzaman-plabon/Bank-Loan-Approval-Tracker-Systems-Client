// client/src/hooks/useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_apiBaseUrl || "http://localhost:3000",
  withCredentials: true, // secure/private route এর জন্য cookie পাঠাবে
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
