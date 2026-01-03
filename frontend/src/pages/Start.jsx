import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className="bg-cover bg-center bg-[url(https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=1344/height=1344/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9jMTg3MjA5NS0zMTgyLTQwN2QtYWVmOS00N2M5MzY2NDdlODQucG5n)] pt-8  h-screen flex justify-between flex-col w-full bg-red-400">
            <img className='w-14 ml-8' src="https://img.favpng.com/14/5/9/uber-logo-uber-logo-dXg2uFng.jpg" alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-[30px] font-bold'>Get Started with Uber</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start