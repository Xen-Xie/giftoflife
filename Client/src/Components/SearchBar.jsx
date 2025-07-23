/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import Button from "./Button";

function SearchSection({ setResults, setLoading }) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [bloodGroup, setBloodGroup] = useState(
    searchParams.get("bloodGroup") || ""
  );
  const [division, setDivision] = useState(searchParams.get("division") || "");
  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "createdAt"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  const divisionData = t("divisions", { returnObjects: true });
  const divisions = Object.keys(divisionData);
  const districts = division
    ? Object.keys(divisionData[division]?.districts || {})
    : [];

  const updateURLParams = () => {
    const params = {};
    if (query) params.q = query;
    if (bloodGroup) params.bloodGroup = bloodGroup;
    if (division) params.division = division;
    if (district) params.district = district;
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;
    setSearchParams(params);
  };

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (bloodGroup) params.bloodGroup = bloodGroup;
      if (division) params.division = division;
      if (district) params.district = district;
      if (sortBy) params.sortBy = sortBy;
      if (order) params.order = order;

      const res = await axios.get(
        "https://giftoflife.onrender.com/api/users/search",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params,
        }
      );

      const filtered = res.data.filter((user) => {
        const q = query.toLowerCase();
        return (
          user.address?.division?.toLowerCase().includes(q) ||
          user.address?.district?.toLowerCase().includes(q)
        );
      });

      setResults(filtered);
    } catch (err) {
      console.error("Error fetching data", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [
    query,
    bloodGroup,
    division,
    district,
    sortBy,
    order,
    setResults,
    setLoading,
  ]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center mb-6 relative">
      {/* Search Bar */}
      <div className="relative w-full md:col-span-full">
        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-full px-5 py-3 pr-12"
        />
        <i className="fas fa-search absolute right-5 top-1/2 -translate-y-1/2 text-primary/70 pointer-events-none" />
      </div>

      {/* Blood Group */}
      <div className="relative w-full md:w-32">
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="w-full px-4 py-2 pr-10 dropdown truncate"
        >
          <option value="">{t("blood_group")}</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/70 transition-transform duration-300 ease-in-out select-dropdown-icon" />
      </div>

      {/* Division */}
      <div className="relative w-full md:w-40">
        <select
          value={division}
          onChange={(e) => {
            setDivision(e.target.value);
            setDistrict("");
          }}
          className="w-full px-4 py-2 dropdown truncate"
        >
          <option value="">{t("signup.division")}</option>
          {divisions.map((div) => (
            <option key={div} value={div}>
              {divisionData[div]?.name || div}{" "}
            </option>
          ))}
        </select>
        <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/70 transition-transform duration-300 ease-in-out select-dropdown-icon" />
      </div>

      {/* District */}
      <div className="relative w-full md:w-40">
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          disabled={!division}
          className="w-full px-4 py-2 pr-10 dropdown truncate"
        >
          <option value="">{t("signup.district")}</option>
          {districts.map((dist) => (
            <option key={dist} value={dist}>
              {divisionData[division]?.districts?.[dist] || dist}{" "}
            </option>
          ))}
        </select>
        <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/70 transition-transform duration-300 ease-in-out select-dropdown-icon" />
      </div>

      {/* Sort By */}
      <div className="relative w-full md:w-36">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-4 py-2 pr-10 dropdown truncate"
        >
          <option value="createdAt">{t("Sort by Date")}</option>
          <option value="age">{t("Sort by Age")}</option>
          <option value="lastDonated">{t("Sort by Donation")}</option>
        </select>
        <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/70 transition-transform duration-300 ease-in-out select-dropdown-icon" />
      </div>

      {/* Order */}
      <div className="relative w-full md:w-28">
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="w-full px-4 py-2 pr-10 dropdown"
        >
          <option value="desc">{t("Newest")}</option>
          <option value="asc">{t("Oldest")}</option>
        </select>
        <i className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/70 transition-transform duration-300 ease-in-out select-dropdown-icon" />
      </div>

      <Button
        onClick={() => {
          updateURLParams();
          fetchResults();
        }}
      >
        {t("search")}
      </Button>
    </div>
  );
}

export default SearchSection;
