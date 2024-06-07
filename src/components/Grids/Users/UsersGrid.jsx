import React, { useRef, useState } from "react";
import _ from "lodash";
import moment from "moment";
import "../styles.scss";
import { handleUpdate } from "../../../utilities/pagination";
import Scrollbars from "react-custom-scrollbars-2";
import defaultCover from "../../../assets/images/default_cover.png";
import { useNavigate } from "react-router";
const headerElements = [
  {
    name: "Full name",
    query: { filter: "title", options: [] },
  },
  {
    name: "Username",
    query: { filter: "author", options: [] },
  },
  {
    name: "Email",
    query: { filter: "genres", options: [] },
  },
  {
    name: "Role",
    query: { filter: "createdAt", options: [] },
  },
];
export const UsersGrid = ({ users }) => {
  const tableRef = useRef();
  return (
    <Scrollbars ref={tableRef} style={{ height: "92%" }} renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}>
      <div className={`flex w-full bg-[#F8F8F8] p-2 rounded-md`}>
        {headerElements?.map((header, i) => {
          return (
            <div className={`w-1/4 flex`} key={header.query.filter}>
              <div className="font-normal text-xs">{header.name}</div>
            </div>
          );
        })}
      </div>
      {users?.map((el, i) => {
        return (
          <div className="table-body-row cursor-pointer" key={el?._id}>
            <div className={`row-data !w-1/4`}>{el?.fullName || "---"}</div>
            <div className="row-data !w-1/4">{el?.userName || "---"}</div>
            <div className="row-data !w-1/4">{el?.email || "---"}</div>
            <div className="row-data !w-1/4 capitalize">{el?.role?.roleName || "---"}</div>
          </div>
        );
      })}
    </Scrollbars>
  );
};
