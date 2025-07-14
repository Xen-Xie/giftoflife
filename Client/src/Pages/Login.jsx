/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Button from "../Components/Button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/useAuth";

function Login() {
  const {login} = useAuth
  // Fetching the divisions and districts from the translation files
  const { t } = useTranslation();
  const formLabels = t("login", { returnObjects: true });
  //Navigate to the next page
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  //Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "https://giftoflife.onrender.com/api/auth/login",
        form
      );
      login(res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || t("Invalid credentials"));
    }
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-melty dark:text-BG font-semibold text-xl text-center">
              {t("login.login")}
            </h1>

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
                className={`fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } eyeball`}
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                onMouseDown={(e) => e.preventDefault()}
              ></i>
            </div>

            <Button type="submit" className="w-full font-bold">
              {t(formLabels.login)}
            </Button>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              {t(formLabels.noaccount)}{" "}
              <Link to="/signup" className="text-primary hover:underline">
                {t(formLabels.signup)}
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
