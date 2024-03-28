const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/connectDB");

dotenv.config();

connectDB();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//user route
app.use("/api/v1/users", require("./routes/userRoute"));

//Transaction Route
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

app.get("/", (req, res) => {
  res.send("Hellllooooo");
});
//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
