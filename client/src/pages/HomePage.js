import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import { Table, DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setshowModal] = useState(false);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState({
    amount: "",
    type: "income",
    category: "salary",
    reference: "",
    description: "",
    date: "",
  });
  const [allTransactions, setAllTransactions] = useState([]);
  //table data
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
    },
  ];

  const closeModal = () => {
    setshowModal(false);
  };
  //storing transaction data into the database
  const submitHandler = async (e) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user._id;
    e.preventDefault();
    const newTransactionData = { ...transactionData, userid: userId };
    try {
      setLoading(true);
      const response = await axios.post(
        "/transactions/addTransaction",
        newTransactionData
      );
      console.log(response);
      setLoading(false);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(sessionStorage.getItem("user"));
      const postData = {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      };
      console.log(postData);
      const response = await axios.post(
        "/transactions/getAllTransaction",
        postData
      );
      setAllTransactions(response.data);

      console.log("Response", response);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //getting transaction
  useEffect(() => {
    getTransactions();
  }, [frequency, selectedDate, type]);
  //state for transaction data

  const handleDateChange = (date, dateString) => {
    // dateString is the formatted date string
    console.log("Selected date:", dateString);

    // Update the state with the selected date
    setSelectedDate(date);
  };

  return (
    <Layout>
      <div div id="filter" className="flex justify-between p-2">
        <div>
          <h6>Select Frequency</h6>
          <select
            //className="rounded-md"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="7">LAST 1 Week</option>
            <option value="30">LAST 1 Month</option>
            <option value="365">LAST 1 Year</option>
            <option value="custom">Custom</option>
          </select>
          {frequency === "custom" && (
            <RangePicker value={selectedDate} onChange={handleDateChange} />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div id="add-new">
          <button
            className="bg-blue-500 p-1 rounded-md"
            onClick={() => setshowModal(true)}
          >
            Add new
          </button>
        </div>
      </div>
      <CustomModal
        showModal={showModal}
        closeModal={closeModal}
        transactionData={transactionData}
        setTransactionData={setTransactionData}
        submitHandler={submitHandler}
      />
      <div id="content">
        <Table columns={columns} dataSource={allTransactions} />
      </div>
    </Layout>
  );
};

export default HomePage;
