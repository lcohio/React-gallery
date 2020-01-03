import React from "react";
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/ocean">Ocean</NavLink>
        </li>
        <li>
          <NavLink to="/mountains">Mountains</NavLink>
        </li>
        <li>
          <NavLink to="/rainbows">Rainbows</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
