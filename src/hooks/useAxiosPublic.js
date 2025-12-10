import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_apiBaseUrl || "http://localhost:3000",
  withCredentials: true, 
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
