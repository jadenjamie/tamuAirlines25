import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Image from 'next/image';

interface TravelDestinationBoxProps {
  destination: string
}

export function TravelDestinationBox({ destination }: TravelDestinationBoxProps) {
  return (
    <Card className="w-1/4 h-fit">
      <CardContent className="p-4 flex items-center justify-center flex-col w-full">
        <p className="text-center font-semibold">{destination}</p>
        <div className="w-full">
          <Image
            src="/header.jpg"
            alt="Beautiful travel destination"
            layout="fill"
            priority
          />
            
        </div>
        <Button className="w-1/2">Book Now</Button>
      </CardContent>
    </Card>
  )
}
