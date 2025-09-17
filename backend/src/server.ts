import express from "express";
import cors from "cors";
import * as path from "node:path"
import * as url from "node:url"
import router from "./router.js";

const PORT=8000;
const HOST= "127.0.0.1";

//Server indítása:
const server=express();
//const __filename=url.fileURLToPath(import.meta.url)
const __dirname=import.meta.dirname
const staticFilesUrlDir=path.join(__dirname, "..","dist",)

//cors problémákra - csak fejlesztési időben: minden kérést engedélyezünk
//Corse problémák kezelése(csak fejlesztési időben:minden kérést engedélyezünk):
server.use(cors());
server.use(express.json())

//statikus állományok(a szerver csak küldi ezeket) küldése a kliens felé:
server.use(express.static(staticFilesUrlDir))
//console.log("Router: "+router)
//többi kérés - a REST API-hoz illeszkedő kérések irányítása:
server.use("/api", router)

server.listen(PORT,()=>{
    console.log(`The server is running at http://${HOST}:${PORT} !`);
})