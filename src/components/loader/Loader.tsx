import React from "react";
import "./loader.scss";

interface Props {
  text: string;
}

const Loader: React.FC<Props> = ({ text }) => {
  return (
    <main className="loader">
      <h1>{text}</h1>
    </main>
  );
};

export default Loader;
