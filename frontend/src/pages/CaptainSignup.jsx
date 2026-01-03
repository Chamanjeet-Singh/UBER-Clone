import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Captainsignup = () => {

        const navigate = useNavigate();
    
        const[email, setEmail] = useState('');
        const[ password, setPassword ] = useState('');
        const[firstName, setFirstName] = useState('');
        const[lastName, setLastName] = useState('');
        const[userData, setUserData] = useState({});
        const[vehicleColor, setVehicleColor] = useState('');
        const[vehiclePlate, setVehiclePlate] = useState('');
        const[vehicleCapacity, setVehicleCapacity] = useState('');
        const[vehicleType, setVehicleType] = useState('');


        const {captain, setCaptain} = React.useContext(CaptainDataContext);


        const SubmitHandler = async (e) =>{
            e.preventDefault();
            const captainData = {
                fullname:{
                    firstname:firstName,
                    lastname:lastName
                },
                email:email,
                password:password,
                vehicle:{
                    color:vehicleColor,
                    plate:vehiclePlate,
                    capacity: Number(vehicleCapacity),
                    vehicleType:vehicleType 
                }
            }

            
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData , {withCredentials: true});

        if(response.status === 201){
            const data = response.data
            setCaptain(data);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }






            setEmail('');
            setPassword('');
            setFirstName('');
            setLastName('');
            setVehicleColor('');
            setVehiclePlate('');
            setVehicleCapacity('');
            setVehicleType('');
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


            <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
            <div className='flex gap-4 mb-7'>
                <input
                    required
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                    type='text'
                    placeholder='Vehicle Color'
                    value={vehicleColor}
                    onChange={(e)=>{
                        setVehicleColor(e.target.value)
                    }}
                />
                <input
                    required
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                    type='text'
                    placeholder='Vehicle Plate Number'
                    value={vehiclePlate}
                    onChange={(e)=>{
                        setVehiclePlate(e.target.value)
                    }}
                />
            </div>
            <div className='flex gap-4 mb-7'>
                <input
                    required
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                    type='number'
                    placeholder='Vehicle Capacity'
                    value={vehicleCapacity}
                    onChange={(e)=>{
                        setVehicleCapacity(e.target.value)
                    }}
                />
                <select
                    required
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                    type='text'
                    placeholder='Vehicle Type'
                    value={vehicleType}
                    onChange={(e)=>{
                        setVehicleType(e.target.value)
                    }}
                    >
                    <option value="">Select Vehicle Type</option>
                    <option value="car">Sedan</option>
                    <option value="auto">SUV</option>
                    <option value="moto">Truck</option>
                </select>
                
            </div>




            <button
                className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm'
                >Create Captain Account</button>

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