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
    return (
      <div className="flex justify-center items-center min-h-64 bg-gray-50 rounded-lg shadow text-gray-500 font-semibold text-xl">
        ADD YOUR FIRST TRANSACTION
      </div>
    );
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
    <div className="container mx-auto px-4 py-6">
      {/* Top Section - Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div id="total">
          <Card
            title={<span className="text-lg font-bold">TRANSACTIONS</span>}
            extra={<a href="#" className="text-blue-600 hover:text-blue-800">More</a>}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
            bodyStyle={{ padding: "20px" }}
            headStyle={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}
          >
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                Total Transactions: {totalTransactions}
              </div>
              <div className="flex flex-col space-y-2">
                <div className="font-semibold text-green-600 flex justify-between">
                  <span>Income:</span> 
                  <span>{totalIncomeTransactions.length}</span>
                </div>
                <div className="font-semibold text-red-500 flex justify-between">
                  <span>Expense:</span> 
                  <span>{totalExpenseTransactions.length}</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6 mt-4">
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    strokeColor="#10b981"
                    percent={totalIncomePercentage.toFixed(0)}
                    size={90}
                  />
                  <p className="mt-2 text-sm font-medium text-gray-600">Income</p>
                </div>
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    strokeColor="#ef4444"
                    percent={totalExpensePercentage.toFixed(0)}
                    size={90}
                  />
                  <p className="mt-2 text-sm font-medium text-gray-600">Expense</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div id="turnover">
          <Card
            title={<span className="text-lg font-bold">TOTAL TURNOVER</span>}
            extra={<a href="#" className="text-blue-600 hover:text-blue-800">More</a>}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
            bodyStyle={{ padding: "20px" }}
            headStyle={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}
          >
            <div className="space-y-4">
              <div className="text-lg font-semibold">
                Turnover: Rs.{totalTurnover.toLocaleString()}
              </div>
              <div className="flex flex-col space-y-2">
                <div className="font-semibold text-green-600 flex justify-between">
                  <span>Income:</span> 
                  <span>Rs.{totalIncomeTurnover.toLocaleString()}</span>
                </div>
                <div className="font-semibold text-red-500 flex justify-between">
                  <span>Expense:</span> 
                  <span>Rs.{totalExpenseTurnover.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-6 mt-4">
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    strokeColor="#10b981"
                    percent={totalIncomeTurnoverPercentage.toFixed(0)}
                    size={90}
                  />
                  <p className="mt-2 text-sm font-medium text-gray-600">Income</p>
                </div>
                <div className="flex flex-col items-center">
                  <Progress
                    type="circle"
                    strokeColor="#ef4444"
                    percent={totalExpenseTurnoverPercentage.toFixed(0)}
                    size={90}
                  />
                  <p className="mt-2 text-sm font-medium text-gray-600">Expense</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Bottom Section - Category Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div id="income-wise">
          <Card
            title={<span className="text-lg font-bold">CATEGORY-WISE INCOME</span>}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
            bodyStyle={{ padding: "20px" }}
            headStyle={{ backgroundColor: "#f0fdf4", borderBottom: "1px solid #dcfce7" }}
          >
            <div className="space-y-4">
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
                    <div key={`income-${category}`} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="capitalize font-medium text-gray-700">{category}</h4>
                        <span className="text-sm font-semibold text-green-600">
                          Rs.{amount.toLocaleString()} ({((amount / totalIncomeTurnover) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <Progress 
                        percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} 
                        strokeColor="#10b981" 
                        trailColor="#dcfce7"
                        strokeWidth={10}
                        showInfo={false}
                      />
                    </div>
                  )
                );
              })}
              {!categories.some(category => 
                allTransactions.some(t => t.type === "income" && t.category === category)
              ) && (
                <div className="text-center py-6 text-gray-500">
                  No income transactions yet
                </div>
              )}
            </div>
          </Card>
        </div>
        
        <div id="expense-wise">
          <Card
            title={<span className="text-lg font-bold">CATEGORY-WISE EXPENSE</span>}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
            bodyStyle={{ padding: "20px" }}
            headStyle={{ backgroundColor: "#fef2f2", borderBottom: "1px solid #fee2e2" }}
          >
            <div className="space-y-4">
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
                    <div key={`expense-${category}`} className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="capitalize font-medium text-gray-700">{category}</h4>
                        <span className="text-sm font-semibold text-red-500">
                          Rs.{amount.toLocaleString()} ({((amount / totalExpenseTurnover) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <Progress 
                        percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} 
                        strokeColor="#ef4444" 
                        trailColor="#fee2e2"
                        strokeWidth={10}
                        showInfo={false}
                      />
                    </div>
                  )
                );
              })}
              {!categories.some(category => 
                allTransactions.some(t => t.type === "expense" && t.category === category)
              ) && (
                <div className="text-center py-6 text-gray-500">
                  No expense transactions yet
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;