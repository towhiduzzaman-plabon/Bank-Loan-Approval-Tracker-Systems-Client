import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_apiBaseUrl || "https://loanlink-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
