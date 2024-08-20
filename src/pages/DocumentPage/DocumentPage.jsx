import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import Button from "../../components/Button/Button";
import DocumentView from "../../components/DocumentView/DocumentView";
import {BOT_SERVER_URL} from "../../config";
import './document-page.css'


const DocumentPage = () => {
    let {id} = useParams()
    let [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const [document, setDocument] = useState(null)
    const [positions, setPositions] = useState([])
    const [agreementHistory, setAgreementHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatId, setChatId] = useState(null)
    const [messageId, setMessageId] = useState(null)
    const [error, setError] = useState(null)

    const {onClose} = useTelegram();

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

    const onAgreeHandle = async () => {
        await fetch(`${BOT_SERVER_URL}/documents/${id}/agree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: 'согласовано', chatId, messageId,
                number: document.serialNumber
            })
        })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                onClose()
            })
    }

    const onDisagreeHandle = async () => {
        await fetch(`${BOT_SERVER_URL}/documents/${id}/disagree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: 'отклонено', chatId, messageId,
                number: document.serialNumber
            })
        })
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                onClose()
            })
    }

    const renderData = (document) => {
        return (
            <div className={"document-page-container"}>
                <DocumentView
                    document={document}
                    positions={positions}
                    agreementHistory={agreementHistory}
                />
                <div className={'button-container'}>
                    <Button onClick={onAgreeHandle} label={"Согласовать"} className={"btn-agree"}/>
                    <Button onClick={onDisagreeHandle} label={"Отклонить"} className={"btn-disagree"}/>
                </div>
            </div>
        )
    }

    // const renderData = (document) => {
    //     if (Object.keys(document).length === 0) {
    //         return (
    //             <div className={"center document-not-found"}>Не найден</div>
    //         )
    //     } else if (document.message) {
    //         return (
    //             <div className={"center document-not-found"}>Необходима авторизация /start</div>
    //         )
    //     } else
    //         return (
    //             <div className={"document-page-container"}>
    //                 <DocumentView
    //                     document={document}
    //                     positions={positions}
    //                     agreementHistory={agreementHistory}
    //                 />
    //                 <div className={'button-container'}>
    //                     <Button onClick={onAgreeHandle} label={"Согласовать"} className={"btn-agree"}/>
    //                     <Button onClick={onDisagreeHandle} label={"Отклонить"} className={"btn-disagree"}/>
    //                 </div>
    //
    //             </div>
    //         )
    // }

    const renderError = (error) => {
        if (error.status === 403) {
            return (<div className={"auth-container"}>
                    <div className={"auth-message"}>{error.message}</div>
                    <Button label={"Перейти"} onClick={() => navigate('/login')}/>
                </div>
            )
        }
        return (
            <div className={"center document-not-found"}>{error.message}</div>
        )
    }

    return (
        <>
            {loading && <div className="center loader"></div>}
            {/*{document && renderData(document)}*/}
            {!loading && document && !error && renderData(document)}
            {error && renderError(error)}
        </>
    );
};

export default DocumentPage;