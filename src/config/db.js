const mongoose=require("mongoose")


function dbconnect(){
    mongoose.connect(process.env.MONGO_DB)
    .then(()=>{
        console.log("db connected")
    })
    .catch((err)=>{
        console.log("err connecting db")
        process.exit(1)
    })
}
module.exports=dbconnect