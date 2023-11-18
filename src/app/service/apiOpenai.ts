import axios from "axios";

const apiOpenai = axios.create({
  baseURL: "https://api.openai.com/v1/",
  timeout: 30000,
});

apiOpenai.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer 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`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiOpenai;
