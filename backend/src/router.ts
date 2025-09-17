import { Router } from "express";
import { getUsers,deleteUser,addUser } from "./controller.js";

 const router=Router()
 router.get("/users", getUsers)
 router.delete("/users/:id", deleteUser)
 router.post("/users", addUser)

 export default router;