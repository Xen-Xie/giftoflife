/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Button from "../Compnents/Button";
import { Link } from "react-router";

function SignUp() {
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "division" && { district: "" }), // Reset district when division changes
    }));
  };
  const handleNext = () => {
    if (form.fullName && form.email && form.password && form.phoneNumber) {
      setStep(2);
    } else {
      alert(t("Please fill all the required fields in step 1"));
    }
  };
  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      alert(t(formLabels.SignupSuccessful));
      setStep(1); // Reset to step 1 after successful signup
      setForm({
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
