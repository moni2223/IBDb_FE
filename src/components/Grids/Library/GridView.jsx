import React, { useRef, useState } from "react";
import _ from "lodash";
import moment from "moment";
import "../styles.scss";
import defaultCover from "../../../assets/images/default_cover.png";
import { handleUpdate } from "../../../utilities/pagination";
import Scrollbars from "react-custom-scrollbars-2";
import { useNavigate } from "react-router";

const GridView = ({ books, fetch, page, setPage }) => {
  const navigate = useNavigate();
  const tableRef = useRef();
  const [innerLoading, setInnerLoading] = useState(false);
  return (
    <Scrollbars
      onUpdate={(values) => {
        if (fetch)
          handleUpdate(values, books, page, setPage, innerLoading, setInnerLoading, fetch, {
            pageNumber: page,
            pageSize: 20,
            onSuccess: () => setInnerLoading(false),
          });
      }}
      ref={tableRef}
      style={{ height: "83%" }}
      renderView={(props) => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}
    >
      <div className="w-full flex flex-wrap gap-8">
        {books?.docs?.map((book) => (
          <div className="book-grid-container" key={book?.id} onClick={() => navigate(`/book?bookId=${book?.id}`)}>
            <div className="book-cover" style={{ backgroundImage: `url(${book?.cover || defaultCover})` }}></div>
            <div className="book-information">
              <h2 className="font-bold text-lg capitalize">{book?.title}</h2>
              <p className="text-[#1076B5] font-semibold">{book?.publisher?.fullName}</p>
              <p className="text-sm">
                Genres:<b className="ml-2">{book?.genres?.map((genre, i) => `${genre?.name}${book?.genres?.length - 1 > i ? ", " : ""}`)}</b>
              </p>
              <div className="flex items-center justify-between w-full">
                <p className="text-sm">
                  Created on:<b className="ml-2">{moment(book?.createdAt).format("DD.MM.YYYY")}</b>
                </p>
                <p className="text-sm">
                  Current price:<b className="ml-2">{book?.price?.toFixed(2)} EUR</b>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Scrollbars>
  );
};

export default GridView;
