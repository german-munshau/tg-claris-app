import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import SearchDocumentView from "../../components/SearchView/SearchDocumentView";
import Button from "../../components/Button/Button";
import {BOT_SERVER_URL} from "../../config";
import './search-page.css';



const SearchPage = () => {
    const {tg, user} = useTelegram()
    const [number, setNumber] = useState('')
    const [document, setDocument] = useState(null)
    const [positions, setPositions] = useState([])
    const [agreementHistory, setAgreementHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const onSendData = useCallback(async () => {
        setLoading(true)
        setError(null)
        // загрузка документа
        try {
            const response = await fetch(`${BOT_SERVER_URL}/documents?serialNumber=${number}&chat_id=${user.id}`)
            const data = await response.json()

            if (response.status === 200) {
                //загрузка позиций документа
                const docPositions = await fetch(`${BOT_SERVER_URL}/documentPositions/${data.id}?chat_id=${user.id}`)
                const docPositionsJson = await docPositions.json()

                // //загрузка истории согласования
                const docAgreementHistory = await fetch(`${BOT_SERVER_URL}/agreementHistory/${data.id}?chat_id=${user.id}`)
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
    }, [tg, tg.MainButton])

    useEffect(() => {
        if (number === '' || (error?.status === 401) || document) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [number, tg.MainButton, error, document])

    const onChangeNumber = (e) => {
        setNumber(e.target.value)
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSendLocalData().then()
        }
    }

    const onSendLocalData = async () => {
        setLoading(true)
        setError(null)
        // загрузка документа
        try {
            const response = await fetch(`${BOT_SERVER_URL}/documents?serialNumber=${number}&chat_id=311462440`)
            const data = await response.json()
            if (response.status === 200) {
                //загрузка позиций документа
                const docPositions = await fetch(`${BOT_SERVER_URL}/documentPositions/${data.id}?chat_id=311462440`)
                const docPositionsJson = await docPositions.json()

                // //загрузка истории согласования
                const docAgreementHistory = await fetch(`${BOT_SERVER_URL}/agreementHistory/${data.id}?chat_id=311462440`)
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

    const renderData = (document) => {
        return (
            <div className={"document-page-container"}>
                <SearchDocumentView
                    document={document}
                    positions={positions}
                    agreementHistory={agreementHistory}
                />
            </div>
        )
    }

    const renderError = (error) => {
        if (error.status === 401) {
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
            {!loading && !document &&
                <div className={'form'}>
                    <h3>Поиск</h3>
                    <input
                        type={'text'}
                        placeholder={'Введите номер документа'}
                        value={number}
                        onChange={onChangeNumber}
                        onKeyDown={onKeyPress}
                    />
                </div>
            }
            {loading && <div className="center loader"></div>}
            {!loading && document && !error && renderData(document)}
            {error && renderError(error)}
        </>
    )
};

export default SearchPage;