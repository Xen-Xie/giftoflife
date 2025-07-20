/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/useAuth";
import { FaUserCircle } from "react-icons/fa";
import DateInput from "../Components/DateInput";
import { useTranslation } from "react-i18next";
import Button from "../Components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

function Dashboard() {
  const { token, user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newDate, setNewDate] = useState("");
  const [updating, setUpdating] = useState(false);
  const [showDonationHistory, setShowDonationHistory] = useState(false);
  const { t } = useTranslation();
  const dt = t("dashBoard", { returnObjects: true });

  useEffect(() => {
    if (!authUser || !authUser.id) return;

    axios
      .get(`https://giftoflife.onrender.com/api/user/me/${authUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        setLoading(false);
      });
  }, [token, authUser]);

  const handleAddDonationDate = async () => {
    if (!newDate || !authUser?.id) return;
    setUpdating(true);

    try {
      const res = await axios.patch(
        `https://giftoflife.onrender.com/api/user/me/add-donation/${authUser.id}`,
        { newDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfile((prev) => ({
        ...prev,
        lastDonated: res.data.lastDonated,
      }));
      setNewDate("");
    } catch (err) {
      console.error("Error updating donation date:", err);
      alert(err.response?.data?.message || "Failed to add donation date");
    } finally {
      setUpdating(false);
    }
  };

  const handleToggleAvailable = async () => {
    setProfile((prev) => ({
      ...prev,
      isAvailable: !prev.isAvailable,
    }));
    try {
      const res = await axios.patch(
        `https://giftoflife.onrender.com/api/user/me/available/${profile._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.updatedUser?.isAvailable !== undefined) {
        setProfile((prev) => ({
          ...prev,
          isAvailable: res.data.updatedUser.isAvailable,
        }));
        toast.success(
          res.data.updatedUser.isAvailable
            ? t(dt.statusAvailable)
            : t(dt.statusUnavailable)
        );
      }
    } catch (error) {
      toast.error(t("Toggle Error"));
      console.error("Toggle error:", error);
    }
  };

  if (loading) return <div className="py-10 text-center">Loading...</div>;
  if (!profile)
    return <div className="py-10 text-center">No profile data found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-center flex flex-col md:flex-row justify-around gap-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full md:w-[350px] bg-BG dark:bg-dark p-6 rounded-xl shadow"
      >
        <div className="flex flex-col items-center text-center">
          <FaUserCircle className="text-5xl text-primary mb-3" />
          <h2 className="text-xl font-semibold font-Lexend">
            {profile.fullName}
          </h2>
          <p className="text-melty font-Urbanist">{profile.email}</p>
          <p className="text-xl font-semibold mt-1 text-primary font-Lexend">
            {profile.bloodGroup}
          </p>
        </div>

        <div className="mt-6 font-Urbanist">
          <div className="inline-flex flex-col items-center space-y-1 text-md">
            <div className="flex justify-center w-full">
              <div className="text-right w-24 pr-2">
                <strong>{t(dt.age)}</strong>
              </div>
              <div className="text-left w-32">{profile.age}</div>
            </div>
            <div className="flex justify-center w-full">
              <div className="text-right w-24 pr-2">
                <strong>{t(dt.phone)}</strong>
              </div>
              <div className="text-left w-32">{profile.phoneNumber}</div>
            </div>
            <div className="flex justify-center w-full">
              <div className="text-right w-24 pr-2">
                <strong>{t(dt.division)}</strong>
              </div>
              <div className="text-left w-32">
                {profile.address?.division || "N/A"}
              </div>
            </div>
            <div className="flex justify-center w-full">
              <div className="text-right w-24 pr-2">
                <strong>{t(dt.district)}</strong>
              </div>
              <div className="text-left w-32">
                {profile.address?.district || "N/A"}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <Button
              onClick={() => setShowDonationHistory(true)}
              variant="outline"
              size="sm"
              className="w-full max-w-xs"
            >
              {t(dt.vdh)}
            </Button>
            <div className="mt-6 text-center">
              {/* Available Toggle Button */}
              <Button
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleAvailable}
                className={`border w-full max-w-xs ${
                  profile?.isAvailable
                    ? "bg-success"
                    : "bg-melty dark:bg-accent"
                }`}
              >
                {profile?.isAvailable
                  ? t(dt.statusAvailable)
                  : t(dt.statusUnavailable)}
              </Button>
            </div>
            {profile.lastDonated?.length > 0 && (
              <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full mt-2">
                {profile.lastDonated.length} donation
                {profile.lastDonated.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Donation History Modal */}
      <AnimatePresence>
        {showDonationHistory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-transparent backdrop-blur-2xl bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white dark:bg-dark rounded-lg p-6 w-full max-w-md max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{t(dt.dhistory)}</h3>
                <button
                  onClick={() => setShowDonationHistory(false)}
                  className="text-primary hover:text-melty transition-all duration-300 cursor-pointer"
                  aria-label="Close"
                >
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mb-4">
                {profile.lastDonated?.length > 0 ? (
                  <div className="space-y-2">
                    {[...profile.lastDonated]
                      .map((date) => new Date(date))
                      .sort((a, b) => b - a)
                      .map((date, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="py-2 border-b border-gray-100 dark:border-gray-700"
                        >
                          {date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </motion.div>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 py-4 text-center">
                    No donation history yet
                  </p>
                )}
              </div>

              <div className="mt-auto justify-center items-center flex flex-col">
                <DateInput
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full"
                  placeholder="Select donation date"
                />
                <Button
                  onClick={() => {
                    handleAddDonationDate();
                    setShowDonationHistory(false);
                  }}
                  disabled={updating || !newDate}
                  className="w-full mt-2.5"
                  variant="primary"
                >
                  {updating ? t(dt.save) : t(dt.add)}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
