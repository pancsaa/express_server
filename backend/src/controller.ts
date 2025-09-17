import express from "express";
import { getAllUser,createUsers } from "./model.js";

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
    if (id === 3)
        res.status(200).type("application/json").send({ message: "succesful!" })
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