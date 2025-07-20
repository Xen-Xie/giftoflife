/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../auth/useAuth";

function NavBar() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth(); // Use the useAuth hook

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.findDonor"), path: "/find-donor" },
    { name: t("nav.about"), path: "/about" },
  ];

  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Language toggle
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "en";
  });

  const toggleLang = () => {
    const newLang = lang === "en" ? "bn" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <div className="font-Urbanist">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-transparent shadow-lg mx-auto px-4 py-2 font-semibold dark:bg-melty dark:text-white md:px-12 xl:px-20 dark:shadow-lg backdrop-blur-md">
        {/* Logo+Log Out */}
        <div className="flex items-center gap-4">
          {user && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={logout}
              title="Logout"
              className="text-xl hidden sm:flex cursor-pointer"
            >
              <i className="fa-solid fa-right-from-bracket hover:text-melty dark:hover:text-primary text-[25px] transition-colors duration-300" />
            </motion.button>
          )}
          <img src="/giftoflifes.png" alt="Logo" className="w-20" />
        </div>

        {/* Desktop Links */}
        <div className="md:flex hidden">
          <ul className="flex items-center gap-6">
            {navItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="relative after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {user && (
              <Link
                to="/dashboard"
                className="relative after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("nav.dashboard")}
              </Link>
            )}
            <li>
              {user?.isAdmin && (
                <Link
                  to="/admindashboard"
                  className="relative after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                >
                  Admin Panel
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <></>
          ) : (
            <ul className="hidden md:flex items-center gap-4">
              <li>
                <Link
                  to="/login"
                  className="relative after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                >
                  {t("nav.login")}
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="relative after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                >
                  {t("nav.signup")}
                </Link>
              </li>
            </ul>
          )}

          {/* Theme & Lang Toggles */}
          <div className="flex items-center gap-2">
            {/* Theme Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-10 h-10 rounded-full overflow-hidden group cursor-pointer"
              title="Toggle Theme"
            >
              <span
                className={`absolute inset-0 transition-all duration-700 rounded-full group-hover:scale-110 ${
                  darkMode
                    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
                    : "bg-gradient-to-tr from-yellow-300 via-orange-400 to-yellow-500"
                }`}
              ></span>
              <i
                className={`absolute inset-0 flex items-center justify-center text-white text-base transition-transform duration-500 ease-in-out ${
                  darkMode ? "rotate-[360deg]" : "rotate-0"
                }`}
              >
                {darkMode ? (
                  <i className="fa-solid fa-moon" />
                ) : (
                  <i className="fa-solid fa-sun text-yellow-600" />
                )}
              </i>
            </motion.button>

            {/* Language Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleLang}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 dark:bg-BG/10 hover:bg-primary/20 hover:dark:bg-BG/20 transition-all duration-300 text-primary dark:text-BG relative group cursor-pointer"
              title="Change Language"
            >
              <i className="fa-solid fa-earth-asia text-base" />
              <AnimatePresence>
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs group-hover:opacity-100 opacity-80 transition text-primary/70"
                >
                  {lang.toUpperCase()}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="md:hidden text-xl"
          >
            <i className="fa-solid fa-bars" />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-2/4 h-screen bg-melty dark:bg-BG shadow-lg transform transition-transform duration-500 ease-in-out z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-end px-6 pt-4 pb-6 space-y-4 font-semibold text-BG dark:text-melty">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                onClick={() => setOpen(false)}
                className="relative after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            </li>
          ))}{" "}
          {user && (
            <li>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="relative after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
              >
                {t("nav.dashboard")}
              </Link>
            </li>
          )}
          <li>
            {user?.isAdmin && (
              <Link
                to="/admindashboard"
                className="relative after:block after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full"
              >
                Admin Panel
              </Link>
            )}
          </li>
          {user && (
            <li>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  logout();
                  setOpen(false); // close menu after logout
                }}
                title="Logout"
                className="text-xl"
              >
                <i className="fa-solid fa-right-from-bracket" />
              </motion.button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
