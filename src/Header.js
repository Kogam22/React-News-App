import React from 'react';
import './Header.css';

function Header() {
    return (
        <div className="Header">
            <ul>
                <li className="Navbar-Item"><a href="/">React News App</a></li>
                <li className="Navbar-Item"><a href="/">Category</a></li>
                <li className="Navbar-Item"><a href="/">Country</a></li>
                <li className="Navbar-Item"><a href="/">Language</a></li>
            </ul>
        </div>
    );
}

export default Header;