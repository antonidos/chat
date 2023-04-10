import React from 'react';
import Link from 'next/link';

const Register = () => {
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