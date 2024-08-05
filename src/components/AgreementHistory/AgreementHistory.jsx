import React from 'react';
import AgreementHistoryItem from "../AgreementHistoryItem/AgreementHistoryItem";
import './agreement-history.css'


const AgreementHistory = ({data}) => {
    return (
        <>
            <div className={'document-details-title'}>Детали:</div>
            <div className={'document-details-container'}>
                {data.map((item, idx) => (<AgreementHistoryItem key={idx} item={item}/>))}
            </div>
        </>
    );
};

export default AgreementHistory;