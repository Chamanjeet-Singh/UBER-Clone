import React, {useContext, useEffect} from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';


const UserProtectedWrapper = ({children}) => {


    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [user, setUser] = useState(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)


    console.log(token);

    useEffect(()=>{
         if(!token){
        navigate('/login')
    }
    

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
      }).then(response => {
        if(response.status === 200){
          setUser(response.data.user)
          setIsLoading(false)
        }
      })
      
      
      .catch(err=>{
        console.log(err)
        localStorage.removeItem(token)
        navigate('/login')
      })
    },[token])
    


    if(isLoading){
      return(
        <div>Loading...</div>
      )
    }

  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWrapper