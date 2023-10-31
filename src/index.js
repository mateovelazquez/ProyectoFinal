const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose')
require('dotenv').config();
const cors = require('cors')
const methodOverride = require('method-override')

const articleRouter = require('../routes/articles')
const Article = require('../models/articles')

app.set("view engine", "ejs")


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/', articleRouter)
app.use(cors());


app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({createAt: "desc"})
    res.render("index", {articles: articles})
})

//Conexion MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("Conectado a Base de Datos MongoDB Atlas"))
    .catch((err)=>console.log(err));


//Listen

app.listen(port,()=> console.log(`Prueba de servidor escuchando en puerto ${port}`))