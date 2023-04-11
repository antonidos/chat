import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { login } from './api/apiLogin';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from 'entities/slices/user/userSlice';

const Auth = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()

    const handleCnahge = ({ target: { value, id } }: ChangeEvent<HTMLInputElement>) => {
        if (id === 'username') setUsername(value)
        if (id === 'password') setPassword(value)
    }

    const handleSubmit = async (e: MouseEvent) => {
        const isDisabled = !(!!username?.length && !!password?.length);
        console.log(isDisabled)
        
        if (!isDisabled) {
            await login(username, password)
            // dispatch(setPersonalInfo((await getUserInfo(localStorage.getItem('userToken'))) || false))
            dispatch(setIsLoggedIn(true))
            router.push('/')
        } else e.preventDefault();
    }

    async function getData() {
        if (localStorage.getItem('userToken')) {
            alert("Вы уже авторизованы")
            router.push('/')
        } else {
            dispatch(setIsLoggedIn(true))
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container">
            <div className="auth flex align-center">
                <h1>Авторизация</h1>
                <h3>Введите логин</h3>
                <input id='username' onChange={handleCnahge} className='inputlogin'></input>
                <h3>Введите пароль</h3>
                <input id='password' onChange={handleCnahge} className='inputlogin'></input>
                <button disabled={!username || !password} onClick={handleSubmit} className='buttonLogin'>Войти</button>
                <p>Нет аккаунта? <Link className='link' href='/registration'>зарегистрироваться</Link></p>
            </div>
        </div>
    );
};

export default Auth;