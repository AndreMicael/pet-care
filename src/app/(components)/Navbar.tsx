import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className=" bg-indigo-600 flex justify-between  flex-row items-center p-4">
       <Link href="/">       <h1 className="text-4xl font-fredoka font-black text-yellow-400 font-bold">PetCare</h1> </Link>

        <div className="flex text-white flex-row gap-2">     
   
      <Link href="/buscar-cuidador">Buscar Cuidador</Link></div>
 
    </div>
  )
}

export default Navbar