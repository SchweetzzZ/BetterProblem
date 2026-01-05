import { Elysia } from "elysia"
import {createOrderValidation, updateOrderValidation, idParamsValidation} from "./order.validation"
import {createOrder, updateOrder, deleteOrder, getOrdersByUserId, getAllOrders} from "./service"
import {auth} from "../../modules/auth/auth"

export const orderRoutes = (app: Elysia) => app
    .post("/order", async({body, set, request})=> {
     try{
          const session = await auth.api.getSession({
               headers: request.headers
          })
          if(!session){
               set.status=401
               return {success: false, message: "Unauthorized"}
          }
          const userId = session.user.id

          const data = await createOrder(userId, body)
          set.status=200
          return { success: true, message:"Pedido criado com sucesso", data}
     } catch (error) {
          console.log(error)
          set.status=5001
          return {error: "Internal Server Error"}
     }
    },{
     body: createOrderValidation
    })
    .put("/order/:id", async({body, set, request, params})=>{
     try{
          const session = await auth.api.getSession({
               headers: request.headers
          })
          if(!session){
               set.status=401
               return {success: false, message:"Unauthorized"}
          }
          const userId = session.user.id
          const data = await updateOrder(params.id, body, userId)
          set.status=200
          return {success: true, message: "Pedido atualizado com sucesso", data}
     }    
     catch (error) {
          console.log(error)
          set.status=500
          return {error: "Internal Server Error"}
     }
    },{
     params: idParamsValidation,
     body: updateOrderValidation
    })
    .delete("/order/:id", async({body, set, request, params})=>{
     try{
          const session = await auth.api.getSession({
               headers: request.headers
          })
          if(!session){
               set.status=401
               return {success: false, message:"Unauthorized"}
          }

          const userId = session.user.id

          const data = await deleteOrder(params.id, userId)

          set.status=200
          return {success: true, message: "Pedido deletado com sucesso", data}
     }
     catch (error) {
          console.log(error)
          set.status=500
          return {error: "Internal Server Error"}
     }
    },
    {
     params: idParamsValidation
    })
    .get("/order/:id", async({params, set, request})=>{
     try{
          const session = await auth.api.getSession({
               headers: request.headers
          })
          if(!session){
               set.status=201
               return {success: false, message: "Unauthorized"}
          }
          const userId = session.user.id
          const data = await getOrdersByUserId(params.id, userId)
          set.status=200
          return {success: true, message: "Pedido encontrado com sucesso", data}
     }
     catch (error) {
          console.log(error)
          set.status=500
          return {error: "Internal Server Error"}
     }
    },
    {
     params: idParamsValidation
    })
    .get("/order", async({set}) => {
     try {
          const data = await getAllOrders()
          if(!data){
               set.status=400
               return {success: false, message:"order nao encontrada"}
          }
          set.status=201
          return {success: true, message:"order encontrada com sucesso",data}
     }
     catch (error) {
          console.log(error)
          set.status=500
          return {error: "Internal Server Error"}
     }
    })