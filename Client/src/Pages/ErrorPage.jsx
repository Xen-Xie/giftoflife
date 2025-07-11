/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function ErrorPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-100 to-BG dark:from-black dark:via-gray-900 dark:to-gray-800 transition-colors duration-300 text-center px-4 font-Lexend">
      {/* Glitching 404 Title */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[9rem] md:text-[11rem] font-extrabold relative glitch text-black dark:text-BG z-10"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mt-2 font-medium"
      >
        {t("error.message", "You took a wrong turn, homie.")}
      </motion.p>

      {/* Return Button */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 text-white font-semibold bg-primary hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 rounded-full transition duration-300 shadow-lg"
        >
          <i className="fa-solid fa-arrow-left mr-2" />
          {t("error.back", "Back to Safety")}
        </Link>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-6 text-4xl"
      >
        💀
      </motion.div>
    </div>
  );
}

export default ErrorPage;
