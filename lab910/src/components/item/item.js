import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getItemById } from '../../api/api';
import { addToCart } from '../action/action';
import Loader from '../loader/loader';
import PrimaryButton from '../primarybutton/primarybutton';
import './item.css';

const Item = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [days, setDays] = useState(1); 
    const [food, setFood] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchItem = async () => {
            setLoading(true);
            try {
                const response = await getItemById(id);
                const fetchedItem = response.data;
                setItem(fetchedItem);
                setDays(fetchedItem.days || 1); 
            } catch (error) {
                console.error('Error fetching item:', error);
            }
            setLoading(false);
        };
        fetchItem();
    }, [id]);

    const handleAddToCart = () => {
        if (days < 1) {
            alert('Please enter at least 1 day of staying.');
            return;
        }
        if (!food) {
            alert('Please select a food option.');
            return;
        }
        const itemToAdd = {
            ...item,
            days,
            food,
        };
        dispatch(addToCart(itemToAdd));
        navigate('/catalog');
    };

    if (loading) {
        return <Loader />;
    }

    if (!item) {
        return <div>Item not found</div>;
    }

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
                        <input
                            type="number"
                            min="1"
                            value={days}
                            onChange={e => setDays(Number(e.target.value))}
                        />
                    </div>
                    <div className="item__field">
                        <label>Food Option: </label>
                        <select value={food} onChange={e => setFood(e.target.value)} required>
                            <option value="" disabled>Select Food Option</option>
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