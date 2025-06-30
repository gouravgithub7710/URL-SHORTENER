import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center'>
     <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-green-500 text-center font-extrabold">
        The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h2>
      <form  className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
        <Input
           type="url"
          placeholder="Enter your Loooong URL"
         // onChange={}
          className="h-full flex-1 px-4 py-4"
        />
        <Button type="submit" className="h-full" variant="destructive">
        Shorten!
        </Button>
      </form>
      <img src='/banner.jpeg' alt='banner' className='w-full my-11 md:px:11'/>
    </div>
  )
}

export default LandingPage
