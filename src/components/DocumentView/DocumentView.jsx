import React from 'react';
import DocumentPositions from "../DocumentPositions/DocumentPositions";
import AgreementHistory from "../AgreementHistory/AgreementHistory";
import Document from "../Document/Document";

const DocumentView = ({document, positions, agreementHistory}) => {
    return (
        <>
            <Document data={document}/>
            <DocumentPositions data={positions}/>
            <AgreementHistory data={agreementHistory}/>
        </>
    );
};

export default DocumentView;