import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { User } from "../../utilities/User";
import LoaderGlobal from "../LoaderGlobal";
import Header from "../Header/Header";
import Authentication from "../../screens/Authentication/Authentication";
import Library from "../../screens/Library/Library";
import CurrentBook from "../../screens/Library/LibraryOperations/CurrentBook";
import ManageUsers from "../../screens/ManageUsers/ManageUsers";
import CreateUser from "../../screens/ManageUsers/CreateUser";
import CreateBook from "../../screens/Library/LibraryOperations/CreateBook";
import EditBook from "../../screens/Library/LibraryOperations/EditBook";
// import { getAllNotifications, getUnreadNotificationsCount } from "../../actions";

function PrivateRoute({ children }) {
  if (!User.isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
}

function AuthRoute({ children }) {
  let location = useLocation();
  if (User.isAuthenticated) return <Navigate to="/" state={{ from: location }} replace />;
  return children;
}
const RoutesCamp = () => {
  const privateRoutes = [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Library />
        </PrivateRoute>
      ),
    },
    {
      path: "/book",
      element: (
        <PrivateRoute>
          <CurrentBook />
        </PrivateRoute>
      ),
    },
    {
      path: "/create-book",
      element: (
        <PrivateRoute>
          <CreateBook />
        </PrivateRoute>
      ),
    },
    {
      path: "/edit-book",
      element: (
        <PrivateRoute>
          <EditBook />
        </PrivateRoute>
      ),
    },
    {
      path: "/users",
      element: (
        <PrivateRoute>
          <ManageUsers />
        </PrivateRoute>
      ),
    },
    {
      path: "/create-user",
      element: (
        <PrivateRoute>
          <CreateUser />
        </PrivateRoute>
      ),
    },
  ];
  return (
    <>
      {User.isAuthenticated && !location.pathname.includes("/auth") && window.innerWidth > 900 && <Header />}
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Authentication />
            </AuthRoute>
          }
        />
        {privateRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      <LoaderGlobal />
    </>
  );
};

export default RoutesCamp;
