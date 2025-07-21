import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" border-t-[2px] border-t-primary dark:border-t-accent bg-animated bg-gradient-to-br from-red-100 via-pink-50 to-white dark:from-[#0f0f1a] dark:via-[#23263d] dark:to-[#3e5370] py-8 font-Urbanist">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-gray-400">Contact Us On</h1>
        <div className="flex justify-center space-x-6 text-2xl mb-6">
          <a href="https://www.facebook.com/hemel.707/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition duration-300">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com/md.rakibulhasanhemel/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 transition duration-300">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://github.com/Xen-Xie" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-400 transition duration-300">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="mailto:rh189827@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary/40 transition duration-300">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>

        <p className="text-sm text-gray-400">
          Copyright © {currentYear} 
          <span className="text-primary font-medium"> XenXie Team</span>, designed by 
          <span className="text-primary font-medium"> Xen Xie</span>. All rights reserved.
        </p>
        

        <div className="mt-4">
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;
