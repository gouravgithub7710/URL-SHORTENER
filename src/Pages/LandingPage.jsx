import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import InfiniteSlider from '@/components/FeatureSetion'

const LandingPage = () => {

  const [longUrl, setLongUrl] = useState();
  
  const navigate = useNavigate();

  const handleShorten= (e)=>{
    e.preventDefault();
    if(longUrl)navigate(`/auth?createNew=${longUrl}`);
  }
  return (
    <div className='flex flex-col items-center '>
 <h1
        className="font-extrabold text-4xl sm:text-5xl bg-clip-text text-transparent text-center"
        style={{
          background: "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
       The only URL Shortener <br /> you&rsquo;ll ever need! 👇
      </h1>

<p class="text-gray-400 mt-4 text-center max-w-screen-lg">LinkLytics doesn't just shrink URLs—it supercharges them. Create concise links in seconds, then harness powerful analytics to understand your audience and optimize your reach. Turn every shortened link into a data goldmine.</p>
      
     


      <form
        className="flex flex-col sm:flex-row items-center justify-center mt-10 sm:mt-20 w-full max-w-2xl"
        onSubmit={handleShorten}
      >
        <div className="w-full flex flex-col sm:flex-row gap-2">
          <Input
            className="flex-grow h-14 bg-gray-800 text-white placeholder-gray-400
                       rounded-t-md sm:rounded-l-md sm:rounded-r-none sm:rounded-t-none focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent"
            placeholder="Enter your URL"
            required
           onChange={(e)=>setLongUrl(e.target.value)} // Update longURL state on input change
          />
          <Button
            type="submit"
            className="h-14 w-full sm:w-auto px-8 text-lg font-semibold bg-blue-500 hover:bg-blue-400 text-white transition-colors duration-200 rounded-b-md sm:rounded-none sm:rounded-r-md"
          >
            Try Now!
          </Button>
        </div>
      </form>


      {/* <img src='/banner.jpeg' alt='banner' className='w-full my-11 md:px:11'/> */}
        <InfiniteSlider />

      <Accordion type="multiple" collapsible className="w-full md:px-11 pt-13">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How does the URL shortener works?
          </AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of
            that URL. This shortened URL redirects to the original long URL when
            accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the app?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage your URLs, view
            analytics, and customize your short URLs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What analytics are available for my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            You can view the number of clicks, geolocation data of the clicks
            and device types (mobile/desktop) for each of your shortened URLs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  )
}

export default LandingPage
