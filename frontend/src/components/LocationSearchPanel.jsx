import React from 'react'

const LocationSearchPanel = (props) => {


    // sample array for location
    const locations = [
        '2063 Waycross Road, Cincinnati Ohio,45240',
        '2059 Miles Road, Cincinnati Ohio,45240',
        'University of Cincinnati, Cincinnati Ohio,45240',
        'Wright State University, Dayton Ohio,45240'

    ]
  return (
    <div>
        
        {/* This is just a sample data */}
        {
            locations.map(function (elem, idx){
                return <div key={idx} onClick={()=>{
                    props.setVehiclePanelOpen(true)
                    props.setPanelOpen(false)
                }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h4 className='font-medium'>{elem}</h4>
        </div>
            })
        }

        
    </div>

  )
}

export default LocationSearchPanel