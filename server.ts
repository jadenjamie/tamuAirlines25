import express from "express"
import { getResponseFromLLM } from "./src/llm"

const app = express()
app.use(express.json())
const port = process.env.PORT

app.post('/', async (req: Request, res: Response, next) => {
  if(!req.body) return next({ 
    status: 400,
    message: "input is required"
  })
  
  const response = await getResponseFromLLM(req.body.input)

  res.json(response)
})

await app.listen(port, () => console.log(`Server is running`))