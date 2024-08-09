import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import TextField from "../TextField/TextField";
// import DocumentPositions from "../DocumentPositions/DocumentPositions";
import './search-page.css';

const SearchPage = () => {

    const {tg, user} = useTelegram()
    const [number, setNumber] = useState('')
    const [document, setDocument] = useState(null)
    // const [positions, setPositions] = useState([])
    const [loading, setLoading] = useState(false)

    // 1337
// последняя ошибка
    //{"message":"Не найдено инфо о пользователе в базе бота, необходима авторизация"}


    const onSendData = useCallback(async () => {

        setLoading(true)
        // загрузка документа
        const docs = await fetch(`https://tg.gm-cloud.ru/documents?autonumber=${number}&chat_id=${user.id}`)
        let docsJson = await docs.json()

        // если есть положительный результат
        if (docsJson.length > 0) {
            const doc = docsJson[0]
            // const docId = doc?.id

            //загрузка позиций документа
            // const docPositions = await fetch(`https://tg.gm-cloud.ru/documentPositions/${docId}&chat_id=${user.id}`)
            // const docPositionsJson = await docPositions.json()
            //
            // setPositions(docPositionsJson)
            setDocument(doc)
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
                    <div>
                        <TextField label={'Категория'} text={document?.category?.name}/>
                        <TextField label={'Компания'} text={document?.company?.name}/>
                        <TextField label={'Автор'} text={document?.author?.name}/>
                        <TextField label={'Ответственный'} text={document?.responsible?.name}/>
                        <TextField label={'Содержание'} text={document?.content}/>
                        <TextField label={'Статус документа'} text={document?.state?.name}/>
                        <TextField label={'Статус согласования'} text={document?.agreementState?.name}/>
                    </div>
                    {/*<DocumentPositions data={positions}/>*/}
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

            {JSON.stringify(document)}
            {/*{JSON.stringify(positions)}*/}
        </>
    )
};

export default SearchPage;