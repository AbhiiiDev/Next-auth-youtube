"use client"

import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';  
import {connect} from '@/dbConfig/dbConfig';  


connect();

export default function LoginPage()
{

  const router=useRouter();
    const [user,setUser]=React.useState({
   
        email:"",
        password:"",
    })
    const [loading,setLoading]=React.useState(false);
    const handleSubmit = async()=>{
try {

  setLoading(true);
  const response=await axios.post('/api/user/login',user);
  console.log('login success',response.data);
  router.push('/dashboard');
} catch (error:any) {

  console.log(error.message);
}
finally{ 
  setLoading(false);
}
    }
    
    return (
        <div className="flex justify-center items-center h-screen bg-black">
        <div className=" text-white w-[650px] flex flex-col">
          <h2 className="mt-5 text-center text-2xl font-bold">
         Login :)
          </h2>
          <div className="mt-5 p-5">
            <form onSubmit={(e) => e.preventDefault()}>
           
              <div className="mb-6">
                <label htmlFor="email" className="block">Email</label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="bg-gray-800 rounded-md p-2 text-white w-full"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block">Password</label>
                <input
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="bg-gray-800 rounded-md p-2 text-white w-full"
                />
              </div>
              <div className='justify-center'>

              <button type="submit" onClick={handleSubmit} className="bg-orange-500 font-semibold text-black px-4 py-2 rounded-md">Login</button>
              <span className='mx-1'>
              Don't have an account ? <Link href='/signup' className='text-orange-400'>SignUp!</Link>
              </span>
              </div> 

            </form>
          </div>
        </div>
      </div>
      
    );
}