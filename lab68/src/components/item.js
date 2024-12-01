import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ItemContext } from './itemcontext';
import PrimaryButton from './primarybutton';

const Item = () => {
    const { id } = useParams();
    const { items, setItems } = useContext(ItemContext);
    const item = items.find(item => item.id === parseInt(id));
    const [days, setDays] = useState(item.days);
    const [food, setFood] = useState(item.food);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        setItems(prevItems => 
            prevItems.map(i => 
                i.id === item.id ? { ...i, days, food } : i
            )
        );
        navigate('/catalog');
    };

    return (
        <div className="item__component">
            <img src={item.image} alt={item.name} className="item__image" />
            <div className="item__details">
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Max Visitors: {item.visitors}</p>
                <p>No of Rooms: {item.rooms}</p>
                <div className="item__count">
                    <div className="item__field">
                        <label>Days of Staying: </label>
                        <input type="number" value={days} onChange={e => setDays(e.target.value)} />
                    </div>
                    <div className="item__field">
                        <label>Food Option: </label>
                        <select value={food} onChange={e => setFood(e.target.value)}>
                            <option value="">Select</option>
                            <option value="No food">No food</option>
                            <option value="Breakfast only">Breakfast only</option>
                            <option value="All inclusive">All inclusive</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="item__actions">
                <h1>Price: {item.price}</h1>
                <div className="item__adb">
                    <PrimaryButton onClick={handleAddToCart}>Add to Cart</PrimaryButton>
                    <PrimaryButton onClick={() => navigate(-1)}>Go Back</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Item;
