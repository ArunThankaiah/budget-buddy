const transectioModel = require('../models/transactionModel')
const moment = require('moment')

//All transaction control
const getAllTransaction = async(req,res)=>{
    try{
        const{selectDate, customDate,type, category } = req.body
        
        const transaction = await transectioModel.find({
           ...(selectDate !== 'customs' ? {
            date : {
                $gt : moment().subtract(Number(selectDate), 'd').toDate(),
            }
           } : {
                date: {
                    
                    $gte: moment(customDate[0]).subtract(1, "days"),
                    $lte: customDate[1]
                }
           }),
            userid: req.body.userid, 
            ...(type !== 'all' && {type}),
            ...(category !== 'all' && {category})
        })
        res.status(200).json(transaction)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

//Edit transaction control
const editTransaction = async( req,res )=>{
    try {
        await transectioModel.findOneAndUpdate(
          { _id: req.body.transacationId },
          req.body.payload
        );
        res.status(200).send("Edit SUccessfully");
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
}

//Delete transaction control
const deleteTransaction = async(req,res)=>{
    try{
        await transectioModel.findOneAndDelete({_id:req.body.transactionId});
        res.status(200).send("Transaction delete successfully....!")
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

//New transaction contrl
const addTransaction = async(req, res)=> {
    try{
        const newTransection = new transectioModel(req.body)
        await newTransection.save();
        res.status(200).send('Transection Created Successfully')
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
    
}




module.exports = {getAllTransaction, addTransaction , editTransaction,deleteTransaction}