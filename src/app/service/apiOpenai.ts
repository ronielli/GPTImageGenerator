import axios from "axios";

const apiOpenai = axios.create({
  baseURL: "https://api.openai.com/v1/",
  timeout: 30000,
});

apiOpenai.interceptors.request.use(
  async (config) => {
    config.headers["Accept"] = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiOpenai;
