import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"

function PrivateRoute() {
  const token = useSelector(state => state.auth.token)  // auth is the name of the reducer in store.js
  const location = useLocation()                        // get current route location useful for redirecting back after login.
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}

export default PrivateRoute;

/*All protected Routes are nested insided PrivateRoute*/
/*
BRIEF EXPLANATION -> 

const location = useLocation(); gets the current route location using React Router, useful for redirecting back after login.

state={{ from: location }} => passes the current location to the login route so the user can be redirected back after logging in.

replace => ensures the navigation history does not retain the protected page, preventing access via the browser back button.
*/