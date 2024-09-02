import { useAppDispatch } from "@/store";
import { privateAxios } from "@/lib/axios";
import { useCallback } from "react";
import { logout, updateLoading } from "@/features/auth/authSlice";

const useLogout = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    (async () => {
      dispatch(updateLoading("pending"));
      await privateAxios.post("/user/logout");
      privateAxios.defaults.headers.common.Authorization = "";
      dispatch(logout());
    })();
  }, []);
};

export { useLogout };
