import React from 'react';
import DocumentPositions from "../DocumentPositions/DocumentPositions";
import AgreementHistory from "../AgreementHistory/AgreementHistory";
import Document from "../Document/Document";
import './document-view.css'

const DocumentView = ({document, positions, agreementHistory}) => {
    return (
        <div>
            <Document data={document}/>
            <DocumentPositions data={positions}/>
            <AgreementHistory data={agreementHistory}/>
        </div>
    );
};

export default DocumentView;