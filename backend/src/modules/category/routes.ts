import { Elysia } from "elysia"
import {createCategory, updateCategory, deletCategory, categoryAll, getCategoryById, getCategoryByName} from "./service"
import { createCategoryValidation, updateCategoryValidation, idParamsValidation } from "./category.validation"
import {auth} from "../../modules/auth/auth"

export const categoriesRoutes = (app: Elysia) => app
    .post("/category", async({body, set, request})=>{
        try{
            const session = await auth.api.getSession({
                headers: request.headers
            })
            if(!session){
                set.status=401
                return {success: false, message: "Unauthorized"}
            }
            const userId = session.user.id
            const data = await createCategory(userId, body)
            return {success: true, message: "Category created successfully", data}
        }catch(error){
            set.status=500
            return {success: false, message: "Internal server error"}
        }
    },{
        body: createCategoryValidation
    })
    .put("/category/:id", async({params, set, request, body})=>{
        try{
            const session = await auth.api.getSession({
                headers: request.headers
            })
            if(!session){
                set.status=401
                return {success: false, message:"Unaithorized"}
            }
            const userId = session.user.id
            const data = await updateCategory(params.id, body)
            return {success: true, message: "Category updated successfully", data}
        }catch(error){
            set.status=500
            return {success: false, message: "Internal server error"}
        }
    },{
        params: idParamsValidation,
        body: updateCategoryValidation
    })
    .delete("/category/:id", async({params, set, request})=>{
        try{
            const session = await auth.api.getSession({
                headers: request.headers
            })
            if(!session){
                set.status=401
                return {success: false, message:"Unauthorized"}
            }
            const userId = session.user.id
            const data = await deletCategory(userId,params.id)
            return {success: true, message: "Category deleted successfully", data}
        }catch(error){
            set.status=500
            return {success: false, message: "Internal server error"}
        }
    }) // ✅ /id/:id
    .get("/category", async()=>{
        const data = await categoryAll()
        return {success: true, message: "Category found successfully", data}
    })
    .get("/category/:id", async({params, set, request})=>{
        try{
            const session = await auth.api.getSession({
                headers: request.headers
            })
            if(!session){
                set.status=401
                return {success: false, message:"Unauthorized"}
            }
            const userId = session.user.id
        const data = await getCategoryById(userId, params.id)
        return {success: true, message: "Category found successfully", data}
    }catch(error){
        set.status=500
        return {success: false, message: "Internal server error"}
    }
    }, {params: idParamsValidation}) // ✅ /id/:id
.get("/category/name/:name", async ({ params, set }) => {
    try {
        const data = await getCategoryByName(params.name)
        return {
            success: true,
            message: "Category found successfully",
            data
        }

    } catch (error) {
        set.status = 404
        return { success: false, message: "Category not found" }
    }
})

