import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import TextField from "../TextField/TextField";
import './document-page.css'
import DocumentItem from "../DocumentItem/DocumentItem";

//
// const doc = {
//     number: 123456,
//     autoNumber: 2,
//     serialNumber: 4,
//     state: {name: 'На согласовании'},
//     agreementState: {name: 'возвращено Инициатору'},
//     category: {name: 'Письмо'},
//     company: {name: 'АльтСофт'},
//     author: {name: 'Хоруженко Елена'},
//     responsible: {name: 'Хоруженко Елена'},
//     content: 'тест согласования'
// }






const DocumentPage = () => {
    const [number, setNumber] = useState(null)
    const [document, setDocument] = useState(null)
    const [details, setDetails] = useState([])
    const location = useLocation();

    const getDocumentNumber = (path) => {
        return path.split('/')[2]
    }

    useEffect(() => {
        setNumber(getDocumentNumber(location.pathname))
    }, [location.pathname])


    useEffect(() => {
        // запрос в бота для получения данных по документу

        (async () => {

            if (number) {
                // загрузка шапки документа
                const doc = await fetch(`https://tg.gm-cloud.ru/document/${number}`)
                const docJson = await doc.json()
                setDocument(docJson)

                //загрузка деталей документа
                const docDetails = await fetch(`https://tg.gm-cloud.ru/documentDetails/${number}`)
                const docDetailsJson = await docDetails.json()
                setDetails(docDetailsJson)

            }
        })()

    }, [number])


    return (
        <div className={"document-page-container"}>
            <TextField label={'Документ'} text={number}/>
            <TextField label={'Автономер'} text={document?.autoNumber}/>
            <TextField label={'Серийный номер'} text={document?.serialNumber}/>
            <TextField label={'Статус документа'} text={document?.state?.name}/>
            <TextField label={'Статус согласования'} text={document?.agreementState?.name}/>
            <TextField label={'Категория'} text={document?.category?.name}/>
            <TextField label={'Компания'} text={document?.company?.name}/>
            <TextField label={'Автор'} text={document?.author?.name}/>
            <TextField label={'Ответственный'} text={document?.responsible?.name}/>
            <TextField label={'Содержание'} text={document?.content}/>
            <hr/>
            <span>Детали:</span>

            {details.map(item => <DocumentItem item={item}/>)}
        </div>
    );
};

export default DocumentPage;