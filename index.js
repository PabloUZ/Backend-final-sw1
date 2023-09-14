import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import { connection } from "./config/database.js";


const start = async() => {
    try {
        await connection()  .then(() => console.log('Connection successful'))
                            .catch((err) => {
                                throw new Error("Connection error: " + err);
                            });

        const app = express();

        app.use(cors());




        app.listen(PORT, ()=>{
            console.log("Server is UP!");
        })
    }
    catch(e){
        console.log("Server is DOWN!\n"+e.message);
    }
}
start();
