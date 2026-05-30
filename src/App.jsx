import SessionTimeout from "./components/context/SessionTimeout";
import AppRoutes from "./routes/AppRoutes";

export function App() {
  return (
    <>
      <SessionTimeout />
      <AppRoutes />
    </>
  );
}