// https://loading.io/css/
import React from "react";
import "./rounded-loader.scss";

const RoundedLoader = () => {
  return (
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default RoundedLoader;
