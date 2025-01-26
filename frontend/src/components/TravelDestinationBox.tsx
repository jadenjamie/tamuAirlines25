import { Card, CardContent } from "@/components/ui/card"

interface TravelDestinationBoxProps {
  destination: string
}

export function TravelDestinationBox({ destination }: TravelDestinationBoxProps) {
  return (
    <Card className="w-full h-full">
      <CardContent className="p-4 flex items-center justify-center">
        <p className="text-center font-semibold">{destination}</p>
      </CardContent>
    </Card>
  )
}
