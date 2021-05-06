import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./layout.scss";

const Layout = ({ onToggle, children }) => {
  return (
    <div>
      <Header onToggle={onToggle} />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
