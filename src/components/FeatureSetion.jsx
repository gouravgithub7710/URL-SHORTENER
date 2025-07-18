


import React from "react";
import { BarChart2, Clock, Globe, Shield } from "lucide-react";

// Feature data
const features = [
  {
    Icon: BarChart2,
    title: "Detailed Analytics",
    description: "Get in-depth insights on your link performance",
  },
  {
    Icon: Clock,
    title: "Instant Shortening",
    description: "Create short links in seconds",
  },
  {
    Icon: Globe,
    title: "Global Reach",
    description: "Track clicks from around the world",
  },
  {
    Icon: Shield,
    title: "Secure & Reliable",
    description: "Your links are safe and always accessible",
  },
];

// Single Feature Item Component
const FeatureItem = ({ Icon, title, description }) => (
  <div className="flex flex-col items-center text-center px-4 min-w-[250px] ">
    <Icon className="w-12 h-12 mb-2 text-blue-500" />
    <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);



const InfiniteSlider = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12 overflow-hidden ">
      {/* Gradient overlays for seamless effect */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
      
      {/* Scrolling wrapper */}
      <div 
        className="flex space-x-8"
        style={{
          width: `${features.length * 300 * 2}px`,
          animation: 'slide 20s linear infinite'
        }}
      >
        {[...features, ...features].map((feature, index) => (
          <div key={index} className="flex-shrink-0">
            <FeatureItem {...feature} />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${features.length * 300}px);
          }
        }
      `}</style>
    </div>
  );
};

export default InfiniteSlider;