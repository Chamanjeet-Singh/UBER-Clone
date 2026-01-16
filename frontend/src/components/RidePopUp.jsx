import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 className="p-1 text-center absolute w-[93%] top-0 " onClick={()=>{
          props.setRidePopupPanel(false);
        }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-3">New Ride Avaliable!</h3>
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


          <div className='flex mt-5 w-full items-center justify-between'> 
            <button onClick={()=>{
            props.setRidePopupPanel(false);
            
          }} className=' mt-1 bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg '>Ignore</button>
            <button onClick={()=>{
            props.setConfirmRidePopupPanel(true);
          }} className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg '>Accept</button>
          
          </div>
        </div>
    </div>
  )
}

export default RidePopUp