const express = require ("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./ConfigDb/connectDb")

//DOTENV CONFIG
dotenv.config()

//DB connection
connectDb()

//APP
const app = express()
app.use(express.json())
app.use(cors())

//SERVER LISTEN
PORT = 7777 || process.env.PORT

//user router
app.use('/api/users', require('./Router/userRouter'))

//transaction routers
app.use('/api/transactions', require('./Router/transactionRoute'))




app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
})