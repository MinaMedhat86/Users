import React from 'react'
import style from "./Notfound.module.css"
import notFound from "../../Assests/notfound/notfound.png"
import { useNavigate } from 'react-router-dom'

export default function Notfound() {

  let navigate = useNavigate();

  function goToHome (){
    navigate("/users")
  }

  return <>
  <div className=' d-flex flex-column justify-content-center align-items-center vh-100'>
<img src={notFound} alt="not found page" className={` ${style.notFoundStyle} `} />
<button
  onClick={goToHome}
  className=' btn btn-warning mt-4 text-white w-25 py-1 fs-4 mb-5'> Home</button>
  </div>



  </>
}
