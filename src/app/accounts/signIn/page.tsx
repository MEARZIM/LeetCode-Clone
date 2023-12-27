"use client"
import React, { useEffect, useState } from 'react'
import Logo from '@/assets/logo2.webp'
import Navbar from '@/components/Header/acountNavbar'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSignin = async (e: any) => {
    e.preventDefault();

    try {
      
      setLoading(true);
      const res = await axios.post("../api/auth/signIn",{
        email: email,
        password: password
      })

      if (res.status === 200) {
        toast.success("Successfully logged in",{
          position: "top-center",
          autoClose: 2000,
          theme: "light"
        });
        router.push(`/accounts/dashboard/${res.data.data}`);
      }


    } catch (error:any) {
      toast.error(error.response.data.error,{
        position: "top-center",
        autoClose: 2000,
        theme: "light"
      })
       
      // console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar colour={""} hoverColour={"gray-900"}/>

      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm p-10 bg-white">
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

            <Image className="mx-auto h-10 w-auto" src={Logo} alt="Logo" />
            <h2 className="mt-10 pb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">LeetCode</h2>
            <form className="space-y-6" onSubmit={onSignin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-400">Email address</label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black hover:ring-black sm:text-sm sm:leading-6 transform ease-out duration-700"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-400">Password</label>
                  <div className="text-sm">
                    <Link href="#" className="font-semibold text-gray-500 hover:text-black transform ease-out duration-700">Forgot password?</Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black hover:ring-black sm:text-sm sm:leading-6 transform ease-out duration-700"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }} />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-gradient-to-r from-slate-500 to-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:from-slate-600 hover:to-zinc-800">
                {loading? "Loading...": "Sign In Here"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-400">
              Create Your Account &nbsp;
              <Link href="/accounts/signUp" className="font-semibold leading-6 text-gray-500 hover:text-black">SignUp</Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default page
