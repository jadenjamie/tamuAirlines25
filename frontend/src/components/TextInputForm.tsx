"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { submitText } from "./actions.ts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  )
}

export function TextInputForm() {
  const [result, setResult] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await submitText(formData)
    setResult(JSON.stringify(result, null, 2))
  }

  const lines = result?.split("\n");
  console.log(lines);

  return (
    <div className="max-w-1/2 mx-auto mt-10 text-2xl">
      <form action={handleSubmit} className="space-y-4 text-2xl">
        <Input 
        type="text" 
        name="text" 
        placeholder="Describe your dream destination. i.e. nightlife, beach, city" 
        required 
        className="w-full bg-white text-2xl" />
        <SubmitButton/>
      </form>
    </div>
  )
}



