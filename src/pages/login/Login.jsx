import { setTitle } from '../../utils/generalFunctions';

import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from '../../api/axios';
import useAuth from '../../components/hooks/auth/useAuth';
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/layout/Layout"; 
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    setTitle();

    const { setAuth, persist, setPersist } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();
    const location = useLocation();
    const redirection = location.state?.from?.pathname || '/';

    const usernameOrEmailRef = useRef();
    const errRef = useRef();

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
    setUsernameOrEmail('admin');
    setPassword('1234');
}, []);

    useEffect(() => { usernameOrEmailRef.current.focus(); }, [])
    useEffect(() => { setErrMsg(''); }, [usernameOrEmail, password])

   const handleSubmit = async (e) => {
    e.preventDefault();

    // Local test credentials
    if (
        usernameOrEmail === "admin" &&
        password === "1234"
    ) {

        const fakeResponse = {
            data: {
                username: "admin",
                email: "admin@test.com",
                accessToken: "local-test-token"
            }
        };

        const accessToken = fakeResponse.data.accessToken;
        const username = fakeResponse.data.username;
        const email = fakeResponse.data.email;

        setAuth({ username, email, accessToken });

        setErrMsg('');

        navigate(redirection, { replace: true });

    } else {

        setErrMsg("Invalid username or password");

        setTimeout(() => {
            setErrMsg('');
        }, 4000);
    }
};



    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post('/user/login',
    //             JSON.stringify({ usernameOrEmail, password }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    //         const accessToken = response?.data?.accessToken;
    //         const username = response?.data?.username;
    //         const email = response?.data?.email;
    //         setAuth({ username, email, accessToken });

    //         setUsernameOrEmail('');
    //         setPassword('');
    //         navigate(redirection, { replace: true }); // We redirect to the previous page
    //     } catch (err) {
    //         if(!err?.response) {
    //             setErrMsg("The server didn't respond.");
    //             setTimeout(() => { setErrMsg(''); }, 4000)
    //         } else if([400, 401].includes(err.response?.status)) {
    //             setErrMsg(err.response?.data?.message);
    //             setTimeout(() => { setErrMsg(''); }, 4000)
    //         } else {
    //             setErrMsg('Login failed.');
    //             setTimeout(() => { setErrMsg(''); }, 4000)
    //         }
    //         errRef.current.focus();
    //     }
    // }

    const togglePersist = () => { setPersist(prev => !prev); }

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist])

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

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Error Message */}
        <p
          ref={errRef}
          className={
            errMsg
              ? "mb-4 rounded-lg bg-red-100 text-red-600 px-4 py-3 text-sm"
              : "hidden"
          }
          aria-live="assertive"
        >
          {errMsg}
        </p>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>

          <div className="relative">

            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              id="usernameOrEmail"
              ref={usernameOrEmailRef}
              autoComplete="off"
              placeholder="Your username or email"
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              value={usernameOrEmail}
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
              required
            />

          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <div className="relative">

            <FontAwesomeIcon
              icon={faUnlockKeyhole}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
              required
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

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="persist_checkBox"
            className="h-4 w-4"
            onChange={togglePersist}
            checked={JSON.parse(persist)}
          />

          <label
            htmlFor="persist_checkBox"
            className="ml-2 text-sm text-gray-600"
          >
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!usernameOrEmail || !password}
          className="
            w-full
            h-12
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          Log in
        </button>

      </form>

      {/* Register */}
      <div className="mt-6 text-center text-sm text-gray-600">
        You don't have an account?{" "}

        <a
          href="/register"
          className="text-blue-500 hover:underline"
        >
          Register
        </a>
      </div>

    </div>
  </div>
</Layout>

    )
}
