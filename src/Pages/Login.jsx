import { Button } from "@heroui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";


function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-urban bg-[url('/blood_03.jpg')]">
      <form className="w-full max-w-md bg-white/10 backdrop-blur-md shadow-xl rounded-2xl px-8 py-10 space-y-5">
        <h1 className="text-center font-extrabold text-2xl text-secondary">Login To Your Account!</h1>
        <div className="space-y-4">
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
              className="border border-primary/50 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 focus:outline-none rounded-full mx-3 px-4 py-2 w-full placeholder:text-textl text-sm transition duration-300 ease-in-out"
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
              type="text"
              id="email"
              placeholder="Enter Your E-mail"
              className="border border-primary/50 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 focus:outline-none rounded-full mx-3 px-4 py-2 w-full placeholder:text-textl text-sm transition duration-300 ease-in-out"
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
              type={showPassword? "text" : "password"}
              id="password"
              placeholder="Enter Your Password"
              className="border border-primary/50 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 focus:outline-none rounded-full mx-3 px-4 py-2 w-full placeholder:text-textl text-sm transition duration-300 ease-in-out"
            />
            <span onClick={()=>setShowPassword(!showPassword)} className="absolute right-8 top-11 transform -translate-y-1/2 text-gray-500 cursor-pointer">
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} >

            </FontAwesomeIcon>
          </span>
          </div>
          
        </div>
        <Button className="w-full rounded-full bg-primary text-white font-bold leading-tight text-xl">Login</Button>
        <p className="text-center text-sm text-textd">
          Don&apos;t have an account?{" "}
          <Link to="/sign-up" className="text-secondary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
