"use server"

export async function submitText(formData: FormData) {
  const text = formData.get("text")

  // Here you would typically send this data to an API or database
  // For this example, we'll just simulate a POST request
  const response = await fetch("https://air.jarenmchugh.com/search", {
    method: "POST",
    body: JSON.stringify({ title: "input", body: text, userId: 1 }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })

  const result = await response.json()
  return result
}
