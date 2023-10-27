const express = require("express")
const { 
    getAllTransaction, 
    addTransaction,
    editTransaction,
    deleteTransaction
 } = require("../Controller/transactionCntrl")

const router = express.Router()

//transaction router

//getall transaction get method

router.post("/get-transaction", getAllTransaction)

//add transatcion post menthod

router.post('/add-transaction', addTransaction)

//Edit transatcion post menthod

router.post('/edit-transaction', editTransaction)

//Edit transatcion post menthod

router.post('/delete-transaction/', deleteTransaction)



module.exports = router