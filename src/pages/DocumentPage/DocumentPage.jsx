import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Button from "../../components/Button/Button";
import DocumentView from "../../components/DocumentView/DocumentView";
import {BOT_SERVER_URL} from "../../config";
import './document-page.css'


const DocumentPage = () => {
    const {tg, onClose} = useTelegram()
    const {id} = useParams()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [document, setDocument] = useState(null)
    const [positions, setPositions] = useState([])
    const [agreementHistory, setAgreementHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatId, setChatId] = useState(null)
    const [messageId, setMessageId] = useState(null)
    const [error, setError] = useState(null)
    const [comment, setComment] = useState('')

    useEffect(() => {
        const chat_id = searchParams.get('chat_id')
        const message_id = searchParams.get('message_id')
        setChatId(chat_id)
        setMessageId(message_id)
    }, [searchParams])

    useEffect(() => {
        // запрос в бота для получения данных по документу
        (async () => {
            if (id && chatId) {
                setLoading(true)
                setError(null)
                // загрузка документа
                try {
                    // загрузка шапки документа
                    const response = await fetch(`${BOT_SERVER_URL}/documents/${id}?chat_id=${chatId}`)
                    const data = await response.json()

                    if (response.status === 200) {
                        //загрузка позиций документа
                        const docPositions = await fetch(`${BOT_SERVER_URL}/documentPositions/${id}?chat_id=${chatId}`)
                        const docPositionsJson = await docPositions.json()

                        // //загрузка истории согласования
                        const docAgreementHistory = await fetch(`${BOT_SERVER_URL}/agreementHistory/${id}?chat_id=${chatId}`)
                        const docAgreementHistoryJson = await docAgreementHistory.json()

                        setAgreementHistory(docAgreementHistoryJson)
                        setPositions(docPositionsJson)
                        setDocument(data)
                    } else {
                        setError({status: response.status, ...data})
                    }
                } catch (e) {
                    setError({status: e.status, message: e.errorMessage})
                }
                setLoading(false)
            }
        })()

    }, [id, chatId])

    const options = (number, comment) => {
        return {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({comment, chatId, messageId, number})
        }
    }

    const onAgreeHandle = async () => {
        const response = await fetch(`${BOT_SERVER_URL}/documents/${id}/agree`, options(document.serialNumber, comment || 'Согласовано'))
        if (response.status !== 200) {
            const data = await response.json()
            tg.showPopup({
                title: 'Согласование',
                message: data.message,
            })
        }
        onClose()
    }

    const onDisagreeHandle = async () => {
        const response = await fetch(`${BOT_SERVER_URL}/documents/${id}/disagree`, options(document.serialNumber, comment || 'Отклонено'))
        if (response.status !== 200) {
            const data = await response.json()
            tg.showPopup({
                title: 'Отклонение',
                message: data.message,
            })
            // tg.showPopup({
            //     title: 'Отклонение',
            //     message: JSON.stringify(data),
            // })
        }
        onClose()
    }


    const onChangeComment = (e) => {
        setComment(e.target.value)
    }
    // const onDisagreeHandle = async () => {
    //     await fetch(`${BOT_SERVER_URL}/documents/${id}/disagree`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             comment: 'отклонено', chatId, messageId,
    //             number: document.serialNumber
    //         })
    //     })
    //         .then((data) => {
    //             console.log(data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //         .finally(() => {
    //             onClose()
    //         })
    // }

    const renderData = (document) => {
        return (
            <div className={"document-page-container"}>
                <DocumentView
                    document={document}
                    positions={positions}
                    agreementHistory={agreementHistory}
                />
                <div className={"comment-container"}>
                    <input
                        type={'text'}
                        placeholder={'Введите комментарий'}
                        value={comment}
                        onChange={onChangeComment}
                    />
                </div>

                <div className={'button-container'}>
                    <Button onClick={onAgreeHandle} label={"Согласовать"} className={"btn-agree"}/>
                    <Button onClick={onDisagreeHandle} label={"Отклонить"} className={"btn-disagree"}/>
                </div>
            </div>
        )
    }

    const renderError = (error) => {
        if (error.status === 403) {
            return (<div className={"auth-container"}>
                    <div className={"auth-message"}>{error.message}</div>
                    <Button label={"Перейти"} onClick={() => navigate('/login')}/>
                </div>
            )
        }
        return (
            <div className={"center document-not-found"}>{error.status}:{error.message}</div>
        )
    }

    return (
        <>
            {loading && <div className="center loader"></div>}
            {!loading && document && !error && renderData(document)}
            {error && renderError(error)}
        </>
    );
};

export default DocumentPage;