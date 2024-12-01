import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from './primarybutton';

const Product = ({ product }) => {
    return (
        <div className="product__card">
            <img src={product.image} alt={product.name} className="product__image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <PrimaryButton>
                <Link to={`/item/${product.id}`}>View More</Link>
            </PrimaryButton>
        </div>
    );
};

export default Product;
