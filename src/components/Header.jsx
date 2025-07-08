import React from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {Button} from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LinkIcon, LogOut } from 'lucide-react'
import { UrlState } from '@/Context'
import { logout } from '@/DB/ApiAuth'
import useFetch from './Hooks/use-fetch'
import {BarLoader} from "react-spinners";

const Header = () => {
  const navigate = useNavigate()
  const {user, fetchUser} = UrlState();
  const {loading,fn:fnLogout} = useFetch(logout)
  return (
    <>
    <nav className='items-center flex justify-between p-4 '>
      <Link to='/'>
        <img src='/logo.png' className='h-16' alt='Trimrr logo'/>
      </Link>

      <div>
      {!user?
        <Button onClick={()=>navigate('/auth')} className='cursor-pointer'>Login</Button>
        :(
          <DropdownMenu>
  <DropdownMenuTrigger>
    <Avatar>
  <AvatarImage src={user?.user_metadata?.profilepic} className='w-12 h-12 rounded-full object-cover cursor-pointer shadow-md hover:scale-150 transition-transform
'/>
  <AvatarFallback>GG</AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className='cursor-pointer'>
    <LinkIcon className='text-white-400'/>
    My Links</DropdownMenuItem>
    <DropdownMenuItem className="text-red-400 cursor-pointer">
    <LogOut className='text-red-400'/>
    <span onClick={()=>{
      fnLogout().then(()=>{
         fetchUser();
        navigate('/')
      })
      
    }}>Logout</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        )
      }
      </div> 
    </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  )
}

export default Header
