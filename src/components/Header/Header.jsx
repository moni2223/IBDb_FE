/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "./styles.scss";
// import { logoutUser } from "../../actions/general";
import { User } from "../../utilities/User";
import { logoutUser } from "../../actions";

const Header = ({}) => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(({ general }) => general?.user) || {};
  const isAdmin = ["admin"].includes(User.getUser()?.user?.roleName);

  return (
    <div className="flex h-1/10 pt-2 justify-between items-center rounded-md shadow-md">
      <div className="flex items-center w-1/4 h-full pl-5">
        <div className="header-logo" onClick={() => navigate("/")} />
      </div>
      <div className={`flex justify-center  ${window.innerWidth < 1300 ? "w-[57%]" : "w-1/2"} h-full shadow-custom`}>
        <div className="flex w-full pl-1 h-14 justify-center items-center shadow-sm rounded-md">
          <div className={`flex w-1/5 justify-center items-center h-full text-black cursor-pointer header-element ${location === "/" || location?.includes("book") ? "selected" : null}`} onClick={() => navigate("/")}>
            <div className={`text-center font-medium w-full whitespace-nowrap text-sm header-inner-element  ${location === "/" || location?.includes("book") ? "selected" : null}`}>LIBRARY</div>
          </div>
          <div className={`flex w-1/5 justify-center items-center h-full text-black cursor-pointer header-element ${location === "/settings" ? "selected" : null}`} onClick={() => navigate("/settings")}>
            <div className={`text-center font-medium w-full whitespace-nowrap text-sm header-inner-element  ${location === "/settings" ? "selected" : null}`}>SETTINGS</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center w-1/4 pr-5 h-full">
        <Popup trigger={<div className={`flex flex-col items-end h-14 w-14 bg-center bg-cover bg-no-repeat cursor-pointer dropdown temp-profile-picture`}></div>} className="header-popUp" position="bottom right">
          {(close) => {
            return (
              <div className="flex flex-col items-center w-full h-full">
                <div className="my-profile-background-image bg-cover" />
                <div className="my-profile-picture temp-profile-picture flex items-end justify-end cursor-pointer" onClick={() => close()}></div>
                <h2 className=" font-bold text-xl">{currentUser?.fullName || User.getUser()?.user?.fullName || User.getUser()?.fullName}</h2>
                <p className="text-sm leading-6">{currentUser?.email || User.getUser()?.user?.email || User.getUser()?.email}</p>
                <div className="flex flex-col w-5/6 h-3/6 mt-4 items-center gap-3">
                  {isAdmin && (
                    <div
                      className="header-option mt-2"
                      onClick={() => {
                        close();
                        navigate("/users");
                      }}
                    >
                      <div className="flex items-center justify-center w-8 mx-2 h-8 bg-green-200" style={{ borderRadius: "50%" }}>
                        <div className="icon user w-4 h-4" />
                      </div>
                      <p className="text-sm font-medium">Users management</p>
                    </div>
                  )}

                  <div
                    className="header-option mt-2"
                    onClick={() => {
                      dispatch(logoutUser());
                      close();
                    }}
                  >
                    <div className="flex items-center justify-center w-8 mx-2 h-8 bg-red-100" style={{ borderRadius: "50%" }}>
                      <div className="icon logout w-4 h-4" />
                    </div>
                    <p className="text-sm font-medium">Log out</p>
                  </div>
                </div>
              </div>
            );
          }}
        </Popup>
      </div>
    </div>
  );
};
export default Header;
