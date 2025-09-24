import mysql, { type ResultSetHeader } from "mysql2/promise";

// Adatbázis-kapcsolat (pool) létrehozása:

const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: "",
    database: "userdb"
});

// A felhasználó típusát deklaráljuk:
export interface User {
    id: number;
    nev: string;
    cim: string;
    szuletesiDatum: string | null;
};

// Összes felhasználó lekérése:
export const getUsers = async () => {
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users");
    return rows;
}

export const createUser = async (user: Omit<User, "id">) => {
    const [result] = await pool.query<mysql.ResultSetHeader>("INSERT INTO users (nev, cim, szuletesiDatum) VALUES (?,?,?)", 
        [user.nev, user.cim, user.szuletesiDatum]);

    const insertedId = result.insertId;
    return {...user, id: insertedId};
}

export const removeUser = async (id: number) => {
    const [result] = await pool.query<mysql.ResultSetHeader>("DELETE FROM users WHERE id=?", [id]);
    
    return result.affectedRows > 0;
}

export const modifiedUser = async (id: number, user: Partial<User>) => {
    let currentUser;
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * from users WHERE id = ?", [id]);
    currentUser = rows[0] ?? null;
    if (!currentUser) return false;
    else {
        const updatedUser = {
        id: id,
        nev: user.nev ?? currentUser!.nev,
        cim: user.cim ?? currentUser!.cim,
        szuletesiDatum: user.szuletesiDatum ?? currentUser!.szuletesiDatum
    } 

    const [result] = await pool.query<mysql.ResultSetHeader>("UPDATE users SET nev = ?, cim = ?, szuletesiDatum = ? WHERE id = ?", [updatedUser.nev, updatedUser.cim, updatedUser.szuletesiDatum, id]);
    return result.affectedRows > 0;
    }   
}

export const getUserById = async (id: number) => {
    const [rows] = await pool.query<mysql.RowDataPacket[]>("SELECT * FROM users WHERE id=?", [id]);
    // Ha nincs user, akkor null ad vissza! A controller-ben úgy kezelem, hogy if (!user) akkor 404-es hibkód...
    return rows[0] ?? null;
}

export const modifiedFullUser=async(Userid:number, userData:User)=>{
    let [rows]=await pool.query<mysql.ResultSetHeader>("UPDATE users set nev=?,cim=?,szuletesiDatum=? WHERE id=?",[userData.nev,userData.cim,userData.szuletesiDatum, Userid])
    if(rows.affectedRows ===0){
        [rows]=await pool.query<mysql.ResultSetHeader>("INSERT INTO users (nev, cim, szuletesiDatum) VALUES (?,?,?)", 
        [userData.nev, userData.cim, userData.szuletesiDatum])
        return {...userData, id:rows.insertId};
    }else{
        return {...userData, id:Userid}
    }
}

export const findUsersBySearch=async(search:string)=>{
    if(!search){
        const [rows]=await pool.query<mysql.RowDataPacket[]>("SELECT * from users")
        return rows;
    }else{
        const [rows]=await pool.query<mysql.RowDataPacket[]>("SELECT * from users WHERE cim like ?",[`%${search}%`])
        return rows;
    }
}