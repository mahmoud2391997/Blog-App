"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBlog } from "react-icons/fa6";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    router.push("/");
  };

  const links = [
    { label: "Blogs", href: "/blogs" },
    {
      label: isLoggedIn ? "Logout" : "Login",
      href: isLoggedIn ? "/logout" : "/login",
    },
    { label: "Signup", href: "/signup" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center ">
      <Link href="/">
        <FaBlog />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
              onClick={link.label === "Logout" ? handleLogout : null} // Attach handleLogout function to logout link
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
