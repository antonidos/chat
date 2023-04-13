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

    const toggleDark = () => {
        document.documentElement.classList.toggle('dark')
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
        <header className='px-4 py-2 h-18 box-border bg-header dark:bg-slate-800'>
            <div className="container flex items-center justify-between">
                <Logo />
                <div className="flex justify-between items-centerr">
                    <Image
                        className='mx-5 cursor-pointer'
                        src='/images/sleep-mode.png'
                        alt='night mode'
                        width={30}
                        height={30}
                        onClick={toggleDark}
                    />
                    {isLoggedIn ?
                        <>
                            <Link
                                href='/personal'
                                className="mx-5 cursor-pointer text-orange-200"
                            >
                                <div>
                                    Личный кабинет
                                </div>
                            </Link>

                            <div onClick={handleClick} className="mx-5 cursor-pointer text-orange-200">
                                Выйти
                            </div>

                        </>
                        : <>
                            <Link
                                href='/login'
                                className="mx-5 cursor-pointer text-orange-200"
                            >
                                <div>
                                    Авторизация
                                </div>
                            </Link>
                            <Link
                                href='/registration'
                                className="mx-5 cursor-pointer text-orange-200"
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