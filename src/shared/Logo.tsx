import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link
        href='/'
        >
            <Image
                className='logo'
                src="/images/chat.png"
                alt="logo"
                width={50}
                height={50}
            />
        </Link>

    );
};

export default Logo;