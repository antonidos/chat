import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { login } from './api/apiLogin';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from 'entities/slices/user/userSlice';
import { getUserInfo } from 'entities/PersonalInfo/api/personalDataApi';

const Auth = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()

    const handleCnahge = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
        if (name === 'username') setUsername(value)
        if (name === 'password') setPassword(value)
    }

    const handleSubmit = async (e: MouseEvent) => {
        const isDisabled = !(!!username?.length && !!password?.length);
        console.log(isDisabled)

        if (!isDisabled) {
            const response = await login(username, password)
            // dispatch(setPersonalInfo((await getUserInfo(localStorage.getItem('userToken'))) || false))
            if (response) {
                dispatch(setIsLoggedIn(true))
                router.push('/')
            }
        } else e.preventDefault();
    }

    useEffect(() => {
        async function getData() {
            if (localStorage.getItem('userToken')) {
                if (await getUserInfo(localStorage.getItem('userToken') as string)) {
                    alert("Вы уже авторизованы")
                    dispatch(setIsLoggedIn(true))
                    router.push('/')
                }
            } else {
                dispatch(setIsLoggedIn(false))
            }
        }

        getData()
    }, [])

    return (
        <div className="container">
            <div className="auth flex items-center w-3/5 flex-col mx-auto border-4 border-border rounded-xl 
            mt-5 bg-second box-border p-5 dark:bg-slate-600 dark:border-slate-700 dark:text-orange-200">
                <h1 className='font-extrabold'>Авторизация</h1>
                <h3>Введите логин</h3>
                <input name='username' onChange={handleCnahge}
                    className='inputlogin w-3/5 mb-3 border-2 border-border dark:bg-slate-400 dark:border-slate-900 dark:text-slate-900'></input>
                <h3>Введите пароль</h3>
                <input type='password' name='password' onChange={handleCnahge}
                    className='inputlogin w-3/5 mb-3 border-2 border-border dark:bg-slate-400 dark:border-slate-900 dark:text-slate-900'></input>
                <button
                    disabled={!username || !password}
                    onClick={handleSubmit}
                    className='buttonLogin bg-primary dark:bg-slate-900'
                >
                    Войти
                </button>
                <p>Нет аккаунта? <Link className='text-orange-200 dark:underline' href='/registration'>зарегистрироваться</Link></p>
            </div>
        </div>
    );
};

export default Auth;