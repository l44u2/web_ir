import React, { useState, useEffect } from 'react';
import { getItems } from '../../api/api'; 
import Loader from '../loader/loader';
import './card.css';

const Card = () => {
    const [items, setItems] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await getItems(); 
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
            setLoading(false);
        };

        fetchItems();
    }, []);

    const firstRow = items.slice(0, 3);
    const secondRow = items.slice(3);

    if (loading) {
        return <Loader />;
    }

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
                    {showMore ? 'Show Less' : 'View More'}
                </button>
            </div>
        </div>
    );
};

export default Card;