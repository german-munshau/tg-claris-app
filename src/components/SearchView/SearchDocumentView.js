import React from 'react';
import AgreementHistory from "../AgreementHistory/AgreementHistory";
import SearchDocumentPositions from "../SearchDocumentPositions/SearchDocumentPositions";
import SearchDocument from "../SearchDocument/SearchDocument";

const SearchDocumentView = ({document, positions, agreementHistory}) => {
    return (
        <>
            <SearchDocument data={document}/>
            <SearchDocumentPositions data={positions}/>
            <AgreementHistory data={agreementHistory}/>
        </>
    );
};

export default SearchDocumentView;