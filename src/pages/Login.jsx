import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import useAuth from "../components/hooks/auth/useAuth";
import axios from "../api/axiosClient";
import { setTitle } from "../utils/generalFunctions";
import InputField from "../components/fields/InputField";
import ButtonField from "../components/fields/ButtonField";

import {    
  LogInIcon,  
} from "lucide-react";

// Inside Login.jsx
import { loginConnect } from "../api"; // ✅ Must have curly braces
 
export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirection = location.state?.from?.pathname || "/dashboard";

  const usernameRef = useRef();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Set page title
  useEffect(() => {
    setTitle("Login");
  }, []);

  // Focus username field
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  // Clear error while typing
  useEffect(() => {
    setError("");
  }, [usernameOrEmail, password]);

  // Redirect if already logged in
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // Persist login state
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

// Handle Login
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const db = "odoo_env";
    console.log("👉 [STEP 0: handleLogin] Form submitted. Calling login_connect...");

    console.log("Checking states before call:", { usernameOrEmail, password });
    const data = await loginConnect(db, usernameOrEmail, password);
    
    // 🌟 CRITICAL: Check if data from login_connect arrived safely here
    console.log("👉 [STEP 3: handleLogin] Received back from login_connect:", data);

    const result = data?.result;
    console.log("👉 [STEP 4: handleLogin] Extracted nested result object:", result);

    if (result && result.success && result.uid) {
      console.log("✅ [STEP 5: handleLogin] Auth successful! Saving items and navigating.");
      setAuth(result);
      localStorage.setItem("auth", "true");
      const accessToken = result?.data?.accessToken;
      const username = result?.data?.username;
      const email = result?.data?.email;
      setAuth({ username, email, accessToken });
      setUsernameOrEmail('');
      setPassword('');
      navigate(redirection, { replace: true }); // We redirect to the previous page
      // ... rest of your code
    } else {
      console.warn("⚠️ [STEP 5: handleLogin] Validation failed inside data structure.");
      setError("Login failed");
    }
  } catch (err) {
    // 🌟 CRITICAL: Check if errors inside login_connect are successfully caught here
    console.error("❌ [STEP 3e: handleLogin] Caught an error thrown up by login_connect:", err);
    // ... rest of your error logic
  }
};



  return (
    <Layout>
  <main
    className="
      min-h-[calc(100vh-14vh)]
      bg-[#f5f6fa]
      flex
      items-center
      justify-center
      p-4
    "
  >

    {/* Content Container */}
    <div
      className="
        w-full
        h-full
        flex
        items-center
        justify-center
      "
    >

      {/* Login Card */}
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-gray-100
          bg-white
          p-8
          shadow-sm
        "
      >

      {/* Title */}
      <div className="text-center mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <p className="text-gray-500 mt-2">
          Login to your account
        </p>

      </div>

      {/* Error */}
      {error && (
        <div
          className="
            mb-4 rounded-lg
            bg-red-100
            text-red-600
            px-4 py-3 text-sm
          "
        >
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

        {/* Username */}
        <div>

          {/* <label
            className="
              block text-sm
              font-medium
              text-gray-700
              mb-2
            "
          >
            Username / Email
          </label> */}

          <div className="relative">

            <Mail
    size={18}
    className="
      absolute
      left-3
      top-1/2
      -translate-y-0
      text-gray-400
      pointer-events-none
      z-10
    "
  />

           

  <InputField
    type="text"
    autoComplete="off"
    ref={usernameRef}
    label="Username / Email"
    name="work_email"
    placeholder="Your username or email"
    value={usernameOrEmail}
    onChange={(e) => setUsernameOrEmail(e.target.value)}
    required
    className="pl-12"
  />

            {/* <input
              ref={usernameRef}
              type="text"
              autoComplete="off"
              placeholder="Your username or email"
              value={usernameOrEmail}
              onChange={(e) =>
                setUsernameOrEmail(e.target.value)
              }
              required
              className="
                w-full h-12
                pl-11 pr-4
                rounded-xl
                border border-gray-300
                outline-none
                focus:ring-2
                focus:ring-[#714B67]
                focus:border-[#714B67]
              "
            /> */}

          </div>

        </div>

        {/* Password */}
        <div>

          {/* <label
            className="
              block text-sm
              font-medium
              text-gray-700
              mb-2
            "
          >
            Password
          </label> */}

          <div className="relative">

             <Lock
    size={18}
    className="
      absolute
      left-3
      top-1/2
      -translate-y-0
      text-gray-400
      pointer-events-none
      z-10
    "
  />

            {/* <Lock
              size={18}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-gray-400
              "
            /> */}

            <InputField
    type={
                showPassword
                  ? "text"
                  : "password"
              }
    autoComplete="off"
    ref={usernameRef}
    label="Password"
    name="password"
    placeholder="Your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
    required
    className="pl-12"
  />

            {/* <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="
                w-full h-12
                pl-11 pr-12
                rounded-xl
                border border-gray-300
                outline-none
                focus:ring-2
                focus:ring-[#714B67]
                focus:border-[#714B67]
              "
            /> */}

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="
                absolute right-4 top-1/2
                -translate-y-1/2
                text-gray-500
              "
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* Remember */}
        <div className="flex items-center gap-2">

          <input
            type="checkbox"
            id="persist"
            checked={persist}
            onChange={togglePersist}
          />

          <label
            htmlFor="persist"
            className="
              text-sm text-gray-600
              select-none
            "
          >
            Remember me
          </label>

        </div>

{/* Login Button */}
<div className="relative w-full flex items-center justify-center">

  {/* Icon */}
 <LogInIcon
  size={18}
  strokeWidth={2.8}
  className="
    absolute
    left-[calc(50%-45px)]
    top-1/2
    -translate-y-1/2
    text-white
    z-10
    pointer-events-none
  "
/>

  {/* Button */}
  <ButtonField
    value="Login"
    type="submit"
    className="
      text-white
      font-bold
      flex
      items-center
      justify-center
    "
  />

</div>

      </form>

    </div>

  </div>

</main>
    </Layout>
  );
}
