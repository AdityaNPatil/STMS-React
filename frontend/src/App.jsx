import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { useTheme } from "./context/ThemeContext";
import { logout } from "./features/auth/authSlice";

const Sidebar = () => (
  <aside className="w-60 bg-gray-700 text-white min-h-screen p-4 flex flex-col gap-4">
    <Link to="/dashboard" className="font-bold text-xl mb-2">STMS</Link>
    <Link to="/dashboard" className="hover:bg-gray-600 px-3 py-1 rounded">Dashboard</Link>
    {/* More nav items */}
  </aside>
);

const Navbar = () => {
  const { toggleTheme, theme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-200 dark:bg-gray-900">
      <div className="text-md sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight text-center">
        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          SMART TASK MANAGEMENT SYSTEM
        </span>
      </div>
      <div className="flex gap-4 items-center">
        <button onClick={toggleTheme} className="px-2 py-1 bg-gray-400 rounded">
          {theme === "dark" ? "🌑" : "☀️"} Theme
        </button>
        {user && (
          <>
            <span>{user.name || user.email}</span>
            <button onClick={handleLogout} className="px-2 py-1 bg-red-400 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

function App() {

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-black">
      <Sidebar />
      <div className="flex-grow flex flex-col">
        <Navbar />
        <main className="p-2 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
