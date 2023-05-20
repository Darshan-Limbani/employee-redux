const express = require('express');
const app = express();
const employeeRouter = require('./routes/employeeRoutes')
const cors =require('cors')


app.use(cors({origin:'http://localhost:3001'}))
app.use(express.json())
app.use('/employee',employeeRouter)

module.exports = app;