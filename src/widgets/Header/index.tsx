import React, { useEffect } from 'react';
import Logo from 'shared/Logo';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setIsLoggedIn } from 'entities/slices/user/userSlice';
import { useRouter } from 'next/router';
import { logout } from './api/apiLogout';

const Header = () => {
    const isLoggedIn = useSelector(selectUser).isLoggedIn
    const dispatch = useDispatch()
    const router = useRouter()

    const handleClick = async () => {
        if(localStorage.getItem('userToken')) {
            await logout(localStorage.getItem('userToken') as string)
        }
        dispatch(setIsLoggedIn(false))
        router.push("/login")
    }


    async function getData() {
        if (!localStorage.getItem('userToken')) {
            router.push('/login')
        } else {
            dispatch(setIsLoggedIn(true))
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <header>
            <div className="container flex align-center space-between">
                <Logo />
                <div className="menu flex space-between">
                    {isLoggedIn ?
                        <>
                            <Link
                                href='/personal'
                                className="link"
                            >
                                <div>
                                    Личный кабинет
                                </div>
                            </Link>

                            <div onClick={handleClick} className="link">
                                Выйти
                            </div>

                        </>
                        : <>
                            <Link
                                href='/login'
                                className="link"
                            >
                                <div>
                                    Авторизация
                                </div>
                            </Link>
                            <Link
                                href='/registration'
                                className="link"
                            >
                                <div>
                                    Регистрация
                                </div>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;