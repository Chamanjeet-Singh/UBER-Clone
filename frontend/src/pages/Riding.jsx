import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-medium font-bold ri-home-5-line'></i>
        </Link>
        <div className='h-1/2'>
        <img  className="w-full h-full object-cover"src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"/>

        </div>
        <div className='h-1/2 p-4'>
            <div className='flex items-center justify-between'>
            <img className="h-20" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png" alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium'>Inder</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>KB0324-123</h4>
                <p className='text-sm text-gray-600'>Toyota Camry</p>
            </div>

        </div>
        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5 '>
            
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
        </div>     
            <button className='w-full mt-5 bg-green-600 text-white font-semibold rounded-lg '>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding