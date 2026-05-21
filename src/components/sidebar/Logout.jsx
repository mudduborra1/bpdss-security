    // Protect login page place at login page 
  useEffect(() => {
  
    const auth = localStorage.getItem("auth");
  
    // Already logged in
    if (auth) {
      navigate("/dashboard", { replace: true });
    }
  
  }, [navigate]);


  // Protect Dashboard page palce at dashboard
  useEffect(() => {

    const auth = localStorage.getItem("auth");

    // If not logged in
    if (!auth) {
      navigate("/", { replace: true });
      return;
    }

  }, [navigate]);

 
// Redirect to login page place in sidebar
const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {

    // Remove auth
    localStorage.removeItem("auth");

    // Redirect login page
    navigate("/", { replace: true });

  };

//   git add .
// git commit -m "updated code"
// git push