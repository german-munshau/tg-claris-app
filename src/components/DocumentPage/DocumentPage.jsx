import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import TextField from "../TextField/TextField";
// import AgreementHistory from "../AgreementHistory/AgreementHistory";
import ButtonPanel from "../ButtonPanel/ButtonPanel";
import DocumentPositions from "../DocumentPositions/DocumentPositions";
import './document-page.css'

//
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
//     {
//         id: 50548840040012,
//         "assetText": "Петля универсальная неразъемная 40х50 мм оцинкованная",
//         "positionsCount": 4.00,
//         "price": 31.00,
//         "amount": 103.33,
//     },
//     {
//         id: 50548840040002,
//         "assetText": "Доставка",
//         "positionsCount": 1.00,
//         "price": 1719.00,
//         "amount": 1432.50,
//     },
//     {
//         id: 50548735990002,
//         "assetText": "Угловая проушина СИБРТЕХ, 2 мм 70х30 мм цинк 46506",
//         "positionsCount": 4.00,
//         "price": 18.00,
//         "amount": 60.00,
//     },
//     {
//         id: 50548738840002,
//         "assetText": "Навесной замок с ключом Gigant GPLK-57",
//         "positionsCount": 2.00,
//         "price": 452.00,
//         "amount": 753.33,
//     },
//     {
//         id: 50548740510002,
//         "assetText": "Колесная опора поворотная, колесо ?125 мм - черная резина",
//         "positionsCount": 8.00,
//         "price": 671.00,
//         "amount": 4473.33,
//     },
//     {
//         id: 50548754740002,
//         "assetText": "Саморезы ГД 35x3,5 мм усиленные Hard-Fix (150 шт.)",
//         "positionsCount": 1.00,
//         "price": 180.00,
//         "amount": 150.00,
//     },
//     {
//         id: 50548840040011,
//         "assetText": "Петля универсальная неразъемная 40х50 мм оцинкованная",
//         "positionsCount": 4.00,
//         "price": 31.00,
//         "amount": 103.33,
//     },
//     {
//         id: 50548840040001,
//         "assetText": "Доставка",
//         "positionsCount": 1.00,
//         "price": 1719.00,
//         "amount": 1432.50,
//     },
//     {
//         id: 50548735990001,
//         "assetText": "Угловая проушина СИБРТЕХ, 2 мм 70х30 мм цинк 46506",
//         "positionsCount": 4.00,
//         "price": 18.00,
//         "amount": 60.00,
//     },
//     {
//         id: 50548738840001,
//         "assetText": "Навесной замок с ключом Gigant GPLK-57",
//         "positionsCount": 2.00,
//         "price": 452.00,
//         "amount": 753.33,
//     },
//     {
//         id: 50548740510001,
//         "assetText": "Колесная опора поворотная, колесо ?125 мм - черная резина",
//         "positionsCount": 8.00,
//         "price": 671.00,
//         "amount": 4473.33,
//     },
//     {
//         id: 50548754740001,
//         "assetText": "Саморезы ГД 35x3,5 мм усиленные Hard-Fix (150 шт.)",
//         "positionsCount": 1.00,
//         "price": 180.00,
//         "amount": 150.00,
//     },
// ]


const DocumentPage = () => {

    const {search} = useLocation();
    let {id} = useParams()

    const [document, setDocument] = useState(null)
    const [positions, setPositions] = useState([])
    // const [agreementHistory, setAgreementHistory] = useState([])
    const [loading, setLoading] = useState(false)

    const {onClose} = useTelegram();


    console.log(id,search)
    console.log(`https://tg.gm-cloud.ru/documents/${id}${search}`)


    useEffect(() => {
        // запрос в бота для получения данных по документу
        (async () => {
            if (id) {
                setLoading(true)
                // загрузка шапки документа
                const doc = await fetch(`https://tg.gm-cloud.ru/documents/${id}${search}`)
                const docJson = await doc.json()
                setDocument(docJson)

                //загрузка позиций документа
                const docPositions = await fetch(`https://tg.gm-cloud.ru/documentPositions/${id}${search}`)
                const docPositionsJson = await docPositions.json()
                setPositions(docPositionsJson)

                // //загрузка истории согласования
                // const docAgreementHistory = await fetch(`https://tg.gm-cloud.ru/agreementHistory/${id}${search}`)
                // const docAgreementHistoryJson = await docAgreementHistory.json()
                // setAgreementHistory(docAgreementHistoryJson)
                setLoading(false)
            }
        })()

    }, [id, search])

    const onAgreeHandle = async () => {
        await fetch(`https://tg.gm-cloud.ru/document/${id}/agree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: 'telegram agree'})
        })
        onClose()
    }
    const onDisagreeHandle = async () => {
        await fetch(`https://tg.gm-cloud.ru/document/${id}/disagree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({comment: 'telegram disagree'})
        })
        onClose()
    }


    const renderData = (document) => {

        if (Object.keys(document).length === 0) {
            return (
                <div className={"center document-not-found"}>Не найден</div>
            )
        } else if (document.message) {
            return (
                <div className={"center document-not-found"}>Необходима авторизация /start</div>
            )
        } else
            return (
                <div className={"document-page-container"}>
                    <div>
                        <TextField label={'Категория'} text={document?.category?.name}/>
                        <TextField label={'Компания'} text={document?.company?.name}/>
                        <TextField label={'Автор'} text={document?.author?.name}/>
                        <TextField label={'Ответственный'} text={document?.responsible?.name}/>
                        <TextField label={'Содержание'} text={document?.content}/>
                        <TextField label={'Статус документа'} text={document?.state?.name}/>
                        <TextField label={'Статус согласования'} text={document?.agreementState?.name}/>
                    </div>
                    <DocumentPositions data={positions}/>
                    {/*<AgreementHistory data={agreementHistory}/>*/}
                    <ButtonPanel agree={onAgreeHandle} disagree={onDisagreeHandle}/>
                </div>
            )
    }

    return (
        <>
            {/*{loading ? renderData(document) : <div className="center loader"></div>}*/}
            {!loading ? renderData(document) : <div className="center loader"></div>}
        </>
    );
};

export default DocumentPage;