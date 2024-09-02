import { privateAxios, testAxios } from "@/lib/axios";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/store";
import {
  updateAccessToken,
  updateLoading,
  updateUserData,
} from "@/features/auth/authSlice";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        dispatch(updateLoading("pending"));
        const access_token = await privateAxios
          .post("/user/refresh-token")
          .then(({ data }) => data.accessToken);

        // testAxios.interceptors.request.use((config) => {
        //   config.headers.Authorization = `Bearer ${access_token}`;
        //   return config;
        // });

        testAxios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        const user_data = await privateAxios
          .get("/user/current-user", {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then(({ data }) => data);

        dispatch(updateAccessToken(access_token));
        dispatch(updateUserData(user_data));
        dispatch(updateLoading("succeeded"));
        console.log("Access token refreshed");
      } catch (error) {
        console.error("Initial token refresh failed", error);
        dispatch(updateLoading("failed"));
        dispatch(updateAccessToken(""));
      }
    };

    fetchAccessToken();
  }, []);

  return children;
};

export default AuthProvider;
