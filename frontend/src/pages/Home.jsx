import React, { useRef, useState } from "react";
import {useGSAP} from '@gsap/react';
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/socketContext";
import { useEffect } from "react";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination,setDestination] = useState('')
  const[panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const WaitingForDriverRef = useRef(null)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const[vehicleFound, setVehicleFound] = useState(false)
  const[waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])  
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  
  const navigate = useNavigate();


  const { socket } = React.useContext(SocketContext);
  const { user } = React.useContext(UserDataContext);

  useEffect(() => {

            socket.emit('join', { userType: 'user', userId: user._id });
  },[user])

  socket.on('ride-confirmed', (ride) => {

    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on('ride-started', (ride) => {

    setWaitingForDriver(false);
    // navigate to riding page and pass ride data in location state
    navigate('/riding', { state: { ride } });
  });


  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
         {params: {input: e.target.value},
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setPickupSuggestions(response.data);

    }catch{

    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
         {params: {input: e.target.value},
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setDestinationSuggestions(response.data);
    }catch{

    }
  }

  async function handleFindTrip(){
    setVehiclePanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
      params:{
        pickup,
        destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log(response.data.fare);
  }



  const submitHandler = (e)=>{
    e.preventDefault()
  }

  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
      height:'70%',
      padding:20,
      // opacity:1

    })
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
    }else{
      gsap.to(panelRef.current,{
      height:'0%',
      padding:0
      // opacity:0
    })
    gsap.to(panelCloseRef.current,{
      opacity:0
    })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
    })
    }

  },[vehiclePanelOpen])


  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current,{
      height:'70%',
      padding:20,
      // opacity:1

    })
    gsap.to(panelCloseRef.current,{
      opacity:1
    })
    }else{
      gsap.to(panelRef.current,{
      height:'0%',
      padding:0
      // opacity:0
    })
    gsap.to(panelCloseRef.current,{
      opacity:0
    })
    }
  },[panelOpen])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(confirmRidePanelRef.current,{
      transform:'translateY(100%)'
    })
    }

  },[confirmRidePanel])



  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(vehicleFoundRef.current,{
      transform:'translateY(100%)'
    })
    }

  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(WaitingForDriverRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(WaitingForDriverRef.current,{
      transform:'translateY(100%)'
    })
    }

  },[waitingForDriver])




  async function createRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,
      destination,
      vehicleType
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })



  }

  return (
    <div className="h-screen overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5 "
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber"
      />

      <div className="h-screen w-screen">
          <LiveTracking/>
            </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-6 bg-white relative">
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }} className="absolute opacity-0 top-6 right-6 text-2xl">
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit = {(e)=> {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
          <input 
          onClick={()=>{
            setPanelOpen(true)
          }}
          value={pickup}
          onChange={(e)=>{
            setPickup(e.target.value)
          }}
          className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
          type="text"
          placeholder="Add a pick-up location"
          
             />
          <input 
          onClick={()=>{
            setPanelOpen(true)
          }}
          value={destination}
          onChange={(e)=>{
            setDestination(e.target.value)
          }}
          className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3" 
          type="text" 
          placeholder="Enter your destination" />
          </form>
          <button 
          onClick={handleFindTrip}
           className="flex w-full bg-black text-white justify-center items-center py-3  px-4 rounded-lg mt-6 font-medium text-lg">
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
           suggestions = {activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
           setPickup={setPickup}
           setDestination={setDestination}
           activeField={activeField}
           setPanelOpen={setPanelOpen} 
           setVehiclePanelOpen={setVehiclePanelOpen}/>

        </div>
      </div>

      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-10 pt-12">
        <VehiclePanel
        selectVehicle={setVehicleType}
        setConfirmRidePanel={setConfirmRidePanel}
        fare={fare}
        setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
       <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-6 pt-12">
        <ConfirmRide
         pickup={pickup}
         destination={destination}
         fare={fare}
         vehicleType={vehicleType}
         createRide={createRide}
         setConfirmRidePanel={setConfirmRidePanel}
         setVehicleFound={setVehicleFound} />
      </div>

       <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-6 pt-12">
        <LookingForDriver
         pickup={pickup}
         destination={destination}
         fare={fare}
         vehicleType={vehicleType}
         setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={WaitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white p-3 py-6 pt-12">
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          waitingForDriver={waitingForDriver}
         setWaitingForDriver={setWaitingForDriver}/>
      </div>

    </div>
  );
};

export default Home