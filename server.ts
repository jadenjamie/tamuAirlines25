import express from "express"

const app = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
  res.send("Hello !!!")
})

app.listen(port, () => console.log(`Server is running`))