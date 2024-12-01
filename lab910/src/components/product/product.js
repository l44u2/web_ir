import React from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const Product = ({ product }) => {
    return (
        <div className="product__card">
            <img src={product.image} alt={product.name} className="product__image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <Link to={`/item/${product.id}`} className="primary-button">
                View More
            </Link>
        </div>
    );
};

export default Product;