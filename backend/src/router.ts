import { Router } from "express";
import { getAll, deleteUser, addUser, updateUser, getCurrentUser, updateFullUser,searchUsers } from "./controller.js";

const router = Router();

router.get("/users", getAll);
router.get("/users/:id", getCurrentUser);
router.get("/search", searchUsers)
router.delete("/users/:id", deleteUser);
router.post("/users", addUser);
router.patch("/users/:id", updateUser);
router.put("/users/:id", updateFullUser);


export default router;