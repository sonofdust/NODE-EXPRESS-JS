const express = require('express')
const userRoutes = require('./src/user/routes')
const app = express();
const port = 3000
app.use(express.json())
app.get("/",(req,res)=>{res.send("Hell World!")})

app.use("/api/v1/users", userRoutes)

app.listen(port, ()=>{console.log(`App listening on port ${port}`)})



//You are connected to database "postgres" as user "postgres" on host "localhost" (address "::1") at port "5432".
