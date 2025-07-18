import React from 'react';

const Input = ({ value, type = 'text', onChange, placeholder = '', className = '' }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-4 outline ${className}`}
        />
    );
};

export default Input;
