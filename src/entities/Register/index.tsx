import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setIsLoggedIn } from 'entities/slices/user/userSlice';
import { register } from './api/apiRegister';
import { getUserInfo } from 'entities/PersonalInfo/api/personalDataApi';

const Register = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [state, setState] = useState({
        email: "",
        username: "",
        password: ""
    })

    const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [name]: value })
        console.log(state)
    }

    const handleSubmit = async (e: MouseEvent) => {
        const isDisabled = !(!!state.username?.length && !!state.password?.length);
        console.log(isDisabled)

        if (!isDisabled) {
            const response = await register(state.username, state.password, state.email)
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
                <h1 className='font-extrabold'>Регистрация</h1>
                <h3>Введите почту</h3>
                <input name='email' onChange={handleChange}
                    className='inputlogin w-3/5 mb-3 border-2 border-border dark:bg-slate-400 dark:border-slate-900 dark:text-slate-900'></input>
                <h3>Введите логин</h3>
                <input name='username' onChange={handleChange}
                    className='inputlogin w-3/5 mb-3 border-2 border-border dark:bg-slate-400 dark:border-slate-900 dark:text-slate-900'></input>
                <h3>Введите пароль</h3>
                <input type='password' name='password' onChange={handleChange}
                    className='inputlogin w-3/5 mb-3 border-2 border-border dark:bg-slate-400 dark:border-slate-900 dark:text-slate-900'></input>
                <button
                    onClick={handleSubmit}
                    disabled={!(state.email && state.password && state.username)}
                    className='buttonLogin bg-primary dark:bg-slate-900'
                >
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
};

export default Register;