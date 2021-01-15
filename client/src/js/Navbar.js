import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__left"></div>
      <div className="navbar__center">
        <div className="navbar__logo">
          <div className="navbar__logo__image">
            <img src="images/logo.svg" alt="Zoomify logo" />
          </div>
          <div className="navbar__logo__text">ZOOMIFY</div>
        </div>
      </div>
      <div className="navbar__right"></div>
    </div>
  );
};

export default Navbar;
