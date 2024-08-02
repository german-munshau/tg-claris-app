import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import TextField from "../TextField/TextField";
import DocumentDetails from "../DocumentDetails/DocumentDetails";
import ButtonPanel from "../ButtonPanel/ButtonPanel";
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
// const details = [
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
            <div>
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
            </div>
            <DocumentDetails data={details}/>

            <ButtonPanel/>
        </div>


        // <div className="container">
        //
        //     <div className="box-container">
        //         <div className="box-header">This is static HEADER</div>
        //         <div className="box-main"><b>This is main content with dynamic char. </b> Lorem ipsum dolor sit amet,
        //             consectetur adipisicing elit. Dolorem aliquid autem alias iste error quasi porro vitae.
        //         </div>
        //         <div className="box-footer">This is static FOOTER</div>
        //     </div>
        //
        //     <div className="box-container">
        //         <div className="box-header">This is static HEADER</div>
        //         <div className="box-main"><b>This is main content with dynamic char. </b> Lorem ipsum dolor sit amet,
        //             consectetur adipisicing elit. Eius saepe ratione, expedita commodi, explicabo harum laborum quos quam
        //             dolorem fugit perferendis rerum magni ducimus itaque quis officia tenetur
        //             cum. Doloremque magni ad illo libero minima maiores cumque, eius expedita quibusdam vero, ea dolore
        //             aliquid fuga porro sapiente explicabo molestiae. Et?
        //         </div>
        //         <div className="box-footer">This is static FOOTER</div>
        //     </div>
        //
        //     <div className="box-container">
        //         <div className="box-header">This is static HEADER</div>
        //         <div className="box-main"><b>This is main content with dynamic char. </b> Lorem ipsum dolor sit amet,
        //             consectetur adipisicing elit. Soluta veritatis vel, perspiciatis sequi dolores dicta debitis, earum
        //             dolore placeat repudiandae illo aspernatur eum illum provident culpa iusto
        //             ducimus maxime odit.
        //         </div>
        //         <div className="box-footer">This is static FOOTER</div>
        //     </div>
        //
        // </div>
    );
};

export default DocumentPage;