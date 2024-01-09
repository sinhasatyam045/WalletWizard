import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import CustomModal from "../components/CustomModal";
import RiseLoader from "react-spinners/RiseLoader";
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from "axios";
import { Table, DatePicker } from "antd";
import moment from "moment";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setshowModal] = useState(false);
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
      render: (text, record) => {
        return (
          <div>
            <EditOutlined className="text-xl" onClick={() => {
              setshowModal(true);
              setEditable(true);
              setEditTransactionData(record);
            }} />
            <DeleteOutlined className="text-xl" onClick={() => { handleDelete(record) }} />
          </div>
        )
      }
    },
  ];

  const closeModal = () => {
    setshowModal(false);
  };

  const submitHandler = async (e) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const userId = user._id;
    e.preventDefault();
    const newTransactionData = { ...transactionData, userid: userId };
    try {
      setLoading(true);
      if (editable) {
        const response = await axios.post(
          "/transactions/editTransaction",
          editTransactionData, // corrected here
        );
        console.log("Response", response);
        console.log("Edit Request Payload:", newTransactionData);

        console.log(response);
        setLoading(false);
      }
      else {
        const response = await axios.post(
          "/transactions/addTransaction",
          newTransactionData
        );
        console.log(response);
        setLoading(false);
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (record) => {
    try {
      setLoading(true)
      await axios.post(
        "/transactions/deleteTransaction",
        record, // corrected here
      );
      setLoading(false)
    } catch (error) {
      setLoading(false)
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

      const response = await axios.post(
        "/transactions/getAllTransaction",
        postData
      );
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
      <div div id="filter" className="flex justify-between p-2">
        <div>
          <h6>Select Frequency</h6>
          <select
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
        <div>
          <UnorderedListOutlined className="text-2xl " onClick={() => setViewData('table')} />
          <AreaChartOutlined className="text-2xl" onClick={() => setViewData('analytics')} />
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
        editable={editable}
        editTransactionData={editTransactionData}
        setEditTransactionData={setEditTransactionData}
      />
      <div id="content">
        {viewData === 'table' ? <Table columns={columns} dataSource={allTransactions} />
          : <Analytics allTransactions={allTransactions} />}
      </div>
    </Layout>
  );
};

export default HomePage;
