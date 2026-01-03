import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {CaptainDataContext} from '../context/CaptainContext'

const Captainlogin = () => {

    const [email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');

    const {captain, setCaptain } = React.useContext(CaptainDataContext)
    const navigate = useNavigate()

    const SubmitHandler = async (e) =>{
        e.preventDefault();
        const captain = {
            email:email,
            password:password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain);

        if(response.status === 200){
            const data = response.data
                setCaptain(data.captain)
                localStorage.setItem('token', data.token)
                navigate('/captain-home')
            
        }

        setEmail('');
        setPassword('');
    }




  return (
        <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-14 mb-2' src="https://imgs.search.brave.com/rSuSSYacx1C8jOOc6iUc_xal-ahK3vL90Pl-NKUkJSE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY1OTc2MTQy/NXViZXItZHJpdmVy/LWxvZ28tcG5nLnBu/Zw" alt="" />
        <form onSubmit={(e)=>{
            SubmitHandler(e);
        }}>
            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
                required 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type='email'
                placeholder='email@example.com'
            />

            <h3 className='text-lg font-mediummb-2'>Enter Password</h3>


            <input
                required 
                value={password}
                onChange={(p)=>{
                    setPassword(p.target.value)
                }}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type='password'
                placeholder='password'
            />
            <button
                className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                >Login</button>

                <p className='text-center'>Join a Fleet? <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link></p>
        </form>
        </div>
        <div>
            <Link
                to="/login"
                className='bg-[#f3c164] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                
                >
                Sign in as User
            </Link>
        </div>
    </div>
  )
}

export default Captainlogin