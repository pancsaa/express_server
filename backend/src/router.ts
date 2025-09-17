import { Router } from "express";
import { getUsers,deleteUser,addUser, updateUser } from "./controller.js";

 const router=Router()
 router.get("/users", getUsers)
 router.delete("/users/:id", deleteUser)
 router.post("/users", addUser)
 router.put("/users/:id",updateUser)

 export default router;