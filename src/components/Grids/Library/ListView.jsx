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
    name: "Title",
    query: { filter: "title", options: [] },
  },
  {
    name: "Author",
    query: { filter: "author", options: [] },
  },
  {
    name: "Genres",
    query: { filter: "genres", options: [] },
  },
  {
    name: "Published at",
    query: { filter: "createdAt", options: [] },
  },
  {
    name: "Price",
    query: { filter: "price", options: [] },
  },
];
export const ListView = ({ books, fetch, page, setPage }) => {
  const navigate = useNavigate();
  const tableRef = useRef();
  const [innerLoading, setInnerLoading] = useState(false);
  return (
    <Scrollbars
      onUpdate={(values) => {
        if (fetch)
          handleUpdate(values, docs, page, setPage, innerLoading, setInnerLoading, fetch, {
            page: page,
            limit: 20,
            onSuccess: () => setInnerLoading(false),
          });
      }}
      ref={tableRef}
      style={{ height: "91%" }}
      renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}
    >
      <div className={`flex w-full bg-[#F8F8F8] p-2 rounded-md`}>
        {headerElements?.map((header, i) => {
          return (
            <div className={`w-1/5 flex`} key={header.query.filter}>
              {i === 0 && <div className="w-[90px]" />}
              <div className="font-normal text-xs">{header.name}</div>
            </div>
          );
        })}
      </div>
      {books?.docs?.map((el, i) => {
        return (
          <div className="table-body-row cursor-pointer higher" key={el?._id} onClick={() => navigate(`/book?bookId=${el?.id}`)}>
            <div className={`row-data higher !flex !pl-0 !mt-0 !h-full !w-1/5`}>
              <div className="w-[94px] h-[94px] bg-contain bg-no-repeat rounded-md mr-2" style={{ backgroundImage: `url(${el?.cover || defaultCover})` }} />
              <p className="w-3/4 pr-1 break-all">{el?.title || "---"}</p>
            </div>
            <div className="row-data higher !w-1/5">{el?.publisher?.fullName || "---"}</div>
            <div className="row-data higher !w-1/5">{el?.genres?.map((genre, i) => `${genre?.name}${el?.genres?.length - 1 > i ? ", " : ""}`)}</div>
            <div className="row-data higher !w-1/5">{moment(el?.createdAt).format("DD.MM.YYYY")}</div>
            <div className="row-data higher !w-1/5">{el?.price?.toFixed(2)} EUR</div>
          </div>
        );
      })}
    </Scrollbars>
  );
};
