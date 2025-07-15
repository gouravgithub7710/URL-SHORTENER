import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

const AppLayouts = () => {
  return (
    <div >
      <main className='min-h-screen container'>
       <Header/>
        <Outlet/>
      </main>
      {/* Footer */ }
      
      <div>   <footer className="w-full mt-10">
      <div className="border-t bg-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center text-sm text-white">
          <p className="mb-4">2025 URL Shortener. All rights reserved.</p>
          <p className="mb-4">Made with 💖 by Gourav Giri</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/gouravgithub7710"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5 text-white" />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/gouravgiri2004/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5 text-white" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer></div>
    </div>
  )
}

export default AppLayouts
