import React from 'react';

const PrimaryButton = ({ children, onClick }) => {
    return (
        <button className="primary-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default PrimaryButton;
