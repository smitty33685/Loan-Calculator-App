import React from "react";
import { LoaderProps } from "../../types/interfaces";
import "./loader.scss";

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <main className="loader">
      <h1>{text}</h1>
    </main>
  );
};

export default Loader;
