import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout;