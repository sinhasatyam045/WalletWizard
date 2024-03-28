const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  console.log("Request", req.body);
  try {
    const { frequency, userid, selectedDate, type } = req.body;
    let query = {};

    if (userid) {
      if (frequency !== "custom") {
        query = {
          date: {
            $gt: moment().subtract(Number(frequency), "d").toDate(),
            $lte: new Date(),
          },
          userid,
          ...(type !== "all" && { type }),
        };
      } else if (frequency === "custom") {
        query = {
          date: {
            $gte: selectedDate[0],
            $lte: selectedDate[1],
          },
          userid,
        };

        if (type && type !== "all") {
          query.type = type;
        }
      }
    }

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
    console.log("NewTransaction", newTransaction);
    await newTransaction.save();
    res.status(201).send("Transaction created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  const { _id } = req.body;

  try {
    await transactionModel.findByIdAndDelete(_id);
    res.status(200).send("Deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTransaction = async (req, res) => {
  console.log("Request", req.body);
  try {
    const { _id, ...updateData } = req.body;
    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );
    console.log("Updated Transaction", updatedTransaction);
    res.status(200).send("Edited successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransaction, addTransaction, editTransaction, deleteTransaction };
