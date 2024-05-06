import React from 'react';

const TextAreaComponent = ({ label, name, value, onChange }) => {
    return (
        <div>
            <label htmlFor={name}>{label} :</label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            ></textarea>
        </div>
    );
};

export default TextAreaComponent;
