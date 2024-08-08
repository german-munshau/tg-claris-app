import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './search-page.css';

const SearchPage = () => {
    const [number, setNumber] = useState('')
    const [document, setDocument] = useState()
    const {tg, user} = useTelegram()

    const onSendData = useCallback(async () => {
        let response = await fetch(`https://tg.gm-cloud.ru/documents?autonumber=${number}&chat_id=${user.id}`)
// 1337
        if (response.ok) {
            let json = await response.json()
            setDocument(json[0])
        } else {
            alert('Error' + response.status)
        }

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

    const onChangeNumber = (e) => {
        setNumber(e.target.value)
    }

    useEffect(() => {
        if (!number) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [number, tg.MainButton])


    return (
        <>
            {document ?
                <div>document.id</div>

                :
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
        </>
    )
};

export default SearchPage;