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
            <Button className="px-5 py-2 bg-success">{t("nav.login", "Login")}</Button>
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
      <SearchResults results={donors} loading={loading} />
    </div>
  );
}

export default FindDonor;
