import React from 'react';
import "./text-field.css"

const TextField = ({label, text}) => {
    return (
        <div className={'text-field'}>
            <b>{label}:</b> <span>{text}</span>
        </div>
    );
};

export default TextField;