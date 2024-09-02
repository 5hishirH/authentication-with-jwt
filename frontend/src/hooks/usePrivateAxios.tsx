import { server } from "@/contants";
import { useEffect, useLayoutEffect } from "react";
import { privateAxios } from "../lib/axios";
import { useAppDispatch, useAppSelector } from "../store";
import { updateAccessToken } from "../features/auth/authSlice";

export const usePrivateAxios = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const requestInterceptor = privateAxios.interceptors.request.use(
      (config) => {
        // Attach the access token to the request headers if it exists
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    );

    const responseInterceptor = privateAxios.interceptors.response.use(
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
          if (
            originalRequest.url === refreshUrl &&
            originalRequest.response.data.message === "Access token expired"
          ) {
            return Promise.reject(error);
          }

          // Handle refresh logic
          if (!originalRequest._retry) {
            originalRequest._retry = true; // Mark as retrying

            try {
              // Attempt to refresh the token
              const response = await privateAxios.post(refreshUrl);

              if (response.status === 200) {
                const newToken = response.data.accessToken;

                // Update the Authorization header for the original request
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                // Dispatch action to update access token in the store
                dispatch(updateAccessToken(newToken));
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

    // Cleanup interceptors on component unmount
    return () => {
      privateAxios.interceptors.request.eject(requestInterceptor);
      privateAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]); // Add dependencies to avoid stale references

  return privateAxios;
};
