import React from "react";
import { ErrorProps } from "../../types/interfaces";
import "./error.scss";

const Error: React.FC<ErrorProps> = ({ text }) => {
  return (
    <div className="error">
      <h1>{text}</h1>
    </div>
  );
};

export default Error;
