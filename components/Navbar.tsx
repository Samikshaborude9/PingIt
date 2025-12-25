import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PastelButton from './PastelButton';

export default function Navbar(){
    return (
        <div className='flex justify-between items-start w-full xl:pt-5 pt-0'>
           <Image src={"/sit.png"} alt="Logo" width={120} height={40} />
            <Link href={"/auth/login"}>
                <PastelButton message="Login" />
            </Link>
        </div>
    )
}