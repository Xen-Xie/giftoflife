import { Button } from "@heroui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import TypingQuote from "../Components/TypingQuote";
import { cn } from "../lib/Utlities";

function SignUp({ className }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const TypingArraay = [
    "Donate Blood, Save Lives — Be the Hero in Someone’s Story.",
  ];
  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-urban bg-[url('/blood.jpeg')] bg-cover bg-center">
      <form className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-xl rounded-2xl px-8 py-10 space-y-6">
        <TypingQuote
          quotes={TypingArraay}
          className={cn("text-primary h-8 font-bold", className)}
        />

        <h1 className="text-center font-extrabold text-2xl text-secondary">
          Sign Up
        </h1>

        <div className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="firstname"
              className="block text-sm font-semibold text-gray-700 mb-1 ml-4"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter Your First Name"
              className="inputFields"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className="block text-sm font-semibold text-gray-700 mb-1 ml-4"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter Your Last Name"
              className="inputFields"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-1 ml-4"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter Your User-Name"
              className="inputFields"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1 ml-4"
            >
              E-Mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your E-mail"
              className="inputFields"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phonenumber"
              className="block text-sm font-semibold text-gray-700 mb-1 ml-4"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phonenumber"
              placeholder="Enter Your Phone Number"
              className="inputFields"
              required
            />
          </div>
          <div className="mb-4 relative w-full max-w-md mx-auto">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1 ml-4"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Your Password"
              className="inputFields"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-8 top-11 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        <Button
          className="w-full rounded-full bg-primary text-white font-bold leading-tight text-xl"
          type="submit"
        >
          Sign Up
        </Button>
        <p className="text-center text-sm text-textd">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-secondary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
