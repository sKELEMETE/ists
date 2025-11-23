import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token
    localStorage.removeItem("token");

    // Optionally clear user state if using context
    // setUser(null);

    // Redirect to login
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
