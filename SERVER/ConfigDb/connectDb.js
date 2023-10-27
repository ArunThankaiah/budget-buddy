const mongoose = require("mongoose")

const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Db connect ${mongoose.connection.host}`);
    }catch(error){
        console.log(`${error}`);
    }
}

module.exports = connectDb