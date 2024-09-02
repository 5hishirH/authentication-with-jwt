import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/useLogout";
import { useAppSelector } from "@/store";

const Topbar = () => {
  const user = useAppSelector((state) => state.auth.userData);
  const logout = useLogout();

  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Private",
      link: "/private",
    },
    // {
    //   name: "Canary",
    //   link: "/canary",
    // },
  ];

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

      {user ? (
        <div className="flex items-center gap-4">
          <p>{user?.fullName}</p>
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <NavLink to="/sign-in">
            <Button type="button" variant="outline">
              Sign In
            </Button>
          </NavLink>

          <NavLink to="/sign-up">
            <Button type="button">Sign Up</Button>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
