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
    <nav className='items-center flex justify-between m-7 px-10 '>
      <Link to='/'>

        <div className="text-center ">
        <h1 
          className="text-xl  sm:text-2xl lg:text-3xl font-black text-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:skew-x-2 relative group"
          style={{
            background: "linear-gradient(45deg, #ff0080, #00ffff, #8000ff, #ff8000)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "cyberpunkGlow 2s ease infinite",
            fontFamily: "'Orbitron', 'Exo 2', monospace",
            letterSpacing: "0.15em",
            textShadow: "0 0 20px rgba(255, 0, 128, 0.8)",
          }}
        >
          URL-SHORTENER
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        </h1>
         <style jsx>{`
        @keyframes cyberpunkGlow {
          0%, 100% { 
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% { 
            background-position: 100% 50%;
            filter: hue-rotate(180deg);
          }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;700&display=swap');
      `}</style>
      </div>
      </Link>

      <div>
      {!user?
        <Button onClick={()=>navigate('/auth')} className='cursor-pointer bg-blue-400 '>Login</Button>
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
    <Link to='/dashboard' className='flex gap-2'>
    <LinkIcon className='text-white-400'/>
    My Links
    </Link>
    </DropdownMenuItem>
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
