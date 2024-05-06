import React from 'react';

const RadioBoxComponent = ({label, options, name}) => {
    return (<div
            className={"input-component"}
        >
            <label>{label} :</label>
            {options.map((option) => (<div key={option.value}>
                    <input
                        type="radio"
                        id={option.value}
                        name={name}
                        value={option.value}
                        style={{
                            margin: '0 10px'
                        }}
                    />
                    <label htmlFor={option.value}>{option.label}</label>
                </div>))}
        </div>);
};

export default RadioBoxComponent;
