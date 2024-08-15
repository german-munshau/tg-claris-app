import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import DocumentView from "../../components/DocumentView/DocumentView";
import {BOT_SERVER_URL} from "../../config";
import './search-page.css';


const SearchPage = () => {
    const {tg, user} = useTelegram()
    const [number, setNumber] = useState('')
    const [document, setDocument] = useState(null)
    const [positions, setPositions] = useState([])
    const [agreementHistory, setAgreementHistory] = useState([])
    const [loading, setLoading] = useState(false)

    const onSendData = useCallback(async () => {
        setLoading(true)
        // загрузка документа
        const docs = await fetch(`${BOT_SERVER_URL}/documents?serialNumber=${number}&chat_id=${user.id}`)
        let docsJson = await docs.json()

        if (docs.status === 200) {
            // если есть положительный результат
            if (docsJson.length > 0) {
                const doc = docsJson[0]
                const docId = doc?.id

                //загрузка позиций документа
                const docPositions = await fetch(`${BOT_SERVER_URL}/documentPositions/${docId}?chat_id=${user.id}`)
                const docPositionsJson = await docPositions.json()

                // //загрузка истории согласования
                const docAgreementHistory = await fetch(`${BOT_SERVER_URL}/agreementHistory/${docId}?chat_id=${user.id}`)
                const docAgreementHistoryJson = await docAgreementHistory.json()

                setAgreementHistory(docAgreementHistoryJson)
                setPositions(docPositionsJson)
                setDocument(doc)
            }
        }

        setLoading(false)
    }, [number, user])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Поиск'
        })
    }, [tg.MainButton])

    useEffect(() => {
        if (!number || document) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [number, tg.MainButton, document])

    const onChangeNumber = (e) => {
        setNumber(e.target.value)
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
                    <DocumentView
                        document={document}
                        positions={positions}
                        agreementHistory={agreementHistory}
                    />
                </div>
            )
    }

    return (
        <>
            {!loading && !document &&
                <div className={'form'}>
                    <h3>Поиск</h3>
                    <input className={'input'}
                           type={'text'}
                           placeholder={'Введите номер'}
                           value={number}
                           onChange={onChangeNumber}
                    />
                </div>
            }
            {loading && <div className="center loader"></div>}
            {!loading && document && renderData(document)}
        </>
    )
};

export default SearchPage;