import React, { useCallback, useEffect, useState } from "react";
import Inputs from "../../components/Inputs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { User } from "../../utilities/User";
import _ from "lodash";
import { getBooks, getBooksByQuery, getPersonalBooks } from "../../actions";
import { useQuery } from "../../hooks/useQuery";
import "./styles.scss";
import GridView from "../../components/Grids/Library/GridView";
import { ListView } from "../../components/Grids/Library/ListView";

const tabs_menu_items = ["all", "personal"];

const Library = () => {
  const hasPrivileges = ["admin", "publisher"].includes(User.getUser()?.user?.roleName);
  const currentUserId = useSelector(({ general }) => general?.user?.id) || User.getUser()?.user?.id;
  const { type = tabs_menu_items[0], view = "grid", handleUrlChange } = useQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const books = useSelector(({ library }) => library.books) || {};
  const personalBooks = useSelector(({ library }) => library.personalBooks) || {};

  const [curPage, setCurPage] = useState(2);
  const [isFiltered, setIsFiltered] = useState(false);

  const fetch = useCallback((payload) => dispatch(getBooks(payload)), [dispatch]);
  const personalFetch = useCallback((payload) => dispatch(getPersonalBooks(payload)), [dispatch]);

  useEffect(() => {
    if (type === "all")
      fetch({
        pageNumber: 1,
        pageSize: 20,
        //noPagination:true,
        onSuccess: (res) => setCurPage(2),
      });
    else personalFetch({ id: currentUserId });
  }, [type]);

  const handleFilterBooks = () => {
    dispatch(
      getBooksByQuery({
        query: filter,
        onSuccess: (res) => setIsFiltered(true),
      })
    );
  };

  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="body-container full-height">
        <div className="w-full flex items-center justify-between mb-5">
          {type === "all" ? (
            <div className="w-[450px] flex items-center gap-3">
              <h1 className="inner-title">Search</h1>
              <Inputs.TextInput
                autoComplete="new-password"
                outerClassName={`w-[350px]`}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                suffix={
                  <div className="flex items-center">
                    <div className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-md cursor-pointer" onClick={handleFilterBooks}>
                      <div className="icon search w-4 h-4" />
                    </div>
                    {isFiltered && (
                      <div
                        className="icon close w-4 h-4 mx-3"
                        onClick={() => {
                          setFilter("");
                          setIsFiltered(false);
                          fetch({
                            pageNumber: 1,
                            pageSize: 20,
                            //noPagination:true,
                            onSuccess: (res) => setCurPage(2),
                          });
                        }}
                      />
                    )}
                  </div>
                }
              />
            </div>
          ) : (
            <div className="fake-element w-1" />
          )}
          <div className="flex items-center gap-3">
            {hasPrivileges && <Inputs.Button text={"Create"} selected className={"w-[150px]"} onClick={() => navigate("/create-book")} />}
            <div className={`w-10 h-10 icon grid-view ${view === "grid" && "selected"}`} onClick={() => handleUrlChange({ view: "grid" })} />
            <div className={`w-10 h-10 icon list-view ${view === "list" && "selected"}`} onClick={() => handleUrlChange({ view: "list" })} />
          </div>
        </div>
        {hasPrivileges && (
          <div className="flex w-[400px] border-2 rounded-md mb-7">
            <Inputs.Button text="All books" className={`h-10 ${type === "all" && "selected"}`} style={{ width: "50%" }} onClick={() => handleUrlChange({ type: "all" })} />
            <Inputs.Button text="Personal books" className={`h-10 ${type === "personal" && "selected"}`} style={{ width: "50%" }} onClick={() => handleUrlChange({ type: "personal" })} />
          </div>
        )}
        {view === "grid" ? <GridView books={type === "all" ? books : personalBooks} page={curPage} setPage={setCurPage} fetch={fetch} /> : <ListView books={type === "all" ? books : personalBooks} page={curPage} setPage={setCurPage} fetch={fetch} />}
      </div>
    </div>
  );
};

export default Library;
