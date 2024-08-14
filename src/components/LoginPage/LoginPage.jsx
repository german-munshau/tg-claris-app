import React, {useCallback, useEffect, useState} from 'react';
import {useTelegram} from "../../hooks/useTelegram";
import {useSearchParams} from "react-router-dom";
import './login-page.css';

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
        let response =
            await fetch('https://tg.gm-cloud.ru/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

        if (response.ok) {
            let json = response.json()
            alert(json)
        } else {
            alert('Error' + response.status)
        }

    }, [login, password, queryId, user, messageId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Вход'
        })
    }, [tg.MainButton])

    const onChangeLogin = (e) => {
        setLogin(e.target.value)
    }

    useEffect(() => {
        if (!login || !password) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [login, password, tg.MainButton])

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (<div className={'form'}>
            <h3>Вход в систему</h3>
            <input className={'input'}
                   type={'text'}
                   placeholder={'Логин'}
                   value={login}
                   onChange={onChangeLogin}
            />
            <input className={'input'}
                   type={'password'}
                   placeholder={'Пароль'}
                   value={password}
                   onChange={onChangePassword}
            />
        </div>
    )
};

export default LoginPage;