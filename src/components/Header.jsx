import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button} from './ui/button'

const Header = () => {
  const negavite = useNavigate()
  return (
    <nav className='items-center flex justify-between p-4 '>
      <Link to='/'>
        <img src='/logo.png' className='h-16' alt='Trimrr logo'/>
      </Link>

      <div>
        <Button onClick={()=>negavite('/auth')}>Login</Button>
      </div>
    </nav>
  )
}

export default Header
