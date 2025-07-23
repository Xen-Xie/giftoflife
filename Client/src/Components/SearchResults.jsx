import React from "react";
import { useTranslation } from "react-i18next";

function SearchResults({ results = [], loading }) {
  const { t } = useTranslation();
  const dt = t("dashBoard", { returnObjects: true });
  const divisions = t("divisions", { returnObjects: true });

  if (loading)
    return (
      <p className="text-center text-gray-500">{t("loading", "Loading...")}</p>
    );

  const availableDonors = results.filter((user) => user.isAvailable);

  if (availableDonors.length === 0) {
    return (
      <p className="text-center text-gray-400 dark:text-gray-500">
        {t("No users found.")}
      </p>
    );
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy:", err);
    });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {availableDonors.map((user) => {
        const divisionName = divisions?.[user.address?.division]?.name;
        const districtName =
          divisions?.[user.address?.division]?.districts?.[
            user.address?.district
          ];

        return (
          <div
            key={user._id}
            className="relative pt-10 pb-5 px-5 bg-white dark:bg-melty border border-melty/15 dark:border-BG/15 rounded-xl shadow-lg transition-all hover:shadow-xl"
          >
            {/* Availability Badge */}
            <span
              className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold ${
                user.isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {user.isAvailable
                ? t(dt.statusAvailable)
                : t(dt.statusUnavailable)}
            </span>

            {/* User Info */}
            <div className="space-y-1">
              {/* Full Name */}
              <h3 className="text-lg font-bold text-accent mt-2">
                {user.fullName}
              </h3>

              {/* Blood Group */}
              <p className="text-base font-semibold text-melty dark:text-BG">
                {user.bloodGroup}
              </p>

              {/* Address */}
              <p className="text-sm text-gray-500">
                {divisionName}, {districtName}
              </p>

              {/* Phone Number with Copy-on-Tap */}
              <p
                className="text-sm font-semibold text-red-600 cursor-pointer select-none active:scale-[0.98] transition"
                onClick={() => handleCopy(user.phoneNumber)}
                title={t("Click to copy")}
              >
                {user.phoneNumber}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
