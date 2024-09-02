import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";
import { usePrivateAxios } from "@/hooks/usePrivateAxios";
import { testAxios } from "@/lib/axios";

const Topbar = () => {
  // const logout = useLogout();
  const privateAxios = usePrivateAxios();

  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Sign Up",
      link: "/sign-up",
    },
    {
      name: "Sign In",
      link: "/sign-in",
    },
    {
      name: "Private",
      link: "/private",
    },
    {
      name: "Canary",
      link: "/canary",
    },
  ];

  const handleLogout = async () => {
    await testAxios.post("/user/logout");
  }

  return (
    <nav className="border-b-2 h-16 flex items-center justify-between 2xl:px-60">
      <div className="flex gap-4">
        {navLinks.map(({ name, link }, i) => (
          <NavLink
            key={i}
            to={link}
            className={({ isActive, isPending }) =>
              isActive ? "font-bold" : isPending ? "" : ""
            }
          >
            {name}
          </NavLink>
        ))}
      </div>

      <div>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Topbar;
