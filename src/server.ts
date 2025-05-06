import express from "express"

const PORT = 3333

const app = express()

app.get("/products/:id/:user", (request, response) => { // o Nome que se dá dps dos ":" vc consegue recuperar direto de request.params
  const {id, user} = request.params

  response.send(`${id}, ${user}`)
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
