import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import Layout from '../../components/layout/Layout'

import { setTitle } from "../../utils/setPageTitle";

import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from '../../api/axiosClient';
import useAuth from '../../components/hooks/auth/useAuth';


export default function Login() {

  setTitle();

    const { setAuth, persist, setPersist } = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();
    const redirection = location.state?.from?.pathname || '/';

    const usernameOrEmailRef = useRef();
    const errRef = useRef();

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => { usernameOrEmailRef.current.focus(); }, [])
    useEffect(() => { setErrMsg(''); }, [usernameOrEmail, password])
 
  const logout = () => {
  setAuth(null);
  localStorage.clear();
  sessionStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
  navigate("/", { replace: true });
};

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/user/login',
                JSON.stringify({ usernameOrEmail, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const username = response?.data?.username;
            const email = response?.data?.email;
            setAuth({ username, email, accessToken });
            setUsernameOrEmail('');
            setPassword('');
            navigate(redirection, { replace: true }); // We redirect to the previous page
        } catch (err) {
            if(!err?.response) {
                setErrMsg("The server didn't respond.");
                setTimeout(() => { setErrMsg(''); }, 4000)
            } else if([400, 401].includes(err.response?.status)) {
                setErrMsg(err.response?.data?.message);
                setTimeout(() => { setErrMsg(''); }, 4000)
            } else {
                setErrMsg('Login failed.');
                setTimeout(() => { setErrMsg(''); }, 4000)
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => { setPersist(prev => !prev); }

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist])

  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Protect login page
useEffect(() => {

  const auth = localStorage.getItem("auth");

  // Already logged in
  if (auth) {
    navigate("/dashboard", { replace: true });
  }

}, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login
//   const handleLogin = (e) => {

//   e.preventDefault();

//   // Demo credentials
//   const demoEmail = "admin@gmail.com";
//   const demoPassword = "1234";

//   if (
//     formData.email.trim() === demoEmail &&
//     formData.password.trim() === demoPassword
//   ) {

//     setError("");

//     // Save auth
//     localStorage.setItem("auth", "true");

//     // Redirect dashboard
//     navigate("/dashboard", { replace: true });

//   } else {

//     setError("Invalid email or password");

//   }
// };

  return (
        <Layout>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

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
          <div className="mb-4 rounded-lg bg-red-100 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                                type="text" id="usernameOrEmail" ref={usernameOrEmailRef} autoComplete="off" placeholder='Your username or email'
                                onChange={(e) => setUsernameOrEmail(e.target.value)} value={usernameOrEmail} required
                            
                                className="
                  w-full
                  h-12
                  pl-11
                  pr-4
                  rounded-xl
                  border
                  border-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
                            
                            />

              
            </div>

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

             <input
                                type={showPassword ? "text" : "password"} id="password" 
								className="
                  w-full
                  h-12
                  pl-11
                  pr-12
                  rounded-xl
                  border
                  border-gray-300
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                "
								placeholder='Your password'
                                onChange={(e) => setPassword(e.target.value)} value={password} required 
                            />
							


              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="
              w-full
              h-12
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              transition
            "
          >
            Login
          </button>

        </form>

        {/* Demo Credentials */}
        <div className="mt-6 rounded-xl bg-gray-100 p-4 text-sm text-gray-600">

          <p className="font-semibold mb-1">
            Demo Credentials
          </p>

          <p>Email: admin@gmail.com</p>
          <p>Password: admin123</p>

        </div>

      </div>

    </div>
    </Layout>
  );
}