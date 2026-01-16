import React, {useState, useRef} from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {

    
  return (
    <div>
        <h5 className="p-1 text-center absolute w-[93%] top-0 " onClick={()=>{
          props.setFinishRidePanel(false);
        }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-3">Finish this Ride</h3>
        <div className='flex items-center justify-between p-3 border-2 p-4 bg-yellow-400 rounded-lg mt-4'>
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
              <Link to='/captain-home' className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold  p-3 rounded-lg '>Finish Ride</Link>


              <p className=' mt-10 text-xs  '>Click on finish ride button if you have completed the payment.</p>
          </div>
        </div>
    </div>
  )
}

export default FinishRide