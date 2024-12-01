import React from 'react';

const Select = ({ name, options, onChange }) => {
    return (
        <select name={name} className="select" onChange={onChange}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
