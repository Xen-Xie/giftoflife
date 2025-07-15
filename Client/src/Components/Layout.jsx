import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <div className='flex flex-col min-h-screen relative'>
        <NavBar />
        <main className='pt-[96px] flex-grow relative z-30 bg-animated bg-gradient-to-br from-red-100 via-pink-50 to-white dark:from-[#0f0f1a] dark:via-[#23263d] dark:to-[#3e5370]'>
            <Outlet />
        </main>
        <Footer />
    </div>
    </>
  )
}

export default Layout;