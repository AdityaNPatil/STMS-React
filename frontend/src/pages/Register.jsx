import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../features/auth/authSlice";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // dispatch to thunk created
      await dispatch(register({ name, email, password })).unwrap();
      toast.success("Registration Successful!")
      navigate("/dashboard")
    } catch (err) {
      toast.error("Registration failed", err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form
        className="p-8 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Register
        </h2>

        <input
          className="w-full mb-3 border border-gray-300 dark:border-gray-700 rounded p-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          className="w-full mb-3 border border-gray-300 dark:border-gray-700 rounded p-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full mb-3 border border-gray-300 dark:border-gray-700 rounded p-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300"
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
          Register
        </button>

        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
