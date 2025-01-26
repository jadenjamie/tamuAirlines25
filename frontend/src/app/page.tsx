import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { FadeInHeading } from "@/components/FadeInHeading"
import { Textarea } from "@/components/ui/textarea"


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-100">
      {/* Header Image */}
      <div className="relative w-full h-screen">
        <Image
          src="/header.jpg"
          alt="Beautiful travel destination"
          layout="fill"
          objectFit="cover"
          priority
        />

        
      </div>

      {/* Main Content */}
      <main className="absolute top-0 justify-center px-4 py-8 w-full h-screen">
        <div className="text-center w-full mt-8">
          <FadeInHeading text="Find Your Dream Destination" delay={200} duration={1000} className="text-white drop-shadow-xl"/>
          
        </div>
        <div className="text-center w-full absolute bottom-64">
          <Textarea placeholder="Describe your dream location" className="bg-white w-1/3 mx-auto h-40px my-6 text-xl3"></Textarea>
          <Button className="bg-white text-black p-4 text-xl drop-shadow-lg">Search</Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-4 text-center absolute bottom-0 w-full">
        <p>&copy; 2025 Your Flight Booking Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
