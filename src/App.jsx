import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes/Routes";
import "react-datepicker/dist/react-datepicker.css";
import { User } from "./utilities/User";
import { checkUser } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_URL } from "./config/settings";
import { toast } from "react-toastify";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(({ general }) => general) || {};
  useEffect(() => {
    if (User.isAuthenticated) dispatch(checkUser(User.getUser()?.user));
  }, [dispatch, user]);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
