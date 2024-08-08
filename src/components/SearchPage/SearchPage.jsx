import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import './search-page.css';

const SearchPage = () => {
    const [number, setNumber] = useState('')
    const {tg, user} = useTelegram()

    const onSendData = useCallback(async () => {

        let response =
            await fetch(`https://tg.gm-cloud.ru/documents?autoNumber=${number}&chatId=${user.id}`, {
                method: 'GET', headers: {'Content-Type': 'application/json'},
            })
// 1337
        if (response.ok) {
            let json = response.json()
            alert(json)
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


    return (<div className={'form'}>
            <h3>Поиск</h3>
            <input className={'input'}
                   type={'text'}
                   placeholder={'Введите номер'}
                   value={number}
                   onChange={onChangeNumber}
            />
        </div>
    )
};

export default SearchPage;