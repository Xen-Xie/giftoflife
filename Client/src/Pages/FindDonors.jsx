/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { Link } from "react-router";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Button from "../Components/Button";
import SearchSection from "../Components/SearchBar";
import SearchResults from "../Components/SearchResults";

function FindDonor() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const donorsPerPage = 20;

  // Fetch all donors
  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get("https://giftoflife.onrender.com/api/users/search", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => setDonors(res.data))
        .catch((err) => console.error("Failed to load donors:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Logic for pagination
  const indexOfLastDonor = currentPage * donorsPerPage;
  const indexOfFirstDonor = indexOfLastDonor - donorsPerPage;
  const currentDonors = donors.slice(indexOfFirstDonor, indexOfLastDonor);
  const totalPages = Math.ceil(donors.length / donorsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 font-Lexend">
        <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
          {t("findDonor.loginTitle")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t("findDonor.loginSubtitle")}
        </p>
        <div className="flex gap-4">
          <Link to="/login">
            <Button className="px-5 py-2 bg-success">
              {t("nav.login", "Login")}
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="px-5 py-2 bg-primary">
              {t("nav.signup", "Sign Up")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 font-Lexend">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        {t("findDonor.title")}
      </h2>

      {/* Search Bar */}
      <SearchSection setResults={setDonors} setLoading={setLoading} />

      {/* Donor List */}
      <SearchResults results={currentDonors} loading={loading} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
          {/* Left Arrow */}
          <button
            onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-full border transition ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50 bg-gray-200 dark:bg-gray-700"
                : "hover:bg-primary hover:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
            }`}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 rounded-full border ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                } hover:bg-primary hover:text-white transition`}
              >
                {page}
              </button>
            );
          })}

          {/* Right Arrow */}
          <button
            onClick={() =>
              currentPage < totalPages && goToPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-full border transition ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50 bg-gray-200 dark:bg-gray-700"
                : "hover:bg-primary hover:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200"
            }`}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default FindDonor;
