'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const Logo = () => {
    const router = useRouter();
    return (
        <Image
        onClick={() => {router.push('/')}}
            alt='logo'
            className='hidden sm:block md:block lg:block xl:block cursor:pointer'
            height='100'
            width='100'
            src='/images/logo.jpg'
        />

    )
}

export default Logo;