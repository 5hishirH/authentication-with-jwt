import axios from "axios";
import { server } from "@/contants";

export default axios.create({
  baseURL: server,
});

// const privateAxios = axios.create({
//   baseURL: server,
//   withCredentials: true,
// });

const privateAxios = axios.create({
  baseURL: server,
  withCredentials: true,
});

privateAxios.interceptors.response.use(
  // Handle successful responses
  (response) => response,
  // Handle responses outside of the 2xx range
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      // Handle network errors
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized errors
    if (error.response.status === 401) {
      const refreshUrl = `${server}/user/refresh-token`;

      // Prevent retry if the failed request is for the refresh token itself
      if (originalRequest.url === refreshUrl) {
        return Promise.reject(error);
      }

      // Handle refresh logic
      if (
        !originalRequest._retry &&
        error.response.data.message === "Access token expired"
      ) {
        originalRequest._retry = true; // Mark as retrying

        try {
          // Attempt to refresh the token
          const response = await privateAxios.post(refreshUrl);

          if (response.status === 200) {
            const newToken = response.data.accessToken;

            // Update the Authorization header for the original request
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            privateAxios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            // Retry the original request with the new token
            return privateAxios(originalRequest);
          }
        } catch (refreshError) {
          // Handle errors during the refresh token process
          return Promise.reject(refreshError);
        }
      }
    }

    // Reject the error if it's not handled above
    return Promise.reject(error);
  }
);

export { privateAxios };
