import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import router from './routers/router.js'
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";


const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "build")));
app.use(router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(5000, () => console.log("Express connected to http://localhost:5000"));


 