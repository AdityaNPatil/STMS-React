import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { login } from "../features/auth/authSlice";
import { toast } from "react-toastify"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // dispath to the thunk created
      await dispatch(login({ email, password })).unwrap()
      toast.success("Login Successful!")
      // as defined in PrivateRoute - if token not found then we store the location in state:{{from:location}} hence we use it here to redirect back to previous page from where we ended up on login & if not then go to dashboard
      const redirectPath = location.state?.from?.pathname || "/dashboard"
      navigate(redirectPath, { replace: true }) // navigate to redirectPath and replace the current entry in history stack instead of pushing a new one
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        className="p-8 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>

        <input
          className="form-input w-full mb-3 border border-gray-300 dark:border-gray-700 rounded p-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="form-input w-full mb-3 border border-gray-300 dark:border-gray-700 rounded p-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          Login
        </button>

        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
            No account? Register
          </Link>
        </div>
      </form>
    </div>

  )
}

export default Login
