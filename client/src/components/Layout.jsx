import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  window.scrollTo(0, 0);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div style={menuIsOpen ? { marginLeft: 200 } : { marginLeft: 0 }}>
      <Header setMenuIsOpen={setMenuIsOpen} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
