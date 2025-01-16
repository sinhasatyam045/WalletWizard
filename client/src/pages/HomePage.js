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
        <div className="flex space-x-2">
          <EditOutlined 
            className="text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
            onClick={() => {
              setShowModal(true);
              setEditable(true);
              setEditTransactionData(record);
            }} 
          />
          <DeleteOutlined 
            className="text-red-500 cursor-pointer transition-transform transform hover:scale-110"
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
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <div id="filter" className="flex justify-between mb-6">
          <div className="flex flex-col">
            <h6 className="text-lg font-semibold mb-2">Select Frequency</h6>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="bg-white border border-gray-300 rounded-md p-2 shadow-sm"
            >
              <option value="7">Last 1 Week</option>
              <option value="30">Last 1 Month</option>
              <option value="365">Last 1 Year</option>
              <option value="custom">Custom</option>
            </select>
            {frequency === "custom" && (
              <RangePicker 
                value={selectedDate} 
                onChange={handleDateChange} 
                className="mt-2"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-lg font-semibold mb-2">Select Type</h6>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-white border border-gray-300 rounded-md p-2 shadow-sm"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <UnorderedListOutlined 
              className="text-2xl cursor-pointer text-gray-600 hover:text-blue-500 transition-colors"
              onClick={() => setViewData('table')} 
            />
            <AreaChartOutlined 
              className="text-2xl cursor-pointer text-gray-600 hover:text-blue-500 transition-colors"
              onClick={() => setViewData('analytics')} 
            />
          </div>
          <div id="add-new">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors"
              onClick={() => setShowModal(true)}
            >
              Add New
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
        <div id="content" className="mt-6">
          {viewData === 'table' ? (
            <Table 
              columns={columns} 
              dataSource={allTransactions} 
              loading={loading} 
              className="bg-white rounded-lg shadow-md"
            />
          ) : (
            <Analytics allTransactions={allTransactions} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
