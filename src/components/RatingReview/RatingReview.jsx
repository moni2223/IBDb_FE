import React from "react";

export const RatingReview = ({ rating, setRating }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6].map((star) => {
        return (
          <span
            className="start !text-xl"
            style={{
              color: rating >= star ? "gold" : "gray",
              cursor: setRating && "pointer",
            }}
            key={star}
            onClick={() => setRating && setRating(star)}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
};
