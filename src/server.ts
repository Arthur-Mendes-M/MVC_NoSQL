import express from "express"

import "express-async-errors"
require('dotenv').config()

import { routes } from "./routes" // private routes
import cors from "cors"

const server = express()
server.use(express.json())
// server.use(cors)

server.use(routes)

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})