'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CgProfile } from "react-icons/cg";
import Navbar from "@/components/Header/acountNavbar"
import { toast } from 'react-toastify';
import { Users } from '@/helpers/type';


const page = () => {
  const router = useRouter();
  const [user, setUser] = useState<Users>();

  const getUser = async () => {
    const res = await axios.get('../../api/utils/verifiedUserDetails');
    setUser(res.data.user);
  }
  useEffect(() => {
    getUser();
  }, [])

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


  console.log();
  return (
    <div>
      <Navbar colour={"bg-gradient-to-r from-zinc-800 to-slate-800"} hoverColour={"black"} />
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">{user?.totalSolved?.toString()}</p>
                <p className="text-gray-400">Solve Problem</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">{user?.totalLikes?.toString()}</p>
                <p className="text-gray-400">Likes</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">{user?.totalDisLikes?.toString()}</p>
                <p className="text-gray-400">DisLikes</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <CgProfile size={100} />

              </div>
            </div>

            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button
                className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={()=>{
                  router.push(`/accounts/dashboard/${user?._id}`);
                }}
              >
                Dashboard
              </button>
              <button
                className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                onClick={handelSignOut}
              >
                SignOut
              </button>
            </div>
          </div>

          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">{user?.username}</h1>
            <p className="font-light text-gray-600 mt-3">Kolkata</p>

            <p className="mt-8 text-gray-500">Email - {user?.email}</p>
            <p className="mt-2 text-gray-500">Computer Science</p>
          </div>

          <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">Made By - Ayan Saha 
            <br/>
            eat {`->`} code {`->`} sleep
            </p>
           
          </div>

        </div>
      </div>
    </div>
  )
}


export default page
