import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

const AppLayouts = () => {
  return (
    <div >
      <main className='min-h-screen container'>
       <Header/>
        <Outlet/>
      </main>
      {/* Footer */ }
      <div className='p-10 text-center bg-gray-800 mt-10'>
        Made with 💖 by Gourav Giri
      </div>
      <div>  <footer className="w-full border-t bg-white py-6 mt-10 dark:bg-gray-950">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <p>&copy; 2025 URL Shortener. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://github.com/gouravgithub7710"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </footer></div>
    </div>
  )
}

export default AppLayouts
