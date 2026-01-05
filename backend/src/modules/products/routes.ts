import { Elysia } from "elysia"
import {auth} from "../../modules/auth/auth"
import { createProductValidation } from "./products.validation"
import { createProduct, updateProduct,getProductByUserId,deletProducts,gettAllProducts } from "./services"
import { idParamsValidation, updateProductValidation } from "./products.validation"

export const productsRoutes = (app: Elysia) => app
  .post("/products", async({body, set, request}) => {
    try{
      const session = await auth.api.getSession({
        headers: request.headers
      })
      if(!session){
        set.status = 401
        return {success: false, message: "Unauthorized"}
      }
      const userId = session.user.id

      const data = await createProduct(userId, body)
        set.status = 201
        return {success: true, message: "Produto criado com sucesso", data}
    } catch (error) {
        console.log(error)
        set.status = 500
        return {error: "Internal Server Error"}
    }
  },{
    body: createProductValidation
  })
  .put("/products/:id", async({body, set, request, params}) => {
    try{
      const session = await auth.api.getSession({
        headers: request.headers
      })

      if(!session){
        set.status=401
        return {success: false, message: "Unauthorized"}
      }
      const userId = session.user.id
      
      const data = await updateProduct(params.id, userId, body)
      set.status = 200
      return {success: true, message: "Produto atualizado com sucesso", data}
    } catch (error) {
      console.log(error)
      set.status = 500
      return {error: "Internal Server Error"}
    }
  },
  {
    body: updateProductValidation,
    params: idParamsValidation
  }
  )
  .get("/products/:id", async({params, set, request})=> {
    try{
      const session = await auth.api.getSession({
        headers: request.headers
      })
    if(!session){
      set.status = 401
      return {success: false, message: "Unauthorized"}
    }
    const userId = session.user.id
    const data = await getProductByUserId(params.id, userId)
    set.status = 200
    return {success: true, message: "Produtos encontrados com sucesso", data}
    } catch (error) {
      console.log(error)
      set.status = 500
      return {error: "Internal Server Error"}
    }
  },
{
  params: idParamsValidation
})

  .get("/products", async()=>{
    const data = await gettAllProducts()
    return {success: true, message: "Produtos encontrados com sucesso", data}
  })

  .delete("/products/:id", async({params, set, request})=> {
    try{
      const session = await auth.api.getSession({
        headers: request.headers
      })
      if(!session){
        set.status= 401
        return {success: false, message:"Unauthorized"}
      }
      const userId = session.user.id
      
      const data = await deletProducts(params.id, userId)
      set.status= 201
      return {success: true, message:"Produto deletado com sucesso", data}
    } catch (error) {
      console.log(error)
      set.status = 500
      return {error: "Internal Server Error"}
    }
  },
  {
    params: idParamsValidation
  })