import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import TextField from "../TextField/TextField";
// import AgreementHistory from "../AgreementHistory/AgreementHistory";
import ButtonPanel from "../ButtonPanel/ButtonPanel";
import DocumentPositions from "../DocumentPositions/DocumentPositions";
import './document-page.css'


// const document = {
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
// const agreementHistory = [
//     {
//         date: '2022-11-11T08:48:30+03:00',
//         agreed: 'Отклонено',
//         comment: 'не подходит формулировка',
//         author: {name: 'Польшаков Сергей'}
//     },
//     {
//         date: '2022-11-13T08:46:47+03:00',
//         agreed: 'Согласовано',
//         comment: 'не подходит fghfhg fggfhjghj формулировка',
//         author: {name: 'Пуцарь Виталий'}
//     },
//     {
//         date: '2022-11-12T08:48:30+03:00',
//         agreed: 'Отклонено',
//         comment: 'не подходит формулировка',
//         author: {name: 'Польшаков Сергей'}
//     },
//     {
//         date: '2022-11-11T08:48:30+03:00',
//         agreed: 'Отклонено',
//         comment: 'не подходит формулировка',
//         author: {name: 'Польшаков Сергей'}
//     },
//     {
//         date: '2022-11-13T08:46:47+03:00',
//         agreed: 'Согласовано',
//         comment: 'не подходит fghfhg fggfhjghj формулировка',
//         author: {name: 'Пуцарь Виталий'}
//     },
//     {
//         date: '2022-11-12T08:48:30+03:00',
//         agreed: 'Отклонено',
//         comment: 'не подходит формулировка',
//         author: {name: 'Польшаков Сергей'}
//     },
//     {
//         date: '2022-11-11T08:48:30+03:00',
//         agreed: 'Отклонено',
//         comment: 'не подходит формулировка',
//         author: {name: 'Польшаков Сергей'}
//     },
//     {
//         date: '2022-11-13T08:46:47+03:00',
//         agreed: 'Согласовано',
//         comment: 'не подходит fghfhg fggfhjghj формулировка',
//         author: {name: 'Пуцарь Виталий'}
//     },
//     {
//         date: '2022-11-12T08:48:30+03:00',
//         agreed: 'Отклонено',
//         comment: 'не подходит формулировка',
//         author: {name: 'Польшаков Сергей'}
//     },
// ]

// const positions = [
//     {
//         id: 5054884004001,
//         "assetText": "Петля универсальная неразъемная 40х50 мм оцинкованная",
//         "positionsCount": 4.00,
//         "price": 31.00,
//         "amount": 103.33,
//     },
//     {
//         id: 5054884004000,
//         "assetText": "Доставка",
//         "positionsCount": 1.00,
//         "price": 1719.00,
//         "amount": 1432.50,
//     },
//     {
//         id: 5054873599000,
//         "assetText": "Угловая проушина СИБРТЕХ, 2 мм 70х30 мм цинк 46506",
//         "positionsCount": 4.00,
//         "price": 18.00,
//         "amount": 60.00,
//     },
//     {
//         id: 5054873884000,
//         "assetText": "Навесной замок с ключом Gigant GPLK-57",
//         "positionsCount": 2.00,
//         "price": 452.00,
//         "amount": 753.33,
//     },
//     {
//         id: 5054874051000,
//         "assetText": "Колесная опора поворотная, колесо ?125 мм - черная резина",
//         "positionsCount": 8.00,
//         "price": 671.00,
//         "amount": 4473.33,
//     },
//     {
//         id: 5054875474000,
//         "assetText": "Саморезы ГД 35x3,5 мм усиленные Hard-Fix (150 шт.)",
//         "positionsCount": 1.00,
//         "price": 180.00,
//         "amount": 150.00,
//     },
// ]
//

const DocumentPage = () => {
    const [number, setNumber] = useState(null)
    const [document, setDocument] = useState(null)
    // const [agreementHistory, setAgreementHistory] = useState([])
    const [positions, setPositions] = useState([])
    const location = useLocation();
    const {onClose} = useTelegram();

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

                // //загрузка истории согласования
                // const docAgreementHistory = await fetch(`https://tg.gm-cloud.ru/agreementHistory/${number}`)
                // const docAgreementHistoryJson = await docAgreementHistory.json()
                // setAgreementHistory(docAgreementHistoryJson)

                //загрузка позиций документа
                const docPositions = await fetch(`https://tg.gm-cloud.ru/documentPositions/${number}`)
                const docPositionsJson = await docPositions.json()
                setPositions(docPositionsJson)
            }
        })()

    }, [number])

    const onAgreeHandle = async () => {
        await fetch(`https://tg.gm-cloud.ru/document/${number}/agree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: 'telegram agree'})
        })
        onClose()
    }
    const onDisagreeHandle = async () => {
        await fetch(`https://tg.gm-cloud.ru/document/${number}/disagree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: 'telegram disagree'})
        })
        onClose()
    }

    return (
        <div className={"document-page-container"}>
            <div>
                {/*<TextField label={'Документ'} text={number}/>*/}
                {/*<TextField label={'Автономер'} text={document?.autoNumber}/>*/}
                {/*<TextField label={'Серийный номер'} text={document?.serialNumber}/>*/}
                <TextField label={'Категория'} text={document?.category?.name}/>
                <TextField label={'Компания'} text={document?.company?.name}/>
                <TextField label={'Автор'} text={document?.author?.name}/>
                <TextField label={'Ответственный'} text={document?.responsible?.name}/>
                <TextField label={'Содержание'} text={document?.content}/>
                <TextField label={'Статус документа'} text={document?.state?.name}/>
                <TextField label={'Статус согласования'} text={document?.agreementState?.name}/>
            </div>
            {/*<AgreementHistory data={agreementHistory}/>*/}
            <DocumentPositions data={positions}/>

            <ButtonPanel agree={onAgreeHandle} disagree={onDisagreeHandle}/>
        </div>



    );
};

export default DocumentPage;