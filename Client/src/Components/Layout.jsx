import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <div className='flex flex-col min-h-screen relative'>
        <NavBar />
        <main className='pt-[96px] flex-grow relative z-30'>
            <Outlet />
        </main>
        <Footer />
    </div>
    </>
  )
}

export default Layout;