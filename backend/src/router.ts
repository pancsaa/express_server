import { Router } from "express";
import { getUsers,deleteUser,addUser, updateUser, getCurrentUser,updateFullUser } from "./controller.js";

 const router=Router()
 router.get("/users", getUsers)
 router.delete("/users/:id", deleteUser)
 router.post("/users", addUser)
 router.patch("/users/:id",updateUser)
 router.put("users/:id",updateFullUser)
 router.get("users/:id" getCurrentUser)

 export default router;