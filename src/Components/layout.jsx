import React from 'react'
import NavBar from './NavBar';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div className='flex flex-col min-h-screen relative'>
        <NavBar />
        <main className='flex-grow relative z-30'>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout