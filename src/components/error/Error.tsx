import React from "react";
import "./error.scss";

interface Props {
  text: string;
}

const Error: React.FC<Props> = ({ text }) => {
  return (
    <div className="error">
      <h1>{text}</h1>
    </div>
  );
};

export default Error;
