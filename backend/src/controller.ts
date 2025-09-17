import express from "express";
import { getAllUser,createUsers, removeUser, modifiedUsers } from "./model.js";

export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const data = await getAllUser();
        res.status(200)
            .type("application/json")
            .send(data)
    } catch(error) {
        res.status(500)
            .type("application/json")
            .send({error:"ERROR!"})
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id!)
    const result=await removeUser(id);
    if(result)res.status(200).type("application/json").send({message: "We removed user succesfully!"});
    else res.status(500).type("application/json").send({message: "We couldn't remove user!"});
}

export const addUser = async (req: express.Request, res: express.Response) => {
    const newUSer = req.body;
    try{
        const user=await createUsers(newUSer);
        res.status(201).type("application/json").send(user)
    }catch(error){
        res.status(500).type("application/json").send("Nem sikerült létrehozni az új felhasználót!")
    }
}

export const updateUser=async(req: express.Request, res: express.Response)=>{
    const updateUsers=req.body;
    const id=parseInt(req.params.id!);
    try{
        const user=await modifiedUsers(id,updateUsers)
        res.status(201).type("application/json").send("We refreshed our database!")
    }catch(error){
        res.status(500).type("application/json").send("We couldn't refresh our database!")
    }
}