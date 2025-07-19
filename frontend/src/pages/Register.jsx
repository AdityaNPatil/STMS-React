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

  const handleSubmit =async (e) => {
    e.preventDefault()

    try {
      // dispatch to thunk created
      await dispatch(register({name, email, password})).unwrap();
      toast.success("Registration Successful!")
      navigate("/dashboard")
    } catch (err){
      toast.error("Registration failed", err)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <form className="p-8 bg-white dark:bg-gray-800 rounded shadow-md w-96 text-white" onSubmit={handleSubmit}>
        <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>
        <input className="form-input w-full mb-3 border-solid border-2 rounded p-2 focus:text-blue-200" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="form-input w-full mb-3 border-solid border-2 rounded p-2 focus:text-blue-200" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="form-input w-full mb-3 border-solid border-2 rounded p-2 focus:text-blue-200" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white cursor-pointer">Register</button>
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500 underline">Already have an account?</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
