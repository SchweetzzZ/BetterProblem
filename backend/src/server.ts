
import { createCoreApi } from "./main"

const port = process.env.PORT ?? 3000

const app = createCoreApi()

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
})


/*import { createCoreApi } from "./main"

console.log("server.ts está sendo executado!")

const app = createCoreApi()

console.log("App criado com sucesso!")

app.listen(3000, () => {
  console.log("Server running on port 3000 | http:localhost:3000")
})*/