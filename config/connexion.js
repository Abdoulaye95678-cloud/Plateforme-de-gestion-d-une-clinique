import { Sequelize } from "sequelize";
// import {parsed} from 'dotenv/config'
import dotenv from 'dotenv'

//Acces aux informations du fichier .env
const ENV = dotenv.config().parsed
// console.log(ENV)

const connexion = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
    host: ENV.DB_HOST,
    dialect: ENV.DB_DIALECT,
    // port: DB_PORT
})

export default connexion