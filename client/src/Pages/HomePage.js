import React, { useEffect, useState} from 'react'
//ant design 
import {Form, Input, Modal, Select, Table, message, DatePicker} from 'antd'
//ant design icons
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
//Header
import Layout from '../Components/Layout';
//Date formation
import moment from 'moment';
//axios
import axios from 'axios'
//Diagram import
import Analytics from '../Components/Analytics';



//Custom date 
const {RangePicker} = DatePicker

const HomePage = () => {
  //New transaction from modal
  const [showModal, setShowModal] = useState(false)
  //all transaction
  const [allTransaction, setAllTransaction] = useState([])
  //select date
  const [selectDate, setSelectDate] = useState('30')
  //Custom date 
  const [customDate, setCustomDate] = useState([])
  //form reset
  const [form] = Form.useForm();
  //Filter Type
  const [type, setType] = useState("all")
  //Filter Category
  const [category, setCategory] = useState('all')
  //Diagram chart
  const [viewData,setViewData] = useState('table')
  //Edit Transer
  const [editTable, setEditTable] = useState(null)

  //Table header
  const colums = [
    {
      title: "Date",
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>,
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),

    },
    {
      title: "Amount",
      dataIndex: 'amount',

    },
    {
      title: "Type",
      dataIndex: 'type'
    },
    {
      title: "Category",
      dataIndex: 'category',
    
    },
    {
      title: "Description",
      dataIndex: 'description',
      
    },
    {
      title: "Action",
      render : ( record)=>(
        <div className=''>
            <EditOutlined
             className='mx-1 text-blue-600 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-300 ...'
             onClick={()=>{
              setEditTable(record)
              setShowModal(true)
             }}
             />
        
           <DeleteOutlined 
           className='mx-1 text-red-800 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  hover: duration-300 ...'
           onClick={()=>{
            handleDelete(record)
          }}
           />
        </div>
      )
        
      
    }
  ]

//Get all transaction

  //UseEffect
  useEffect(()=>{
    const getAllTransaction = async()=>{
      try{
        
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await axios.post('/api/transactions/get-transaction/',{
          userid: user._id,
          selectDate,
          customDate,
          type, 
          category
          
        });
        setAllTransaction(res.data);
        
      }catch(error){
        console.log(error);
        message.error("Fech Issue with transaction")
      }
    }
    
    getAllTransaction()
  },[selectDate, customDate, type, category, setAllTransaction])

 
  //New transaction from handle submit
  const handleSubmit = async(values)=>{
    try{
      const user = JSON.parse(localStorage.getItem('user'))
      if(editTable){
        await axios.post('/api/transactions/edit-transaction',{
        
          payload:{
            ...values,
            userId: user._id
          },
          transacationId: editTable._id,
          
        });
        message.success("Transaction update successfully")
        
      }else{
      await axios.post('/api/transactions/add-transaction',
      {...values, userid: user._id});
      message.success("Trasection added successfully",)
      }
      setShowModal(false)
      setEditTable(null)
      form.resetFields()
    }catch(error){
      console.log(error);
      message.error("Faild to transection")
      
    }
  
  }
  //Delete Transaction
const handleDelete = async(record)=>{
  try{
    await axios.post("/api/transactions/delete-transaction",
    {transactionId: record._id })
    message.success("Transaction delete successfully")
  }catch(error){
    console.log(error);
    message.error("Faild to delete")
  }
}

  return (
    <>
     <Layout>
       <div className='container '>
          <section className='w-auto  text-1xl lg:mx-16 px-16 flex justify-between bg-gray-600 p-5 py-auto mt-3 rounded-md'>

         <div className='text-xs px-5 lg:text-lg'>
          <span className='flex text-white' >Select Date</span>
          <Select value={selectDate} onChange={(value)=>setSelectDate(value)} className='text-sm w-10 lg:w-auto text-md'  >
            <Select.Option value='7'>Last one week</Select.Option>
            <Select.Option value='30'>Last one month</Select.Option>
            <Select.Option value='360'>Last one year</Select.Option>
            <Select.Option value='customs'>Customs</Select.Option>           
           </Select>
           {selectDate === "customs" && (
            <RangePicker
            value={customDate}
            onChange={(value)=>setCustomDate(value)}
            />
           )}
         </div>
         <div className='text-xs px-5 lg:text-lg'>
          <span className='flex text-white' >Select Type</span>
          <Select value={type} onChange={(value)=>setType(value)} className='text-sm w-10 lg:w-32 text-md'>
            <Select.Option value='all'>All</Select.Option>
            <Select.Option value='Income'>Income</Select.Option>
            <Select.Option value='Expense'>Expense</Select.Option>
                     
           </Select>
           {selectDate === "customs" && (
            <RangePicker
            value={customDate}
            onChange={(value)=>setCustomDate(value)}
            />
           )}
         </div>
         <div className='text-xs px-5 lg:text-lg'>
          <span className='flex text-white' >Select Category</span>
          <Select value={category} onChange={(value)=>setCategory(value)} className='text-sm w-10 lg:w-32 text-md'>
              <Select.Option value = 'all'>All</Select.Option>
              <Select.Option value = 'Salary'>Salary</Select.Option>
              <Select.Option value = 'Entertainment'>Entertainment</Select.Option>
              <Select.Option value = 'Grocery'>Grocery</Select.Option>
              <Select.Option value = 'Travel'>Travel</Select.Option>
              <Select.Option value = 'Shopping'>Shopping</Select.Option>
              <Select.Option value = 'Bill'>Bill</Select.Option>
              <Select.Option value = 'Other'>Other</Select.Option>
                     
           </Select>
           {selectDate === "customs" && (
            <RangePicker
            value={customDate}
            onChange={(value)=>setCustomDate(value)}
            />
           )}
         </div>
         <div className=' w-auto text-white border border-white p-3 mt-3 rounded-md'>
          <UnorderedListOutlined className={`text-xs lg:mx-2 className='text-sm lg:text-md' ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setViewData('table')}/>
          <AreaChartOutlined className={`text-xs mx-2 className='text-sm lg:text-md' ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={()=>setViewData('analytics')}/>

         </div>
         <div className='addnew-button mt-5 '>
         <button onClick={()=>setShowModal(true)}
          className='hidden lg:flex bg-teal-600 py-2 px-3 rounded-md text-white transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-teal-700 duration-300 ...'>
           <span className='pr-1 hidden lg:block'> Add New</span> 
          </button>
          <button className='flex lg:hidden' onClick={()=>setShowModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
         </div>
          </section>

         <section className='container p-5'>
          <div className='mx-16 bg-gray-400 rounded-md '>
           {viewData === 'table' ?
            <Table  
             columns={colums} dataSource={allTransaction} />
            : <Analytics allTransaction= {allTransaction} />
          }
          </div>
          
          <Modal 
          title = {editTable ? "Edit Transaction" : "Add Transaction"}
          open = {showModal}
          onCancel={()=>setShowModal(false)}
          footer ={false}
          >
           <Form 
           layout='vertical' autoComplete="off" 
           onFinish={handleSubmit} 
           initialValues={editTable}
           form={form}
           
           >

            <Form.Item label='Amount' name='amount' rules={[{ required: true, message: 'Please input your amount!' }]}>
              <Input type='number'/>
            </Form.Item>

            <Form.Item  label = "Type" name ='type' rules={[{ required: true, message: 'Please input your type!' }]}>
              <Select>
              <Select.Option value = 'Income'>Income</Select.Option>
              <Select.Option value = 'Expense'>Expense</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label = "Category" name ='category' rules={[{ required: true, message: 'Please input your category!' }]}>
              <Select>
              <Select.Option value = 'Salary'>Salary</Select.Option>
              <Select.Option value = 'Entertainment'>Entertainment</Select.Option>
              <Select.Option value = 'Grocery'>Grocery</Select.Option>
              <Select.Option value = 'Travel'>Travel</Select.Option>
              <Select.Option value = 'Shopping'>Shopping</Select.Option>
              <Select.Option value = 'Bill'>Bill</Select.Option>
              <Select.Option value = 'Other'>Other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label='Date' name='date' rules={[{ required: true, message: 'Please input your date!' }]}>
              <Input type='date'/>
            </Form.Item>

            <Form.Item label='Description' name='description' rules={[{ required: true, message: 'Please input your description!' }]}>
              <Input type='text'/>
            </Form.Item>

            <div className='flex justify-end'>
              <button type ='submit' className='bg-teal-600 py-2 px-3 rounded-md text-white'>Save</button>
            </div>
           </Form>
          </Modal>
         
         </section>
          
         
       </div>
    </Layout> 
    </>
  )
}

export default HomePage
