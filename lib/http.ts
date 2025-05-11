import { getCookie } from "@/helper/getCookie";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // Send cookies (refresh token)
});



export default http;
