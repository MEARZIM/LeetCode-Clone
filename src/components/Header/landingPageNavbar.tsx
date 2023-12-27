import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/assets/logo.png'

const navbar = () => {
    return (
        <div>

            <nav className="relative z-10 bg-white border-gray-200 bg-gradient-to-r from-zinc-800 to-slate-800">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href="" className="flex items-center transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out">
                        <Image src={Logo} className="h-10 w-10 mr-3" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LeetCode</span>
                    </Link>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-thin flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <li>
                                <Link href="#" className="block py-2 pl-5 pr-6 text-orange-400 rounded-full hover:text-black hover:bg-orange-400 transition ease-out duration-700"  aria-current="page">Premium</Link>
                            </li>
                            <li>
                                <Link href="#" className="block py-2 pl-5 pr-6 text-white rounded-full hover:text-black hover:bg-white transition ease-out duration-700">Explore</Link>
                            </li>
                            <li>
                                <Link href="#" className="block py-2 pl-5 pr-6 text-white rounded-full hover:text-black hover:bg-white transition ease-out duration-700">Product</Link>
                            </li>
                            <li>
                                <Link href="#" className="block py-2 pl-5 pr-6 text-white rounded-full hover:text-black hover:bg-white transition ease-out duration-700">Developer</Link>
                            </li>
                            <li>
                                <Link href="/accounts/signIn" className="block py-2 pl-5 pr-6 text-white rounded-full hover:text-black hover:bg-white transition ease-out duration-700">Sign-In</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default navbar
