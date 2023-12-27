import React from 'react'
import {BsFacebook, BsTwitter, BsInstagram, BsLinkedin} from 'react-icons/bs'


const footer = () => {
    return (
        <div className='bg-gradient-to-r from-zinc-800 to-slate-800'>
            <footer className="text-gray-600 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    
                    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 LeetCode —
                        <a href="https://twitter.com/" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@Ayan Saha</a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a className="text-gray-500">
                            <BsFacebook size={20} color='white'/>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <BsTwitter size={20} color='white'/>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <BsInstagram size={20} color='white'/>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <BsLinkedin size={20} color='white'/>
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default footer
