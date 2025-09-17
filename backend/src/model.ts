import mysql, { type ResultSetHeader } from "mysql2/promise";

//adatbázis-kapcsolat (pool) létrehozása:
 const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"userdb"
 })

 //a felhasználó típusát deklaráljuk(létrehozzuk)
 export interface User{
    id:number;
    nev:string;
    cim:string;
    szuletesiDatum:string|null
 }

 //összes felhasználó lekérése:
 export const getAllUser= async()=>{
    const [rows]=await pool.query("SELECT * FROM users")
    return rows;
 }

 export const createUsers=async(user: Omit<User, "id">)=>{
    const [result]=await pool.query<ResultSetHeader>("INSERT INTO users (nev,cim,szuletesiDatum) VALUES (?,?,?)",
        [user.nev, user.cim, user.szuletesiDatum]);
    const insertedId=result.insertId;
    return {...user, id:insertedId}
 }