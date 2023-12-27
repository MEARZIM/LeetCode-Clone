import React from 'react'
import Image from 'next/image'
import Logo from '@/assets/logo2.webp'
import { FaChevronLeft, FaChevronRight, FaUserAlt } from 'react-icons/fa'
import { PiSignOutBold } from "react-icons/pi";
import Timer from "@/components/Timer/timer";
import { Problem } from '@/helpers/type';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';

type props = {
    problems: [Problem]
}

const problemPageNavbar = ({ problems }: props) => {
    const router = useRouter();
    const {id} = useParams();
    
    const handleProblemChange = (isForward: boolean) => {
        const direction = isForward ? 1 : -1;
        const problemIds = problems.map((problem: any) => problem.id);
        const index = problemIds.indexOf(id as string);
    
        if (index !== -1) {
            if (direction === 1 && index < problemIds.length - 1) {
                router.push(`./${problemIds[index + 1]}`);
            } else if (direction === -1 && index > 0) {
                router.push(`./${problemIds[index - 1]}`);
            } else if (direction === 1) {
                router.push(`./${problemIds[0]}`);
            } else if (direction === -1) {
                router.push(`./${problemIds[problemIds.length - 1]}`);
            }
        }
        // Handle the case when index === -1 if needed
    };
    
    const handelSignOut = async ()=>{
        try {
          const res = await axios.get('../../api/auth/signOut');
          if (res.status==200) {
            toast.success("Successfully logged Out",{
              position: "top-center",
              autoClose: 2000,
              theme: "light"
            });
          }
          router.push('/accounts/signIn');
          
        } catch (error) {
          
        }
      }


    return (
        <div>
            <header className={`flex items-center justify-between text-gray-600 body-font px-10 py-3 bg-gradient-to-r from-zinc-800 to-slate-800 `} >
                <div className="container mx-auto flex flex-col flex-wrap md:flex-row items-center">
                    <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Image src={Logo} alt={''} className='w-6 h-6' />
                    </div>
                    <div className='flex items-center gap-4 flex-1 justify-center'>
                        <div
                            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer hover:text-white'
                            onClick={() => handleProblemChange(false)}
                        >
                            <FaChevronLeft size={20} />
                        </div>

                        <p className='cursor-pointer hover:text-white'>Problems</p>

                        <div
                            className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer hover:text-white'
                            onClick={() => handleProblemChange(true)}
                        >
                            <FaChevronRight size={20} />
                        </div>

                    </div>
                    <div className='h-8 w-8 flex items-center justify-center rounded text-white mr-5 cursor-pointer hover:bg-gray-400'>
                        <FaUserAlt size={18} color={"white"} onClick={()=> router.push('../../accounts/dashboard')}/>
                    </div>

                    <Timer />
                    <div className='h-8 w-8 flex items-center justify-center rounded cursor-pointer hover:bg-gray-400'>
                        <button className='' onClick={handelSignOut}><PiSignOutBold size={24} color={"white"} /></button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default problemPageNavbar
