import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import CustomModal from "../components/CustomModal";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from "axios";
import { Table, DatePicker } from "antd";
import moment from "moment";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [viewData, setViewData] = useState('table');
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [editTransactionData, setEditTransactionData] = useState("");
  const [type, setType] = useState("all");
  const [transactionData, setTransactionData] = useState({
    amount: "",
    type: "income",
    category: "salary",
    reference: "",
    description: "",
    date: "",
  });

  const [allTransactions, setAllTransactions] = useState([]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <EditOutlined 
            className="text-blue-500 cursor-pointer transition-all duration-300 transform hover:scale-125 hover:text-blue-600"
            onClick={() => {
              setShowModal(true);
              setEditable(true);
              setEditTransactionData(record);
            }} 
          />
          <DeleteOutlined 
            className="text-red-500 cursor-pointer transition-all duration-300 transform hover:scale-125 hover:text-red-600"
            onClick={() => handleDelete(record)} 
          />
        </div>
      )
    },
  ];

  const closeModal = () => {
    setShowModal(false);
  };

  const submitHandler = async (e) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user._id;
    e.preventDefault();
    const newTransactionData = { ...transactionData, userid: userId };
    try {
      setLoading(true);
      let response;
      if (editable) {
        response = await axios.post("/transactions/editTransaction", editTransactionData);
      } else {
        response = await axios.post("/transactions/addTransaction", newTransactionData);
      }
      // Update state with the new transactions after adding/editing
      const updatedTransactions = await axios.post("/transactions/getAllTransaction", {
        userid: userId,
        frequency,
        selectedDate,
        type,
      });
      setAllTransactions(updatedTransactions.data);
      setLoading(false);
      closeModal();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transactions/deleteTransaction", record);
      // Fetch transactions again to reflect the deletion
      const user = JSON.parse(sessionStorage.getItem("user"));
      const updatedTransactions = await axios.post("/transactions/getAllTransaction", {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setAllTransactions(updatedTransactions.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const getTransactions = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(sessionStorage.getItem("user"));
      let postData = {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      };

      if (frequency === "custom") {
        postData.selectedDate = selectedDate;
      }

      const response = await axios.post("/transactions/getAllTransaction", postData);
      setAllTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [frequency, selectedDate, type]);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-8 rounded-xl shadow-lg border border-gray-200">
        <div id="filter" className="flex flex-wrap md:flex-nowrap justify-between items-start gap-6 mb-8">
          <div className="flex flex-col w-full md:w-auto">
            <h6 className="text-lg font-semibold mb-2 text-gray-700">Select Frequency</h6>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="bg-white border border-gray-300 cursor-pointer rounded-lg p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            >
              <option value="7">Last 1 Week</option>
              <option value="30">Last 1 Month</option>
              <option value="365">Last 1 Year</option>
              <option value="custom">Custom</option>
            </select>
            {frequency === "custom" && (
              <div className="mt-3">
                <RangePicker 
                  value={selectedDate} 
                  onChange={handleDateChange} 
                  className="w-full border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>
          
          <div className="flex flex-col w-full md:w-auto ">
            <h6 className="text-lg font-semibold mb-2 text-gray-700">Select Type</h6>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white border border-gray-300 cursor-pointer rounded-lg p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-6 ml-auto mr-4">
            <div className={`cursor-pointer p-2 rounded-lg transition-all duration-300 ${viewData === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`} onClick={() => setViewData('table')}>
              <UnorderedListOutlined className="text-2xl" />
            </div>
            <div className={`cursor-pointer p-2 rounded-lg transition-all duration-300 ${viewData === 'analytics' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-500'}`} onClick={() => setViewData('analytics')}>
              <AreaChartOutlined className="text-2xl" />
            </div>
          </div>
          
          <div id="add-new">
            <button
              className="bg-blue-500 text-white py-2.5 px-5 rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 transition-all duration-300 font-medium flex items-center"
              onClick={() => setShowModal(true)}
            >
              <span className="mr-1">+</span> Add Transaction
            </button>
          </div>
        </div>
        
        <CustomModal
          showModal={showModal}
          closeModal={closeModal}
          transactionData={transactionData}
          setTransactionData={setTransactionData}
          submitHandler={submitHandler}
          editable={editable}
          editTransactionData={editTransactionData}
          setEditTransactionData={setEditTransactionData}
        />
        
        <div id="content" className="mt-8">
          {viewData === 'table' ? (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <Table 
                columns={columns} 
                dataSource={allTransactions} 
                loading={loading}
                pagination={{ 
                  pageSize: 10,
                  position: ['bottomCenter'],
                  className: "pb-4"
                }}
                className="bg-white rounded-xl shadow-md"
                rowClassName="hover:bg-gray-50 transition-colors duration-200"
              />
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <Analytics allTransactions={allTransactions} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;