//Import des librairies
import express from "express";
import cors from 'cors'
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import dotenv from 'dotenv'

//Import des controllers

import database from "./config/connexion.js";

//Creation du serveur
const app = express()

//Lier les librairies
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Les routes



//Faire tourner le serveur
const PORT = dotenv.config().parsed.PORT

// connexion.sync()
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))