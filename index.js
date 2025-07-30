import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import router from './routers/router.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.listen(5000, () => console.log("Express connected to http://localhost:5000"));


 