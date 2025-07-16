import React from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div className="min-h-svh flex items-center justify-center text-center flex-col">
      <h1 className='text-6xl mb-4'>404</h1>
      <p className='text-xl mb-4'>Strony nie znaleziono</p>
      <Link to={"/"} className='text-sky-700 underline hover:no-underline'>Powrót</Link>
    </div>
  )
}

export default NoPage