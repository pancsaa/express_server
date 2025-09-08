import express from "express";
import cors from "cors";

const PORT=8000;
const HOST= "127.0.0.1";

//Server indítása:
const server=express();
server.listen(PORT,()=>{
    console.log(`The server is running at http://${HOST}:${PORT} !`);
    //Corse problémák kezelése(csak fejlesztési időben:minden kérést engedélyezünk):
    server.use(cors());
    server.use(express.json())
})