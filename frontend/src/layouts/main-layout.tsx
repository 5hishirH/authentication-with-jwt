import Topbar from "@/components/navigation/topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="min-h-screen">
      <Topbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
