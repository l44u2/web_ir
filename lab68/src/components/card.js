import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ItemContext } from './itemcontext';

const Card = () => {
    const { items } = useContext(ItemContext);
    const [showMore, setShowMore] = useState(false);

    const firstRow = items.slice(0, 3);
    const secondRow = items.slice(3);

    return (
        <div className="card__component">
            <div className="card__list">
                {firstRow.map(item => (
                    <div key={item.id} className="card__card">
                        <img src={item.image} alt="cardimg" className="card__image" />
                        <h3 className="card__heading">{item.name}</h3>
                        <p className="card__paragraph">{item.description}</p>
                    </div>
                ))}
            </div>
            {showMore && (
                <div className="card__list">
                    {secondRow.map(item => (
                        <div key={item.id} className="card__card">
                            <img src={item.image} alt="cardimg" className="card__image" />
                            <h3 className="card__heading">{item.name}</h3>
                            <p className="card__paragraph">{item.description}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className="card__button">
                <button onClick={() => setShowMore(!showMore)} className="primary-button">
                    {showMore ? "Show Less" : "View More"}
                </button>
            </div>
        </div>
    );
};

export default Card;
