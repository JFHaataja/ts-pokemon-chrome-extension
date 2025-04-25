// src/lib/http.ts
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const instance = axios.create();
const axiosInstance = setupCache(instance);

export default axiosInstance;
