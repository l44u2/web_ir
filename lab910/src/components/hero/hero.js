import React from 'react';
import example from '../../assets/hotel_3.jpg';
import './hero.css';


const Hero = () => {
    return (
        <div className="hero__component">
            <div className="hero__text">
                <h1 className="hero__heading">Hilton Hotel Inn NYC</h1>
                <p className="hero__paragraph">Located in the heart of New York City, Hilton Hotel Inn offers modern accommodations, exceptional service, and easy access to iconic landmarks like Times Square and Central Park. Enjoy top-tier amenities, including a fitness center, fine dining, and stylish rooms designed for comfort and convenience.</p>
            </div>
            <img src={example} alt="heroimg" className="hero__image" />
        </div>
    );
};

export default Hero;
