
import { Elysia } from "elysia";
import { createCartValidation, idParamsValidation, updateCartValidation } from "./cart.validation";
import {createCart, updateCart, deletCart, getCartByUSerId} from "./service"
import {auth} from "../../modules/auth/auth"
import { success } from "better-auth/*";

export const cartRoutes = (app: Elysia) => app
    .post("/cart", async({body, set, request})=>{
        try{
            const session = await auth.api.getSession({
                headers: request.headers
            })
            if(!session){
                set.status=401
                return {success: false, message: "Unauthorized"}
            }
            const userId = session.user.id

            const data = await createCart(userId, body)
            set.status=201
            return {success: true, message: "Cart created successfully", data}
        }catch(error){
            set.status=500
            return {success: false, message: "Internal server error"}
        }
    },{
        body: createCartValidation
    })
    .put("/cart/:id", async({params, body, set, request})=>{
        try{
            const session = await auth.api.getSession({
                headers: request.headers
            })
            if(!session){
                set.status=401
                return {success: false, message:"Unauthorized"}
            }
            const userId = session.user.id
            
            const data = updateCart(userId, body, params.id)
            return {success: true, message:"Cart updated successfully", data}
        }catch(error){
            set.status=500
            return {success: false, message:"Internal server erro"}
        }
    },{
        body: updateCartValidation
    })
    .delete("/cart/:id", async({params, set, request})=>{
        try{
            const session = await auth.api.getSession({
                headers: request.headers
            })
            if(!session){
                set.status=401
                return {success: false, message:"Unauthorized"}
            }
            const userId = session.user.id
            const data = await deletCart(params.id, userId)
            return {success: true, message:"Cart deleted successfully", data}
        }catch(error){
            set.status=500
            return {success: false, message:"Internal server error"}
        }
    },{
        params: idParamsValidation
    })
    .get("/cart/:id", async({params, set, request})=>{
        try{
            const session = await auth.api.getSession({
                headers: request.headers
            })
            if(!session){
                set.status=201
                return {success: false, message:"Unauthorized"}
            }
            const userId = session.user.id

            const data = await getCartByUSerId(params.id, userId)
            return {success: true, message:"Cart retrieved successfully", data}
        }catch(error){
            set.status=500
            return {success: false, message:"Internal server error"}
        }
    })
