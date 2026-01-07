import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className="p-1 text-center absolute w-[93%] top-0 " onClick={()=>{
          props.setVehiclePanelOpen(false);
        }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-3">Choose a Vehicle</h3>

        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className="flex border-2 active:border-black  mb-2 rounded-xl w-full p-3 items-center justify-between ">
          <img className="h-15" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_v1.png" alt="" />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-lg">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className="font-medium text-sm">2 mins away </h5>
            <p className="font-normal text-xs text-gray-600">Faster</p>
          </div>
          <h2 className="test-lg font-semibold">$7.12</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }}className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between ">
          <img className="h-15" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/IntercityXL.png" alt="" />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-lg">UberXL <span><i className="ri-user-3-fill"></i>6</span></h4>
            <h5 className="font-medium text-sm">5 mins away </h5>
            <p className="font-normal text-xs text-gray-600">Affordable, compact rides for group upto 6</p>
          </div>
          <h2 className="test-lg font-semibold">$11.57</h2>
          
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }}className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between ">
          <img className="h-15" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/UberComfort_Premium.png" alt="" />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-lg">Comfort <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className="font-medium text-sm">6 mins away </h5>
            <p className="font-normal text-xs text-gray-600">Newer cars with extra legroom</p>
          </div>
          <h2 className="test-lg font-semibold">$9.23</h2>
        </div>
        
    </div>
  )
}

export default VehiclePanel