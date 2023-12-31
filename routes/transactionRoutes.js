const express = require("express");
const {
  getAllTransaction,
  addTransaction,
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/addTransaction", addTransaction);

router.post("/getAllTransaction", getAllTransaction);

module.exports = router;
