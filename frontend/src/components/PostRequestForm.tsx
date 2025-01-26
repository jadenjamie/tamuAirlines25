"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function PostRequestForm() {
  const [inputData, setInputData] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResponse(null)
    setError(null)

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputData }),
      })

      if (!res.ok) {
        throw new Error("Failed to submit data")
      }

      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter data to post"
          required
          className="w-full h-32"
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {response && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Response:</h3>
          <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">{response}</pre>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  )
}

