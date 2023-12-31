const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  console.log("Request", req.body);
  try {
    const { frequency, userid, selectedDate, type } = req.body;
    // console.log(selectedDate);
    // console.log(type);

    // console.log("Frequency", frequency);

    const query =
      req.body.userid && frequency !== "custom"
        ? {
            date: { $gt: moment().subtract(Number(frequency), "d").toDate() },
            userid,
            type: type !== "all" ? type : "all",
          }
        : req.body.userid
        ? {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
            userid,

            ...(type !== "all" && { type }),
          }
        : {};

    console.log("Query", query);

    const transactions = await transactionModel.find(query);
    console.log(transactions);

    res.status(200).send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    console.log(req.body);
    console.log("NewTransaction", newTransaction);
    await newTransaction.save();

    res.status(201).send("Transaction created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransaction, addTransaction };
