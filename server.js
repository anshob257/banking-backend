    require("dotenv").config()
    const app=require("./src/app")
    const dbconnect=require("./src/config/db")

    dbconnect()

    app.listen(3000,()=>{
        console.log("sevrer running ")
    })