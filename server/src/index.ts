import express  from "express";
import dotenv from 'dotenv'
import { authRoutes } from "./routes";
import { connectDB } from "./database";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 7070

app.use(express.json())
connectDB();

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {console.log(`Servidor corriendo -->> https://localhost:${PORT}`)})