import React from 'react';
import logo from '../assets/logo.png';
import facebook from '../assets/facebook.svg';
import twitter from '../assets/twitter.svg';
import linkedin from '../assets/linkedin.svg';

const Footer = () => {
    return (
        <footer className="footer__component">
            <div className="footer__upper">
                <div className="footer__text">
                    <h3 className="footer__heading">Hilton Hotels</h3>
                    <p className="footer__paragraph">Experience world-class hospitality at our hotels and resorts worldwide.</p>
                </div>
                <img src={logo} alt="footerlogo" className="footer__social" />
                <ul className="footer__socials">
                    <li className="footer__social"><a href="https://www.facebook.com/"><img src={facebook} alt="footersocial" className="footer__social1" /></a></li>
                    <li className="footer__social"><a href="https://www.twitter.com/"><img src={twitter} alt="footersocial" className="footer__social1tw" /></a></li>
                    <li className="footer__social"><a href="https://www.linkedin.com/"><img src={linkedin} alt="footersocial" className="footer__social1" /></a></li>
                </ul>
            </div>
            <div className="footer__lower">
                <h4>2024 Definetly Hilton @ Copyright</h4>
            </div>
        </footer>
    );
};

export default Footer;
