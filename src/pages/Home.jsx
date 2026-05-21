// import '../../assets/main.css'
import { Link, useLocation } from "react-router-dom";
import  Layout from "../components/layout/Layout";
import { setTitle } from '../utils/generalFunctions';
import {
  LayoutDashboard,
  ShieldUser,
  ClipboardCheck,
  CalendarCheck,
  Menu,
  LogOutIcon,
  LogInIcon
  
} from "lucide-react";

function Home() {
    setTitle("Home");

  // const location = useLocation();
  // const navigate = useNavigate();

  const login = () => {

  //   // Remove auth
  //   localStorage.removeItem("auth");

  //   // Redirect login page
  //   navigate("/", { replace: true });

  };

    return (
      <Layout>
        <h1>
      Tailwind is working 🚀

      {/* <Link
            to="/login"
            onClick={login}
            className="
              flex items-center gap-3
              px-3 py-2.5
              rounded-xl
              text-sm font-medium
              text-blue-500
              hover:bg-blue-50
              transition-all
              w-full
            "
          >
            <LogInIcon size={18} />
           <span>Login</span>
          </Link> */}
        
    </h1>
    </Layout>
    );
}

export default Home