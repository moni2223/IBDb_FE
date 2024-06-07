import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import _ from "lodash";
import { getUsers } from "../../actions";
import "./styles.scss";
import { UsersGrid } from "../../components/Grids/Users/UsersGrid";
import Inputs from "../../components/Inputs";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const users = useSelector(({ users }) => users.users) || [];

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  console.log(users);
  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="body-container full-height">
        <div className="flex items-center justify-between mb-2">
          <h1 className="inner-title">Users management</h1>
          <Inputs.Button selected className={"w-[200px]"} text={"Create"} onClick={() => navigate("/create-user")} />
        </div>
        <UsersGrid users={users} />
      </div>
    </div>
  );
};

export default ManageUsers;
