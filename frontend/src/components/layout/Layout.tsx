import { Outlet } from "react-router-dom";
import type { RFCType } from "../../types";
import Navbar from "./Navbar";

const Layout: RFCType = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
