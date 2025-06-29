import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button} from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LinkIcon, LogOut } from 'lucide-react'

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
        <Button onClick={()=>negavite('/auth')} className='cursor-pointer'>Login</Button>
        :(
          <DropdownMenu>
  <DropdownMenuTrigger>
    <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" className='cursor-pointer border-0
'/>
  <AvatarFallback>GG</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Gourav Giri</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className='cursor-pointer'>
    <LinkIcon className='text-white-400'/>
    My Links</DropdownMenuItem>
    <DropdownMenuItem className="text-red-400 cursor-pointer">
    <LogOut className='text-red-400'/>
    <span>Logout</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        )
      }
      </div>
    </nav>
  )
}

export default Header
