import React from 'react';

const Input = ({ value, onChange, placeholder = '', className = '' }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-4 outline ${className}`}
        />
    );
};

export default Input;
