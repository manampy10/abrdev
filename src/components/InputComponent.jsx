import React from 'react';
import "./styles.css"

const InputComponent = ({ label, type, name, value, onChange }) => {
    return (
        <div
            className="input-component"
        >
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputComponent;
