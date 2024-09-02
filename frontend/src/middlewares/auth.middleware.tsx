import { useAppSelector } from "@/store";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const AuthMiddleware = ({ children }: { children: ReactNode }) => {
  const { loading, accessToken, userData } = useAppSelector(
    (state) => state.auth
  );

  if (loading === "pending") return <div>Loading...</div>;
  if (loading === "succeeded" && accessToken && userData) return children;
  if (loading === "failed")
    return <Navigate to="/sign-in" />;
};

export default AuthMiddleware;
