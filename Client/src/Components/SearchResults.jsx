import React from "react";
import { useTranslation } from "react-i18next";

function SearchResults({ results = [], loading }) {
  const { t } = useTranslation();

  if (loading) return <p className="text-center text-gray-500">{t("loading", "Loading...")}</p>;

  if (results.length === 0) {
    return <p className="text-center text-gray-400 dark:text-gray-500">{t("No users found.")}</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {results.map((user) => (
        <div
          key={user._id}
          className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
        >
          <h3 className="text-lg font-semibold text-primary">{user.fullName}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {user.email} — {user.bloodGroup}
          </p>
          <p className="text-sm text-gray-400">
            {user.address?.division}, {user.address?.district}
          </p>
          <p>
            {user.phoneNumber}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;