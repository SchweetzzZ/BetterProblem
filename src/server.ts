import { createCoreApi } from "./main"

const app = createCoreApi()

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000")
})