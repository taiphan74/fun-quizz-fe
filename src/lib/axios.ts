import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { StandardResponse } from "./api-types";

type AxiosRequestConfigWithRetry = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type FailedQueueItem = {
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
  config: AxiosRequestConfigWithRetry;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry | undefined;

    if (error.response?.status === 401 && originalRequest) {
      if (originalRequest._retry) {
        console.error("API error after retry:", error);
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const baseURL = api.defaults.baseURL ?? "";

          const { data } = await axios.post<
            StandardResponse<{ accessToken: string }>
          >(
            `${baseURL}/auth/refresh`,
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (typeof window !== "undefined") {
            console.log("Refresh response data:", data);

            const payload = data.data as { accessToken?: unknown } | null;

            const accessToken =
              payload && typeof payload.accessToken === "string"
                ? payload.accessToken
                : undefined;

            if (accessToken) {
              console.log("Refreshed access token:", accessToken);
              localStorage.setItem("accessToken", accessToken);
            }
          }

          isRefreshing = false;

          const queue = [...failedQueue];
          failedQueue = [];

          queue.forEach((item) => {
            api(item.config)
              .then(item.resolve)
              .catch(item.reject);
          });

          api(originalRequest)
            .then(resolve)
            .catch(reject);
        } catch (refreshError) {
          isRefreshing = false;

          const queue = [...failedQueue];
          failedQueue = [];
          queue.forEach((item) => item.reject(refreshError));

          console.error("Token refresh failed:", refreshError);
          reject(refreshError);
        }
      });
    }

    console.error("API error:", error);
    return Promise.reject(error);
  }
);
