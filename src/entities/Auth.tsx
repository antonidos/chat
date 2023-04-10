import Link from 'next/link';
import React from 'react';

const Auth = () => {
    return (
        <div className="container">
            <div className="auth flex align-center">
                <h1>Авторизация</h1>
                <h3>Введите логин</h3>
                <input className='inputlogin'></input>
                <h3>Введите пароль</h3>
                <input className='inputlogin'></input>
                <Link href='/'><button className='buttonLogin'>Войти</button></Link>
            </div>
        </div>
    );
};

export default Auth;