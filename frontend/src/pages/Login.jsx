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
      <form className="p-8 bg-white dark:bg-gray-800 rounded shadow-md w-96 text-white" onSubmit={handleSubmit}>
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <input className="form-input w-full mb-3 border-solid border-2 rounded p-2 focus:text-blue-200" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="form-input w-full mb-3 border-solid border-2 rounded p-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white cursor-pointer">Login</button>
        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-500 underline">No account? Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
