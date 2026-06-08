// Login.jsx
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useRef, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import InputField from "../components/fields/InputField";
import ButtonField from "../components/fields/ButtonField";
import { AuthContext } from "../components/context/AuthProvider";
import { LogInIcon } from "lucide-react";
import { loginConnect } from "../api/axiosClient";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirection = location.state?.from?.pathname || "/dashboard";

  const usernameRef = useRef();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Persist state
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

 
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
    localStorage.setItem("persist", JSON.stringify(persist));
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
      console.log("👉 [STEP 0: handleLogin] Form submitted. Calling loginConnect...");

      const result = await loginConnect(db, usernameOrEmail, password);
      console.log("👉 [STEP 3: handleLogin] Received back from loginConnect:", result);

      if (result && result.success && result.uid) {
        console.log("✅ [STEP 4: handleLogin] Auth successful! Saving items and navigating.");
        const accessToken = result?.data?.accessToken;
        const username = result?.data?.username;
        const email = result?.data?.email;

        setAuth({ username, email, accessToken });
        localStorage.setItem("auth", "true");

        setUsernameOrEmail("");
        setPassword("");
        navigate(redirection, { replace: true });
      } else {
        console.warn("⚠️ [STEP 5: handleLogin] Validation failed inside data structure.");
        setError("Login failed");
      }
    } catch (err) {
      console.error("❌ [STEP 3e: handleLogin] Caught an error thrown up by loginConnect:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <Layout>
      <main className="min-h-[calc(100vh-14vh)] bg-[#f5f6fa] flex items-center justify-center p-4">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Login to your account</p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-100 text-red-600 px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-0 text-gray-400 pointer-events-none z-10" />
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
              </div>

              {/* Password */}
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-0 text-gray-400 pointer-events-none z-10" />
                <InputField
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  label="Password"
                  name="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="persist"
                  checked={persist}
                  onChange={togglePersist}
                />
                <label htmlFor="persist" className="text-sm text-gray-600 select-none">
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <div className="relative w-full flex items-center justify-center">
                <LogInIcon
                  size={18}
                  strokeWidth={2.8}
                  className="absolute left-[calc(50%-45px)] top-1/2 -translate-y-1/2 text-white z-10 pointer-events-none"
                />
                <ButtonField
                  value="Login"
                  type="submit"
                  className="text-white font-bold flex items-center justify-center"
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
