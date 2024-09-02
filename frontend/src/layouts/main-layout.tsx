import Topbar from "@/components/navigation/topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="min-h-screen">
      <Topbar />

      <div className="2xl:px-60">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
