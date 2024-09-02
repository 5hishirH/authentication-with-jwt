import { useAppDispatch, useAppSelector } from "@/store";
import { usePrivateAxios } from "./usePrivateAxios";
import { useCallback } from "react";
import { resetAuth, updateLoading } from "@/features/auth/authSlice";

const useLogout = () => {
  const privateAxios = usePrivateAxios();

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const dispatch = useAppDispatch();

  return async () => {
    dispatch(updateLoading("pending"));
    await privateAxios.post("/user/logout");
    dispatch(resetAuth());
  };
};

export default useLogout;
