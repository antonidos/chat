import React, { useEffect } from 'react';
import Logo from 'shared/Logo';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setIsLoggedIn } from 'entities/slices/user/userSlice';
import { useRouter } from 'next/router';
import { logout } from './api/apiLogout';
import Image from 'next/image';

const Header = () => {
    const isLoggedIn = useSelector(selectUser).isLoggedIn
    const dispatch = useDispatch()
    const router = useRouter()

    const handleClick = async () => {
        if (localStorage.getItem('userToken')) {
            await logout(localStorage.getItem('userToken') as string)
            localStorage.setItem('userToken', '')
        }
        dispatch(setIsLoggedIn(false))
        router.push("/login")
    }

    async function getData() {
        if (!localStorage.getItem('userToken')) {
            if (router.pathname !== '/registration') router.push('/login')
            dispatch(setIsLoggedIn(false))
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
                <div className="menu flex space-between align-center">
                    <Image
                        className='theme'
                        src='/images/sleep-mode.png'
                        alt='night mode'
                        width={30}
                        height={30}
                    />
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