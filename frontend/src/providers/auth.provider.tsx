import { privateAxios } from "@/lib/axios";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/store";
import { updateLoading, updateUserData } from "@/features/auth/authSlice";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(updateLoading("pending"));
        const access_token = await privateAxios
          .post("/user/refresh-token")
          .then(({ data }) => data.accessToken);

        privateAxios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        const user_data = await privateAxios
          .get("/user/current-user")
          .then(({ data }) => data);

        dispatch(updateUserData(user_data));
        dispatch(updateLoading("loggedIn"));
        console.log("Initial token fetched");
      } catch (error) {
        console.error("Initial token refresh failed", error);
        dispatch(updateLoading("failed"));
      }
    })();
  }, []);

  return children;
};

export default AuthProvider;
