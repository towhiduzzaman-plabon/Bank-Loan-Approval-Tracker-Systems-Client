// client/src/hooks/useAxiosPublic.js
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_apiBaseUrl || "http://localhost:3000",
  withCredentials: true, // JWT cookie পাঠাবে (jwt route ইত্যাদিতে)
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
