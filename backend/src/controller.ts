import express, { response } from 'express';
import { createUser, getUsers, removeUser, modifiedUser, getUserById, modifiedFullUser,findUsersBySearch } from './model.js';

export const getAll = async (req: express.Request, res: express.Response) => {
    try {
        const data = await getUsers();
        res.status(200)
            .type("application/json")
            .send(data);
    }catch(error) {
        res.status(500).type("application/json").send({error: "Users request failed"});
    }
    
}

export const addUser = async (req: express.Request, res: express.Response) => {
    const newUser = req.body;
    try{
        const user = await createUser(newUser);
        res.status(201).type("application/json").send(user);
    } catch (error) {
        res.status(500).type("application/json").send({error: "Nem sikerült létrehozni az újn felhasználót!"});
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id!);
    const result = await removeUser(id);

    if(result) res.status(200).type("application/json").send({message: "Removed successfully"});
    else res.status(500).type("application/json").send({error: "Failed to remove"});
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    const updateUser = req.body;
    const id = parseInt(req.params.id!, 10);
    let response;
    try{
        const result = await modifiedUser(id, updateUser);
        response = result ? {message: "Successful operation"} : {error: "Failed operation"}
        res.status(201).type("application/json").send(response);
    }catch(error) {
        res.status(500).type("application/json").send(response);
    }
}

export const getCurrentUser = async (req: express.Request, res: express.Response) => {
    const id = parseInt(req.params.id!, 10);
    try{
        const user = await getUserById(id);
        // Ha null érkezik, akkor nincs olyan felhasználó...
        if (!user) return res.status(404).type("application/json").send({error: "A felhasználó nem található."})

        return res.status(200).type("application/json").send(user);
    } catch(error) {
        res.status(500).type("application/json").send({error: "Szerverhiba."})
    }
}

export const updateFullUser = async (req: express.Request, res:express.Response) => {
    const data = req.body;
    //console.log(data) a "data" objektumként jelenik meg
    const id = Number(req.params.id);
    try{
        const result=await modifiedFullUser(id,data)
            return res.status(200).type("application/json").send({message:result})
    } catch(error) {
        res.status(503).type("application/json").send({message:"ERROR! - Internal server error"})
    }
}

export const searchUsers=async(req:express.Request, res:express.Response)=>{
    try{
    const url=req.query.search ? String(req.query.search):"";
    console.log(req.query)
    const users=await findUsersBySearch(url)
    return res.send(users)
    }catch(error){
        res.status(503).type("application/json").send({message:"ERROR! - Internal server error"})
    }
}