import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

const DocumentPage = () => {
    const [number, setNumber] = useState(null)
    const location = useLocation();

    const getDocumentNumber = (path) => {
        return path.split('/')[2]
    }

    useEffect(() => {
        setNumber(getDocumentNumber(location.pathname))
    }, [location.pathname])

    return (
        <div>
            Document № {number}
        </div>
    );
};

export default DocumentPage;