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

<p class="text-gray-400 mt-4 text-center max-w-screen-lg">URL-SHORTENER doesn't just shrink URLs—it supercharges them. Create concise links in seconds, then harness powerful analytics to understand your audience and optimize your reach. Turn every shortened link into a data goldmine.</p>
      
     


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
            className="h-14 w-full cursor-pointer sm:w-auto px-8 text-lg font-semibold bg-blue-500 hover:bg-blue-400 text-white transition-colors duration-200 rounded-b-md sm:rounded-none sm:rounded-r-md"
          >
            Try Now!
          </Button>
        </div>
      </form>

<h2 className="text-2xl font-bold text-white pt-10 ">Features</h2>
      
        <InfiniteSlider />


      {/* Enhanced FAQ Section */}
      <div className="w-full max-w-4xl mt-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about URL-SHORTENER
          </p>
        </div>

        <Accordion type="multiple" className="w-full space-y-4">
          <AccordionItem 
            value="item-1" 
            className="border border-gray-700 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-blue-400 transition-colors duration-200 text-lg font-semibold">
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                How does the URL shortener work?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
              <div className="ml-11 p-4 bg-gray-800/30 rounded-lg border-l-4 border-blue-500">
                When you enter a long URL, our system generates a shorter version of
                that URL. This shortened URL redirects to the original long URL when
                accessed. Our advanced algorithm ensures your links are both secure and lightning-fast.
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-2"
            className="border border-gray-700 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-purple-400 transition-colors duration-200 text-lg font-semibold">
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                Do I need an account to use the app?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
              <div className="ml-11 p-4 bg-gray-800/30 rounded-lg border-l-4 border-purple-500">
                Yes. Creating an account allows you to manage your URLs, view
                analytics, and customize your short URLs. Plus, you'll get access to advanced features like custom domains and detailed reporting.
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem 
            value="item-3"
            className="border border-gray-700 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <AccordionTrigger className="px-6 py-4 text-left text-white hover:text-green-400 transition-colors duration-200 text-lg font-semibold">
              <span className="flex items-center gap-3">
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                What analytics are available for my shortened URLs?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
              <div className="ml-11 p-4 bg-gray-800/30 rounded-lg border-l-4 border-green-500">
                You can view comprehensive analytics including click counts, geolocation data, device types (mobile/desktop), referral sources, and time-based insights. Get detailed reports to understand your audience better and optimize your marketing campaigns.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Additional CTA Section */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to supercharge your links?
          </h3>
          <p className="text-gray-300 mb-6">
            Join thousands of users who trust URL-SHORTENER for their URL shortening needs
          </p>
          <Button onClick={()=>{navigate('/dashboard')}} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

