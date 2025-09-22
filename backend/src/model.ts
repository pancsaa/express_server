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
    const [rows]=await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users")
    return rows;
 }

 //uj user letrehozása
 export const createUsers=async(user: Omit<User, "id">)=>{
    const [result]=await pool.query<ResultSetHeader>("INSERT INTO users (nev,cim,szuletesiDatum) VALUES (?,?,?)",
        [user.nev, user.cim, user.szuletesiDatum]);
    const insertedId=result.insertId;
    return {...user, id:insertedId}
 }

 //user törlése
export const removeUser=async(id:number)=>{
   const [result]=await pool.query<mysql.ResultSetHeader>("DELETE FROM users WHERE id=?", [id])
   return result.affectedRows>0;
}

//user módosítása
export const modifiedUsers=async(id:number,user: Partial<User>)=>{
   let currentUser;
   const [actualUser]=await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users WHERE id=?",[id])
   if(actualUser.length===0){
      currentUser=actualUser[0]
      console.log(currentUser, typeof currentUser)
   }
   const updatedUser={
      id:id,
      nev:user.nev ?? currentUser!.nev,
      cim:user.cim ?? currentUser!.cim,
      szuletesiDatum:user.szuletesiDatum ?? currentUser!.szuletesiDatum,
   }
   const [resultUser]=await pool.query<mysql.ResultSetHeader>("UPDATE users SET nev = ?, cim = ?, szuletesiDatum = ? WHERE id=?", [updatedUser.nev,updatedUser.cim,updatedUser.szuletesiDatum, id])
   return {...user, id:resultUser.insertId};
}

export const getUserById=async(id:number)=>{
   const[rows]=await pool.query<mysql.RowDataPacket[]>
}