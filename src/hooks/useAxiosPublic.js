import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_apiBaseUrl || "https://loanlink-server.vercel.app",
  withCredentials: true, 
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
