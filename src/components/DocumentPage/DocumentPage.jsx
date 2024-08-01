import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";

const DocumentPage = () => {
    const [number, setNumber] = useState(null)
    const [document, setDocument] = useState(null)
    const location = useLocation();

    const getDocumentNumber = (path) => {
        return path.split('/')[2]
    }

    useEffect(() => {
        setNumber(getDocumentNumber(location.pathname))
    }, [location.pathname])


    useEffect(() => {
        // запрос в бота для получения данных по документу
        if (number) {
            fetch(`https://tg.gm-cloud.ru/document/${number}`)
                .then(data => setDocument(data))
                .catch(e => console.log(e))
        }
    }, [number])


    return (
        <div>
            Document № {number}
            Data - {document}
        </div>
    );
};

export default DocumentPage;