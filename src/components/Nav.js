import React from "react";
import './Nav.css';
import {Link} from "react-router-dom";
function Nav() {
  return (
    <nav>
        <Link to="/" style={{ textDecoration: 'none' }}>
        <img className="Logotype" src="./Images/AFRY_Logotyp2.png"/>
        <li className="logo">AFRY Uppgift</li>
        <li className="logoMini">ÅF PÖVRY</li>
        </Link>
        
        <ul className="nav-links">

            <Link to="/CreatePerson" style={{ textDecoration: 'none' }}>
            <li className="navtext">Skapa Person</li>
            </Link>

            <Link to="/CreateCompany" style={{ textDecoration: 'none' }}>
            <li className="navtext">Skapa Företag</li>
            </Link>

            <Link to="/Unemployed" style={{ textDecoration: 'none' }}>
            <li className="navtext" >Anställningsbara Personer</li>
            </Link>

        </ul>
    </nav>
  );
}

export default Nav;