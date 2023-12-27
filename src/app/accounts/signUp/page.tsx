"use client"
import React, { useState } from 'react'
import Navbar from '@/components/Header/acountNavbar'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/assets/logo2.webp'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'

const page = () => {
  const router =  useRouter();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordChecker, setPasswordChecker] = useState<Boolean>(false);
  const [loding, setLoding] = useState<boolean>(false);

  
  const validPasswordChecker = (pass: string ,confPass: string)=>{
    if(pass === confPass){
      setPasswordChecker(true);
    }else{
      setPasswordChecker(false);
    }
  }

  const onSignup = async (e:any) => {
    e.preventDefault();
    setLoding(true);

    try {
        const res =  await axios.post('../api/auth/signUp', {
            username: userName,
            email: email,
            password: password,
        })
       
        if (res.status === 200) {
          toast.success(res.data.message,{
            position: "top-center",
            autoClose: 2000,
            theme: "light"
          })
          console.log(res)
          router.push('/accounts/signIn');
        }
        
    } catch (error: any) {  
        toast.error(error.response.data.error,{
          position: "top-center",
          autoClose: 2000,
          theme: "light"
        })

        //rest of the errors
        console.log(error);
    }finally {
        setLoding(false);
    }
    
}
  return (
    <div>
      <Navbar />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm p-10 bg-white">
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

            <Image className="mx-auto h-10 w-auto" src={Logo} alt="Logo" />
            <h2 className="mt-10 pb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">LeetCode</h2>
            <form className="space-y-6" onSubmit={onSignup}>
              <div>

                <div className="mt-2">
                  <input id="UserName" name="UserName" type="text" autoComplete="UserName" placeholder='UserName' required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-500 hover:ring-black sm:text-sm sm:leading-6 transition ease-out duration-700" 
                  onChange={(e)=>{
                    setUserName(e.target.value)
                  }}/>
                </div>

              </div>
              <div>

                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" placeholder='Email' required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-500 hover:ring-black sm:text-sm sm:leading-6 transition ease-out duration-700" 
                  onChange={(e)=>{
                    setEmail(e.target.value);
                  }}/>
                </div>

              </div>

              <div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" autoComplete="current-password" placeholder='Password' required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-gray-500 hover:ring-black sm:text-sm sm:leading-6 transition ease-out duration-700"
                  minLength={8} 
                  onChange={(e)=>{
                    setPassword(e.target.value);
                  }}/>
                </div>
              </div>

              <div>
                <div className="mt-2">
                  <input id="Confirm_password" name="Confirm_password" type="password" placeholder='Confirm Password' required className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-4 ${passwordChecker ? `focus:ring-green-500`:`focus:ring-red-500`} hover:ring-black sm:text-sm sm:leading-6 transition ease-out duration-700`}
                  onChange={(e)=>{
                    validPasswordChecker(password, e.target.value);
                  }}/>
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-gradient-to-r from-slate-500 to-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:from-slate-600 hover:to-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                {loding ? 'Processing' : 'Create an account'}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-400">
              Do you have An Account ?&nbsp;
              <Link href="/accounts/login" className="font-semibold leading-6 text-gray-500 hover:text-black">SignIn</Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default page
