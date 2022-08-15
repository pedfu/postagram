import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from './constants/routes';
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Loading = lazy(() => import('./pages/loading'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));

function App() {
  const { user } = useAuthListener(); 

  return (
    <UserContext.Provider value={{user}}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes> 
            <Route path={ROUTES.DASHBOARD} element={ user ? <Dashboard /> : <Login />} />
            <Route path={ROUTES.LOGIN} element={ user ? <Dashboard /> : <Login />} />
            <Route path={ROUTES.SIGN_UP} element={ <SignUp />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
