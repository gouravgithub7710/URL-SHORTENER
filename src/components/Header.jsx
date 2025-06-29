import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button} from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

const Header = () => {
  const negavite = useNavigate()
  const user = true;
  return (
    <nav className='items-center flex justify-between p-4 '>
      <Link to='/'>
        <img src='/logo.png' className='h-16' alt='Trimrr logo'/>
      </Link>

      <div>
      {!user?
        <Button onClick={()=>negavite('/auth')}>Login</Button>
        :(
          <DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        )
      }
      </div>
    </nav>
  )
}

export default Header
