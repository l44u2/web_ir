import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../action/action';
import PrimaryButton from '../primarybutton/primarybutton';
import './cart.css';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    if (cartItems.length === 0) {
        return <div className="cart__empty">Your cart is empty.</div>;
    }

    return (
        <div className="cart__component">
            <h2>Your Shopping Cart</h2>
            <div className="cart__list">
                {cartItems.map(item => (
                    <div key={item.id} className="cart__card">
                        <img src={item.image} alt={item.name} className="cart__image" />
                        <div className="cart__content">
                            <h2 className="cart__title">{item.name}</h2>
                            <p className="cart__description">{item.description}</p>
                            <p className="cart__price">Price: {item.price}</p>
                            <p className="cart__quantity">Quantity: {item.quantity || 1}</p>
                            <p className="cart__details">Days: {item.days}</p>
                            <p className="cart__details">Food: {item.food}</p>
                        </div>
                        <div className="cart__button-container">
                            <PrimaryButton onClick={() => handleRemoveFromCart(item.id)}>
                                Remove
                            </PrimaryButton>
                        </div>
                    </div>
                ))}
            </div>
            <div className="cart__checkout">
                <PrimaryButton onClick={() => {/* Future functionality */}}>
                    Checkout
                </PrimaryButton>
            </div>
        </div>
    );
};

export default Cart;