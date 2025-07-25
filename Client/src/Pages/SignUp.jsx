/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import { Link, useNavigate } from "react-router";
import DateInput from "../Components/DateInput";
import { useAuth } from "../auth/useAuth";

function SignUp() {
  const { user } = useAuth();
  const navigaeTo = useNavigate();
  const { t, i18n } = useTranslation();
  // Fetching the divisions and districts from the translation files
  const DivisionDristrict = t("divisions", { returnObjects: true });

  // Fetching the form data from the translation files
  const formLabels = t("signup", { returnObjects: true });

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    bloodGroup: "",
    age: "",
    lastDonated: "",
    division: "",
    district: "",
  });
  // This will redirect The user to the Home If user is logged in before
  useEffect(() => {
    if (user) {
      navigaeTo("/");
    }
  }, [user, navigaeTo]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "division" && { district: "" }), // Reset district when division changes
    }));
  };
  const isStrongPassword = (pwd) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pwd);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [error, setError] = useState("");

  const handleNext = () => {
    // Clear old errors
    setError("");
    const { fullName, email, password, phoneNumber } = form;
    const forbiddenWords = [
      "bro",
      "itz",
      "it'z",
      "its",
      "cdi",
      "gaming",
      "with",
      "xd",
      "gg",
      "n00b",
      "noob",
      "mafia",
      "monster",
      "killer",
      "rekt",
      "ez",
      "420",
      "69",
      "lmao",
      "rofl",
      "lol",
      "lel",
      "xoxo",
      "sussy",
      "pussy",
      "baka",
      "sus",
      "pog",
      "team",
      "group",
      "poggers",
      "yeet",
      "cringe",
      "uwu",
      "owo",
      "kys",
      "lmfao",
      "fml",
      "simp",
      "bruh",
      "wtf",
      "idk",
      "idc",
      "stfu",
      "goat",
      "sigma",
      "rizz",
      "lit",
      "woke",
      "based",
      "cap",
      "no cap",
      "grindset",
      "dab",
      "ezpz",
      "doge",
      "zaza",
      "npc",
      "coomer",
      "zoomer",
      "boomer",
      "giga",
      "beta",
      "alpha",
      "fuck",
      "fuckoff",
      "suck",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    const hasForbiddenWords = (name) =>
      forbiddenWords.find((word) =>
        name.toLowerCase().includes(word.toLowerCase())
      );

    if (!fullName || !email || !password || !phoneNumber) {
      setError(t(formLabels.allFieldsRequired));
      return;
    }
    if (!isValidEmail(email)) {
      setError(t(formLabels.invalidEmail));
      return;
    }

    if (!isStrongPassword(password)) {
      setError(t(formLabels.passwordRequirement));
      return;
    }
    // Prevent Using unnecessary Words
    const badWord = hasForbiddenWords(fullName);
    if (badWord) {
      setError(
        t(formLabels.forbiddenNameWord, { word: badWord.toUpperCase() })
      );
      return;
    }
    setStep(2);
  };

  const handleBack = () => setStep(1);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const payload = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
        bloodGroup: form.bloodGroup,
        age: form.age,
        lastDonated: form.lastDonated || null, // Allow lastDonated to be optional
        address: {
          division: form.division,
          district: form.district,
        },
      };
      const res = await axios.post(
        "https://giftoflife.onrender.com/api/auth/signup",
        payload
      );
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || t(formLabels.SignupFailed));
    }
  };
  // Password Toggle Function
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[url('/white.png')] dark:bg-[url('/dark.png')] bg-cover bg-center font-Lexend">
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl p-6 sm:p-8 rounded-2xl 
      bg-gradient-to-br from-white/10 to-white/5 dark:from-white/10 dark:to-white/10
      backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
      border border-white/20"
        >
          {error && (
            <div className="mb-4 p-3 rounded bg-primary/10 text-primary font-semibold border border-primary text-sm">
              {error}
            </div>
          )}
          {/*Form Start From Here*/}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-melty dark:text-BG font-semibold text-xl text-center">
              {t(formLabels.signup)}
            </h1>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <>
                <input
                  type="text"
                  name="fullName"
                  placeholder={t(formLabels.fullName)}
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t(formLabels.email)}
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="input"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t(formLabels.password)}
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}
    eyeball`}
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    onMouseDown={(e) => e.preventDefault()}
                  ></i>
                </div>
                <input
                  type="telephone"
                  name="phoneNumber"
                  placeholder={t(formLabels.phoneNumber)}
                  value={form.phoneNumber}
                  onChange={handleChange}
                  required
                  className="input"
                />
                <Button className="w-full font-bold" onClick={handleNext}>
                  {t(formLabels.next)}
                </Button>
              </>
            )}
            {/* Step 2 */}
            {step === 2 && (
              <>
                {/* Blood Group Selection */}
                <div className="relative w-full">
                  <select
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    required
                    className="dropdown truncate pr-10"
                  >
                    <option value="">{t(formLabels.bloodGroup)}</option>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                      (group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      )
                    )}
                  </select>
                  <i
                    className="fas fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary/70 transition-transform duration-300 ease-in-out
     select-dropdown-icon"
                    aria-hidden="true"
                  ></i>
                </div>
                {/* Division Selection */}
                <div className="mt-4 relative">
                  <label className="block mb-1 font-semibold text-primary/90">
                    {t(formLabels.division)}
                  </label>
                  <select
                    name="division"
                    value={form.division}
                    onChange={handleChange}
                    required
                    className="dropdown truncate pr-10"
                  >
                    <option value="">{t(formLabels.division)}</option>
                    {Object.keys(DivisionDristrict).map((division) => (
                      <option key={division} value={division}>
                        {DivisionDristrict[division]?.name || division}
                      </option>
                    ))}
                  </select>
                  <i
                    className="fas fa-chevron-down pointer-events-none absolute right-4 top-4/6 -translate-y-1/2 text-primary/70 transition-transform duration-300 ease-in-out select-dropdown-icon"
                    aria-hidden="true"
                  ></i>
                </div>

                {/* District Selection */}
                <div className="mt-4 relative">
                  <label className="block mb-1 font-semibold text-primary/90">
                    {t(formLabels.district)}
                  </label>
                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    required
                    disabled={!form.division}
                    className={`dropdown ${
                      !form.division ? "opacity-50 cursor-not-allowed" : ""
                    } truncate pr-10`}
                  >
                    <option value="">{t(formLabels.district)}</option>
                    {form.division &&
                      Object.keys(
                        DivisionDristrict[form.division]?.districts || {}
                      ).map((districtKey) => (
                        <option key={districtKey} value={districtKey}>
                          {DivisionDristrict[form.division]?.districts[
                            districtKey
                          ] || districtKey}
                        </option>
                      ))}
                  </select>
                  <i
                    className="fas fa-chevron-down pointer-events-none absolute right-4 top-4/6 -translate-y-1/2 text-primary/70 transition-transform duration-300 ease-in-out select-dropdown-icon"
                    aria-hidden="true"
                  ></i>
                </div>

                {/* Age */}
                <input
                  type="number"
                  name="age"
                  placeholder={t(formLabels.age)}
                  value={form.age}
                  onChange={handleChange}
                  min={18}
                  max={65}
                  required
                  onWheel={(e) => e.target.blur()}
                  className="input"
                />
                {/* Last Donate Date */}
                <DateInput value={form.lastDonated} onChange={handleChange} />
                <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between">
                  <Button className="bg-accent  w-full" onClick={handleBack}>
                    {t(formLabels.back)}
                  </Button>
                  <Button className="bg-success w-full" onClick={handleSubmit}>
                    {t(formLabels.submit)}
                  </Button>
                </div>
              </>
            )}
          </form>
          <div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              {t(formLabels.alreadyhaveAccount)}{" "}
              <Link to="/login" className="text-primary hover:underline">
                {t(formLabels.login)}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SignUp;
