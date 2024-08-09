import React from 'react';
import AgreementHistoryItem from "../AgreementHistoryItem/AgreementHistoryItem";
import './agreement-history.css'


const AgreementHistory = ({data}) => {
    return (
        <>
            <div className={'document-details-title'}>История согласования:</div>
            <div className={'document-details-container'}>
                <table>
                    {data.map((item, idx) => (<AgreementHistoryItem key={idx} item={item}/>))}
                </table>
            </div>
        </>
    );
};

export default AgreementHistory;