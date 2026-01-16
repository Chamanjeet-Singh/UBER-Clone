import React, {useState} from 'react'
import { Link } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('');

  const submitHandler =(e)=>{
    e.preventDefault()
  }
  return (
    <div>
        <h5 className="p-1 text-center absolute w-[93%] top-0 " onClick={()=>{
          props.setRidePopupPanel(false);
        }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-3">Confirm this Ride to Start</h3>
        <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3 '>
                <img className='h-12 w-10 rounded-full object-cover ' src="https://imgs.search.brave.com/WxT9T7by4TVbehSpvobTvArhm-E6TCN86o7RoL5PO7c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU3L2Qy/LzExLzU3ZDIxMWMw/ZTg0NjIyMjU1MmI4/Yzk4MWIwNzVmZWQx/LmpwZw" alt="" />
                <h2 className='text-lg font-medium'>Dragon Sharma</h2>
            </div>
            <h5 className='text-lg font-semibold'>1.3 miles</h5>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5 '>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-user-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>Wright State University</h3>
                <p className='text-sm -mt-1 text-gray-600'>Dayton, Ohio, 45240</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>$7.20</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
              </div>
            </div>
            <div className='flex items-center gap-5  p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>$7.20</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
              </div>
            </div>
          </div>
        
          <div className='mt-6 w-full '>
            <form onSubmit={(e)=>{
              submitHandler(e)
            }}>
            
              <input value={otp} onChange={(e)=> setOtp(e.target.value)} className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-2' type="text" placeholder='Enter OTP' />
              <Link to='/captain-riding' className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold  p-3 rounded-lg '>Confirm</Link>
          <button onClick={()=>{
            props.setConfirmRidePopupPanel(false);
            props.setRidePopupPanel(false);
          }} className='w-full mt-1 bg-red-500 text-lg text-white-700 font-semibold p-3 rounded-lg '>Cancel</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default ConfirmRidePopUp