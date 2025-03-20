import moment, { isMoment } from "moment";
import React, { useEffect } from "react";
import Modal from "react-modal";

const CustomModal = (props) => {
  const {
    showModal,
    closeModal,
    transactionData,
    setTransactionData,
    submitHandler,
    editable,
    setEditTransactionData,
    editTransactionData,
  } = props;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "90%",
      maxWidth: "480px",
      maxHeight: "90vh",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#ffffff",
      padding: "0",
      borderRadius: "0.75rem",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      border: "none",
      overflow: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1000
    }
  };

  useEffect(() => {
    console.log(transactionData);
    console.log(editTransactionData);
  });

  return (
    <div>
      {showModal && (
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Transaction Modal"
          ariaHideApp={false}
        >
          <div className="flex flex-col">
            {/* Header - Fixed position */}
            <div className="bg-blue-500 px-4 py-3 rounded-t-lg sticky top-0 z-10">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg text-white">
                  {editable ? "Edit Transaction" : "Add Transaction"}
                </h2>
                <button
                  className="text-white hover:bg-blue-700 rounded-full p-1 transition duration-200 focus:outline-none"
                  onClick={closeModal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Body - Scrollable */}
            <div className="p-4 overflow-y-auto">
              <form className="flex flex-col space-y-3">
                {/* Amount */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    value={editable ? editTransactionData.amount : transactionData.amount}
                    onChange={(e) =>
                      editable
                        ? setEditTransactionData({
                            ...editTransactionData,
                            amount: e.target.value,
                          })
                        : setTransactionData({
                            ...transactionData,
                            amount: e.target.value,
                          })
                    }
                  />
                </div>

                {/* Type */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <select
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white"
                    onChange={(e) =>
                      editable
                        ? setEditTransactionData({
                            ...editTransactionData,
                            type: e.target.value,
                          })
                        : setTransactionData({
                            ...transactionData,
                            type: e.target.value,
                          })
                    }
                    value={editable ? editTransactionData.type : transactionData.type}
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                {/* Category */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <select
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 bg-white"
                    value={editable ? editTransactionData.category : transactionData.category}
                    onChange={(e) =>
                      editable
                        ? setEditTransactionData({
                            ...editTransactionData,
                            category: e.target.value,
                          })
                        : setTransactionData({
                            ...transactionData,
                            category: e.target.value,
                          })
                    }
                  >
                    <option value="salary">Salary</option>
                    <option value="tip">Tip</option>
                    <option value="food">Food</option>
                    <option value="projects">Projects</option>
                    <option value="movies">Movies</option>
                    <option value="bills">Bills</option>
                    <option value="medical">Medical</option>
                    <option value="fee">Fee</option>
                    <option value="tax">Tax</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                {/* Reference */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Reference</label>
                  <input
                    type="text"
                    placeholder="Enter reference"
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    value={editable ? editTransactionData.reference : transactionData.reference}
                    onChange={(e) =>
                      editable
                        ? setEditTransactionData({
                            ...editTransactionData,
                            reference: e.target.value,
                          })
                        : setTransactionData({
                            ...transactionData,
                            reference: e.target.value,
                          })
                    }
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    value={editable ? editTransactionData.date : transactionData.date}
                    onChange={(e) =>
                      editable
                        ? setEditTransactionData({
                            ...editTransactionData,
                            date: e.target.value,
                          })
                        : setTransactionData({
                            ...transactionData,
                            date: e.target.value,
                          })
                    }
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    placeholder="Enter description"
                    rows="2"
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    value={editable ? editTransactionData.description : transactionData.description}
                    onChange={(e) =>
                      editable
                        ? setEditTransactionData({
                            ...editTransactionData,
                            description: e.target.value,
                          })
                        : setTransactionData({
                            ...transactionData,
                            description: e.target.value,
                          })
                    }
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={(e) => submitHandler(e)}
                  >
                    {editable ? "UPDATE" : "SAVE"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CustomModal;