import React from 'react'
import { Link } from 'react-router-dom'


const Notfound = () => {
  return (
    <div className='h-screen w-screen flex-col bg-[#222831] flex justify-center items-center'>
      <img className='sm:h-[85vh] object-contain' src="404.png" alt="not_found_image" />
      <Link to="/"><button className='bg-[#00ADB5] mb4 text-[#222831] px-4 py-2 font-bold'>GO BACK TO HOME</button></Link>
    </div>
  )
}

export default Notfound;