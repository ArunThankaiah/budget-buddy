import { Progress } from 'antd';
import React from 'react'

const Analytics = ({allTransaction}) => {

    //Categry grid
    const categories = [
        'Salary',
        'Entertainment',
        'Grocery',
        'Travel',
        'Shopping',
        'Bill',
        'Other'
    ]

    //Transection Diagram
    const totalTransaction = allTransaction.length;
    const totalIncomeTransaction = allTransaction.filter(
        (transaction)=> transaction.type === 'Income'
    );
    const totalExpenseTrnasaction = allTransaction.filter(
        (transaction)=>transaction.type === 'Expense'
    );
    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100 ;
    const totalExpensePercent = (totalExpenseTrnasaction.length/ totalTransaction) * 100 ;

    //Total Turnover
    const totalTurnover = allTransaction.reduce(
        (acc, tracsaction)=> acc + tracsaction.amount, 0);
       
    const totalIncomeTurnover = allTransaction.filter(
        (transation) => transation.type === 'Income'
        ).reduce((acc,transaction)=> acc + transaction.amount,0 ) ;   

    const totalExpenseTurnover = allTransaction.filter(
        (transaction)=> transaction.type === 'Expense'
        ).reduce((acc, transaction)=> acc + transaction.amount, 0);
    
    const totalIncomeTunoverPercent = (totalIncomeTurnover / totalTurnover) * 100

    const totalExpenseTunoverPersent = (totalExpenseTurnover / totalTurnover) * 100

  return (
    <>
    <div className='w-full text-sm   lg:w-full flex  h-max  justify-center align-items-center border border-black rounded-md bg-white '>
    <div className="w-full lg:w-1/2 flex flex-col">
        <div className='w-mx-sm  m-5 p-5 rounded-md boxsh  shadow-lg shadow-gray-500 border'>
        <span className='font-bold text-xl mb-2 b'>
                Total Transaction : {totalTransaction}
            </span>
        
            <div className='pt-2'>
                <p className='text-green-800 font-bold'>Income : {totalIncomeTransaction.length}</p>
            </div>

            <div className='pt-2'>
                <p className='text-red-700 font-bold'>Expense : {totalExpenseTrnasaction.length}</p>
            </div>

            <div className='flex mt-5 '>
                <div>
                <Progress 
                type='circle'
                strokeColor={'green'}
                className='mx-2'
                percent={totalIncomePercent.toFixed(0)}
                />
                </div>
                
                <div>
                <Progress 
                type='circle'
                strokeColor={'red'}
                className='mx-2'
                percent = {totalExpensePercent.toFixed(0)}
                />
                </div>
                
                </div>
        </div>
        
        <div className='w-max-sm m-5 p-5 rounded-md boxsh  shadow-lg shadow-gray-500 border  '>
        <span className='font-bold text-xl mb-2 b'>
                Total Turnover : {totalTurnover}
            </span>
            <div className='pt-2'>
                <p className='text-green-800 font-bold'>Income : {totalIncomeTurnover}</p>
            </div>
            <div className='pt-2'>
                <p className='text-red-700 font-bold'>Expense : {totalExpenseTurnover}</p>
            </div>
            <div className='mt-5 flex'>
                <div>
                <Progress 
                type='circle'
                strokeColor={'green'}
                className='mx-2'
                percent={totalIncomeTunoverPercent.toFixed(0)}
                />
                </div>
                <div>
                <Progress 
                type='circle'
                strokeColor={'red'}
                className='mx-2'
                percent = {totalExpenseTunoverPersent.toFixed(0)}
                />
                </div>
        </div>

        </div>
    </div>

    <div className="w-full lg:w-1/2 flex flex-col">
    <div className='w-mx-sm  m-5 p-5  rounded-md boxsh  shadow-lg shadow-gray-500 border'>
    <span className='font-bold text-xl mb-2 b'>
                Categories wise income
            </span>
            <div className='mt-5'>
            {
               categories.map((category) =>{
                const amount = allTransaction.filter(
                    (transaction) => transaction.type === 'Income' &&
                    transaction.category === category 
                    ).reduce((acc, transaction)=> acc + transaction.amount, 0);
                    return(
                       amount > 0 && (
                        <div>
                        <span className='p-10'>
                        {category}
                        </span>
                        <div className='px-10'>
                        <Progress
                        percent={((amount / totalIncomeTurnover ) * 100).toFixed(0)}
                        />
                        </div>
                        
                       </div>
                       )
                       
                    )
               }) 
            }
            </div>
        </div>
        <div className='w-mx-sm  m-5 p-5  rounded-md boxsh  shadow-lg shadow-gray-500 border'>
    <span className='font-bold text-xl mb-2 b'>
                Categories wise Expense
            </span>
            <div className='mt-5'>
            {
               categories.map((category) =>{
                const amount = allTransaction.filter(
                    (transaction) => transaction.type === 'Expense' &&
                    transaction.category === category 
                    ).reduce((acc, transaction)=> acc + transaction.amount, 0);
                    return(
                       amount > 0 && (
                        <div>
                        <span className='p-10'>
                        {category}
                        </span>
                        <div className='px-10'>
                        <Progress
                        percent={((amount / totalIncomeTurnover ) * 100).toFixed(0)}
                        />
                        </div>
                        
                       </div>
                       )
                       
                    )
               }) 
            }
            </div>
        </div>
        
    </div>
   
    </div>
    
    
    
    
    
    </>

   
  )
}

export default Analytics
