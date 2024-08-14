import React from 'react';
import "./text-field.css"

const TextField = ({label, text, className}) => {
    return (
        <div className={'text-field'}>
            {label}: <span className={className}>{text}</span>
        </div>
    );
};

export default TextField;