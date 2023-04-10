import React from 'react';
import Logo from 'shared/Logo';
import Link from 'next/link'

const Header = () => {
    return (
        <header>
            <div className="container flex align-center space-between">
                <Logo />
                <div className="menu flex space-between">
                    <Link
                        href='/personal'
                        className="link"
                    >
                        <div>
                            Личный кабинет
                        </div>
                    </Link>
                    <Link
                        href='/authorization'
                        className="link"
                    >
                        <div>
                            Авторизация
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;