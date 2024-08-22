import React, {useCallback, useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {useTelegram} from "../../hooks/useTelegram";
import {BOT_SERVER_URL} from "../../config";


const LoginPage = () => {
    let [searchParams] = useSearchParams();
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const {tg, user, queryId} = useTelegram()
    const [messageId, setMessageId] = useState(null)

    useEffect(() => {
        const id = searchParams.get('messageId')
        setMessageId(id)
    }, [searchParams])


    const onSendData = useCallback(async () => {
        const data = {login, password, queryId, chatId: user.id, messageId}
        await fetch(`${BOT_SERVER_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }, [login, password, queryId, user, messageId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    useEffect(() => {
        // растянуть на веь экран
        tg.expand()

        tg.MainButton.setParams({
            text: 'Вход',
            is_visible: true,
        })
    }, [tg, tg.MainButton])

    const onChangeLogin = (e) => {
        setLogin(e.target.value)
    }

    useEffect(() => {
        if (!login || !password) {
            tg.MainButton.disable()
            tg.MainButton.setParams({
                color: '#cfcfcf'
            })
        } else {
            tg.MainButton.enable()
            tg.MainButton.setParams({
                // color: '#2cab37'
                color: 'var(--tg-theme-button-color)'
            })
        }
    }, [login, password, tg.MainButton, tg])

    // useEffect(() => {
    //     if (!login || !password) {
    //         tg.MainButton.hide()
    //     } else {
    //         tg.MainButton.show()
    //     }
    // }, [login, password, tg.MainButton])

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (<div className={'form'}>
            <h3>Вход в систему</h3>
            <input
                type={'text'}
                placeholder={'Логин'}
                value={login}
                onChange={onChangeLogin}
            />
            <input
                type={'password'}
                placeholder={'Пароль'}
                value={password}
                onChange={onChangePassword}
            />
        </div>
    )
};

export default LoginPage;