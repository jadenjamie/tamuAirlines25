"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { TravelDestinationBox } from "@/components/TravelDestinationBox"

export default function Search() {
  const [inputValue, setInputValue] = useState("")
  const [destinations, setDestinations] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddDestination = () => {
    if (inputValue.trim() !== "") {
      setDestinations([...destinations, inputValue.trim()])
      setInputValue("")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950">
      <div className="grow container mx-auto p-4 bg-neutral-950">
        <h1 className="text-4xl font-bold mb-4 text-white text-center">Dream Destination Finder</h1>
        <div className="flex flex-col mb-4 bottom-10 mx-auto text-white w-1/2 h-auto">
          <Textarea placeholder="Describe your dream destination. i.e. beach, nightlife, city">
          </Textarea>
          <Button onClick={handleAddDestination} className="font-bold w-1/4 mx-auto my-2">Search For Destinations</Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map((destination, index) => (
            <TravelDestinationBox key={index} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  )
}
