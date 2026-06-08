import SessionTimeout from "./components/context/SessionTimeout";
import AppRoutes from "./routes/AppRoutes";
// App.jsx
import { isTokenValid, logout } from "./utils/auth";

function App() {
  if (!isTokenValid()) {
    logout();
  }


  return (
    <>
      <SessionTimeout />
      <AppRoutes />
    </>
  );

}

export default App;