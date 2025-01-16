import React from "react";
import { Card, Progress } from "antd";

const Analytics = ({ allTransactions }) => {
  const categories = [
    "salary",
    "tip",
    "food",
    "projects",
    "movies",
    "bills",
    "medical",
    "fee",
    "tax",
    "others",
  ];

  if (allTransactions.length === 0) {
    return <div>ADD YOUR FIRST TRANSACTION</div>; 
  }

  // Total Transactions
  const totalTransactions = allTransactions.length;
  const totalIncomeTransactions = allTransactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpensePercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  // Total Turnover
  const totalTurnover = allTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div id="main" className="flex justify-items-start">
        <div id="total">
          <Card
            title="TRANSACTIONS"
            extra={<a href="#">More</a>}
            style={{
              width: 500,
            }}
          >
            <div className="font-semibold">
              Total Transactions: {totalTransactions}
            </div>
            <div className="font-semibold text-green-700">
              Income: {totalIncomeTransactions.length}
            </div>
            <div className="font-semibold text-red-500">
              Expense: {totalExpenseTransactions.length}
            </div>
            <div>
              <Progress
                type="circle"
                strokeColor="green"
                percent={totalIncomePercentage.toFixed(0)}
              />
              <Progress
                type="circle"
                strokeColor="red"
                percent={totalExpensePercentage.toFixed(0)}
              />
            </div>
          </Card>
        </div>
        <div id="turnover">
          <Card
            title="TOTAL TURNOVER"
            extra={<a href="#">More</a>}
            style={{ width: 500 }}
          >
            <div className="font-semibold">Turnover: {totalTurnover}</div>
            <div className="font-semibold text-green-700">
              Income : {totalIncomeTurnover}
            </div>
            <div className="font-semibold text-red-500">
              Expense : {totalExpenseTurnover}
            </div>

            <Progress
              type="circle"
              strokeColor="green"
              percent={totalIncomeTurnoverPercentage.toFixed(0)}
            />
            <Progress
              type="circle"
              strokeColor="red"
              percent={totalExpenseTurnoverPercentage.toFixed(0)}
            />
          </Card>
        </div>
      </div>
      <div id="category-wise" className="flex justify-start">
        <div id="income-wise">
          <Card
            title=" CATEGORY-WISE INCOME"
            style={{
              width: 500,
            }}
          >
            {categories.map((category) => {
              const amount = allTransactions
                .filter(
                  (transaction) =>
                    transaction.type === "income" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);

              return (
                amount > 0 && (
                  <div>
                    <h4>{category}</h4>
                    <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                  </div>
                )
              );
            })}
          </Card>
        </div>
        <div id="expense-wise">
        <Card
            title=" CATEGORY-WISE EXPENSE"
            style={{
              width: 500,
            }}
          >
            {categories.map((category) => {
              const amount = allTransactions
                .filter(
                  (transaction) =>
                    transaction.type === "expense" &&
                    transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);

              return (
                amount > 0 && (
                  <div>
                    <h4>{category}</h4>
                    <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                  </div>
                )
              );
            })}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Analytics;
