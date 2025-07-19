import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Board from './pages/Board.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='board/:boardId' element={<Board />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
)
