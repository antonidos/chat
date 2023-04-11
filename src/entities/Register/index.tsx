import React, { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setIsLoggedIn } from 'entities/slices/user/userSlice';

const Register = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        async function getData() {
            if (localStorage.getItem('userToken')) {
                alert("Вы уже авторизованы")
                dispatch(setIsLoggedIn(true))
                router.push('/')
            } else {
                dispatch(setIsLoggedIn(false))
            }
        }

        getData()
    }, [])

    return (
        <div className="container">
            <div className="auth flex align-center">
                <h1>Регистрация</h1>
                <h3>Введите почту</h3>
                <input className='inputlogin'></input>
                <h3>Введите логин</h3>
                <input className='inputlogin'></input>
                <h3>Введите пароль</h3>
                <input className='inputlogin'></input>
                <Link href='/'><button className='buttonLogin'>Зарегистрироваться</button></Link>
            </div>
        </div>
    );
};

export default Register;