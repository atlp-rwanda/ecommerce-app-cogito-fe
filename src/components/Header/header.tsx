// import React from 'react'
// import Logout from '../../partials/Logout';
// import { useState } from 'react';

const Header = () => {
    return (
      <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
        <div className="px-4 sm:px-6 lg:px-8 bg-green-900">
          <div className="flex items-center justify-between h-16 -mb-px ">
            <div className="flex"></div>
  
            <div className="m-2 text-sm md:text-2xl font-Medium  text-white">Cogito</div>
            <div className="flex items-center">
              <hr className="w-px h-4 bg-slate-200 mx-3" />
              {/* <Logout/> */}
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;