import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; 
import './header.css';

const Header = () => {
    return (
        <header className="header__component">
            <img src={logo} alt="logo" className="header__logo" />
            <nav className="header__navigation">
                <ul className="header__list">
                    <li className="header__nav"><Link to="/">Home</Link></li>
                    <li className="header__nav"><Link to="/catalog">Catalog</Link></li>
                    <li className="header__nav"><Link to="/cart">Cart</Link></li>
                </ul>
            </nav>
            <div></div>
        </header>
    );
};

export default Header;