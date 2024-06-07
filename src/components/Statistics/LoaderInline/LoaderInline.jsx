/* eslint-disable */
import React from "react";
import "./styles.scss";

const LoaderInline = ({ center, style }) => {
  return (
    <div
      className={`statistics-loader-inline-container row ${center && "center"}`}
      style={style}
    >
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoaderInline;
