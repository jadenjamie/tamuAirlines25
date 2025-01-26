"use client"

import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { FadeInHeading } from "@/components/FadeInHeading"
import { Textarea } from "@/components/ui/textarea"
import { TextInputForm } from "@/components/TextInputForm"

function App() {

  return (
    <div className="min-h-screen flex flex-col bg-sky-100 overflow-hidden">
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
          <h1 className="font-sans text-8xl font-bold text-white">Find Your Dream Destination</h1>
          
        </div>
        <div className="text-center w-full absolute bottom-64 !text-3xl">
          <TextInputForm className="!text-3xl important"></TextInputForm>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-4 text-center absolute bottom-0 w-full">
        <p>&copy; 2025 Aggie Airlines. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
