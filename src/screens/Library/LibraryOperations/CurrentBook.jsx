import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { User } from "../../../utilities/User";
import _ from "lodash";
import { createReview, deleteReview, getCurrentBook, getCurrentBookReviews } from "../../../actions";
import "../styles.scss";
import moment from "moment";
import { useQuery } from "../../../hooks/useQuery";
import defaultCover from "../../../assets/images/default_cover.png";
import { RatingReview } from "../../../components/RatingReview/RatingReview";
import Inputs from "../../../components/Inputs";
import { toast } from "react-toastify";

const CurrentBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const hasPrivileges = ["admin", "publisher"].includes(User.getUser()?.user?.roleName);
  const isAdmin = ["admin"].includes(User.getUser()?.user?.roleName);
  const currentUserId = useSelector(({ general }) => general?.user?.id) || User.getUser()?.user?.id;

  const { bookId } = useQuery();

  const current = useSelector(({ library }) => library.current) || {};
  const reviews = useSelector(({ library }) => library.reviews) || [];
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    dispatch(getCurrentBook({ _id: bookId }));
    dispatch(getCurrentBookReviews({ _id: bookId }));
  }, []);

  const handleLeaveReview = () => {
    dispatch(
      createReview({
        rating,
        comment: review,
        userID: currentUserId,
        bookID: bookId,
        onSuccess: () => {
          toast.success("Review sent successfully");
          dispatch(getCurrentBookReviews({ _id: bookId }));
          setRating(0);
          setReview("");
        },
      })
    );
  };

  const handleDeleteReview = (_id) => {
    dispatch(
      deleteReview({
        _id,
        onSuccess: (res) => {
          toast.success("Review deleted successfully");
          dispatch(getCurrentBookReviews({ _id: bookId }));
        },
      })
    );
  };
  return (
    <div className="main-container" style={{ height: "92vh" }}>
      <div className="flex items-center w-full h-full">
        <div className="bg-contain bg-center bg-no-repeat w-[550px] h-[80vh] relative z-10" style={{ backgroundImage: `url(${current?.cover || defaultCover})` }} />
        <div className="bg-white h-full w-[77%] rounded-md shadow-xl -ml-1 relative z-0 pl-3">
          <div className="w-full flex justify-between items-center p-3 bg-[#08C642] rounded-md font-bold text-white text-xl uppercase">
            <p>{current?.title || "---"}</p>
            {isAdmin || current?.publisherId === currentUserId ? <Inputs.Button text={"Edit"} className={"!bg-[#1076B5] text-white w-[150px]"} onClick={() => navigate(`/edit-book?bookId=${current?.id}`)} /> : null}
          </div>
          <div className="w-[97%] ml-3 flex flex-col gap-3">
            <p className="text-[#1076B5] font-semibold text-lg mt-5">{current?.publisher?.fullName}</p>
            <p className="text-sm">
              Genres:<b className="ml-2">{current?.genres?.map((genre, i) => `${genre?.name}${current?.genres?.length - 1 > i ? ", " : ""}`)}</b>
            </p>
            <p className="italic text-sm">{current?.description}</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-sm">
                Created on:<b className="ml-2">{moment(current?.createdAt).format("DD.MM.YYYY")}</b>
              </p>
              <p className="text-sm">
                Current price:<b className="ml-2">{current?.price?.toFixed(2)} EUR</b>
              </p>
            </div>
          </div>
          {!!reviews?.length && (
            <>
              <div className="divider bg-black !w-[98%]" />
              <div className="reviews-container">
                <div className="w-full">
                  {reviews?.map((review) => (
                    <div className="w-full h-[85px]" key={review?.reviewID}>
                      <div className="flex items-center w-full justify-between">
                        <p className="text-sm font-bold mr-3">{review?.user?.fullName}</p>
                        <div className="flex items-center">
                          <p className="text-sm mr-3">{moment(review?.createdAt).format("DD.MM.YYYY | HH:mm")}</p>
                          <RatingReview rating={review?.rating} />
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <Inputs.TextInput value={review?.comment} outerClassName={"!w-[95%]"} disabled />
                        {isAdmin && <div className="icon delete w-8 h-8" onClick={() => handleDeleteReview(review?.reviewID)} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="divider bg-black !w-[98%]" />
          <div className="w-[98%] flex flex-col gap-2 mt-4 p-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-sm font-semibold italic">Feel free to leave review</p>
              <RatingReview rating={rating} setRating={setRating} />
            </div>
            <Inputs.TextInput value={review} outerClassName={"!w-full"} onChange={(e) => setReview(e.target.value)} />
            <div className="w-full flex justify-end">
              <Inputs.Button selected className={"w-[150px]"} text={"Leave review"} disabled={!rating || !review || !review?.length} onClick={handleLeaveReview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBook;
