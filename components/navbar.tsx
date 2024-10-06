"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link"; // Use Link from next/link

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      { name: "Features", href: "/features" },
      { name: "About", href: "/about" },
      { name: "Pricing", href: "/pricing" },
      { name: "FAQ", href: "/faq" },
    ],
    []
  );

  const loginLink = useMemo(() => ({ name: "Login", href: "/login" }), []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <nav className="w-full z-[100] relative md:static">
      {" "}
      {/* Ensure navbar is above other components */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 lg:py-2">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href={"/"}>
              <h1 className="text-2xl font-bold text-white">LOGO</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-16">
            <ul className="flex space-x-16">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-white text-medium font-medium hover:text-[#2ecc71] transition  ease-in-out"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={loginLink.href}>
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1.5px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00FF7F_0%,#008080_50%,#40E0D0_100%)]" />
                <span className="inline-flex px-4 py-2 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 text-medium font-medium text-white backdrop-blur-3xl">
                  {loginLink.name}
                </span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Open Menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-black shadow-lg z-[200] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none float-right"
            aria-label="Close Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="mt-16 flex flex-col items-center justify-center">
            <ul className="space-y-6 text-center">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={toggleMenu}
                    className="text-white text-lg font-medium hover:text-[#2ecc71] transition duration-300 ease-in-out block px-4 py-2 rounded"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Link href={loginLink.href}>
                <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1.5px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00FF7F_0%,#008080_50%,#40E0D0_100%)]" />
                  <span className="inline-flex px-4 py-2 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 text-medium font-medium text-white backdrop-blur-3xl">
                    {loginLink.name}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
