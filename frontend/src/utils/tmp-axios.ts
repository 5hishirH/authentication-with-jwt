import { server } from "@/contants";

export const usePrivateAxios = () => {
    const { token } = yourAppMemory();
  
    useEffect(() => {
      const requestInterceptor = privateAxios.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          // Do something before request is sent
          if (token) config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        (error) => {
          // Do something with request error
          return Promise.reject(error);
        },
      );
      const responseInterceptor = privateAxios.interceptors.response.use(
        // Within the range of 2xx
        function success(response) {
          return response;
        },
        // Outside the range of 2xx
        async function failure(error) {
          if (!error.response) {
            // Network issues
            return Promise.reject(error);
          } else {
            //** Bad Request 400 */
            if (error?.response?.status === 400) {
              return Promise.reject(error);
            }
  
            //** Unauthenticated 401 */
            if (error?.response?.status === 401) {
              const originalReq = error?.config;
              const refTokenURL = `${server}/refresh`;
  
              if (
                error?.response?.status === 401 &&
                originalReq.url === refTokenURL
              ) {
                return Promise.reject(error);
              }
              if (!originalReq._retry) {
                originalReq._retry = true;
                try {
                  const res = await privateAxios.post(refTokenURL);
                  if (res?.status === 200) {
                    const token = res.data.response?.access_token;
                    // 1) Set the new token
                    setInMemoryAgain({ token });
                    // 2) Change Authorization header
                    privateAxios.defaults.headers.common.Authorization = token;
                    return privateAxios(originalReq);
                  }
                  return Promise.reject(error);
                } catch (err) {
                  return Promise.reject(error);
                }
              }
              return Promise.reject(error);
            }
            //** Unauthorized 403 */
            if (error?.response?.status === 403) {
              return Promise.reject(error);
            }
            //** Not Found 404 */
            if (error?.response?.status === 404) {
              return Promise.reject(error);
            }
            //** Server Error 500 */
            if (error?.response?.status === 500) {
              return Promise.reject(error);
            }
          }
          return Promise.reject(error);
        },
      );
      return () => {
        privateAxios.interceptors.request.eject(requestInterceptor);
        privateAxios.interceptors.response.eject(responseInterceptor);
      };
    }, [token]);
  
    return privateAxios;
  };