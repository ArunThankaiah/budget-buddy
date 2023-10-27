const mongoose = require("mongoose")

const transactionchema = new mongoose.Schema({
    userid: {
        type: String,
        require: true, 

    },
    amount : {
        type : Number,
        require: [true, "require amount"]
    },
    type:{
        type: String,
        require: [true, "require type"]
   },
    category: {
        type : String,
        require: [true, "require category"]
  },
    description : {
        type : String,
        require: [true, "require description"]
   },
    date:{
        type: Date,
        require:[true, "require date"]
   }

},{ timeStamps: true})

const transactionModel = mongoose.model("transactions", transactionchema)

module.exports = transactionModel