import React from 'react';
import DocumentItem from "../DocumentItem/DocumentItem";
import './document-details.css'


const DocumentDetails = ({data}) => {
    return (
        <>
            <div className={'document-details-title'}>Детали:</div>
            <div className={'document-details-container'}>
                {data.map((item, idx) => (<DocumentItem key={idx} item={item}/>))}
            </div>
        </>
    );
};

export default DocumentDetails;