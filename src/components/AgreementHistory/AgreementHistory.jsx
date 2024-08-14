import React from 'react';
import AgreementHistoryItem from "../AgreementHistoryItem/AgreementHistoryItem";
import './agreement-history.css'


const AgreementHistory = ({data}) => {
    return (
        <>
            <div className={'document-details-title'}>История согласования:</div>
            <div className={'document-details-container'}>
                <div>
                    {data.map((item, idx) => (<AgreementHistoryItem key={idx} item={item}/>))}
                </div>
            </div>
        </>
    );
};

export default AgreementHistory;