/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
      alert(t("Signup Successful"));
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
      alert(error.response?.data?.message || t("Signup Failed"));
    }
  };
  // Password Toggle Function
  const [showPassword, setShowPassword] = useState(false);

  return <div>SignUp</div>;
}

export default SignUp;
