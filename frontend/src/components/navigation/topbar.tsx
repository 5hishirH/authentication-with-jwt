import { NavLink } from "react-router-dom";

const Topbar = () => {
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Sign Up",
      link: "/sign-up",
    },
  ];

  return (
    <nav className="border-b-2 h-16 flex items-center 2xl:px-60">
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
    </nav>
  );
};

export default Topbar;
