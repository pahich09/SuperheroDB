import React from 'react';
import {NavLink} from 'react-router-dom';


export const NavBar = () => {
  return (
    <nav className="main-menu">
      <NavLink to='/'
               className="main-menu__link main-menu__link_title"
               exact>
        SuperHero DB
      </NavLink>
      <NavLink to='/create'
               className="main-menu__link"
               activeClassName="main-menu__link_active">
        Add hero
      </NavLink>
    </nav>
  );
};
