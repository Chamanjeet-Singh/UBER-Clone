import React, { use, useState } from 'react'
import { Link } from 'react-router-dom';

const Captainsignup = () => {
     const[email, setEmail] = useState('');
        const[ password, setPassword ] = useState('');
        const[firstName, setFirstName] = useState('');
        const[lastName, setLastName] = useState('');
        const[userData, setUserData] = useState({});
    
    
        const SubmitHandler = (e) =>{
            e.preventDefault();
            setUserData({
                fullName:{
                    firstName:firstName,
                    lastName:lastName
                },
                email:email,
                password:password   
            })
            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
        }
  return (
            <div className='py-5 px-3 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-14 mb-2' src="https://imgs.search.brave.com/rSuSSYacx1C8jOOc6iUc_xal-ahK3vL90Pl-NKUkJSE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2MTQy/NXViZXItZHJpdmVy/LWxvZ28tcG5nLnBu/Zw" alt="" />
        <form onSubmit={(e)=>{
            SubmitHandler(e);
        }}>
            <h3 className='text-lg font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-5'>
                <input
                required
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                type='text'
                placeholder='firstname'
                value={firstName}
                onChange={(e)=>{
                    setFirstName(e.target.value)
                }}

                 />
                <input
                    required
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                    type='text'
                    placeholder='lastname'
                    value={lastName}
                    onChange={(e)=>{
                        setLastName(e.target.value)
                    }}
                />

            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
                required
                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type='email'
                placeholder='email@example.com'
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>


            <input
                required 
                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type='password'
                placeholder='password'
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
            />
            <button
                className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm'
                >Login</button>

                <p className='text-center'>Already have a account? <Link to="/captain-login" className='text-blue-600'>Login here</Link></p>
        </form>
        </div>
        <div>
            <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply.</span></p>
        </div>
    </div>
  )
}

export default Captainsignup