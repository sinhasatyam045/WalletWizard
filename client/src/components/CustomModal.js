import moment, { isMoment } from "moment";
import React from "react";
import Modal from "react-modal";
const CustomModal = (props) => {
  const {
    showModal,
    closeModal,
    transactionData,
    setTransactionData,
    submitHandler,
  } = props;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "30%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#C0C0C0",
      padding: "2px",
      borderRadius: "15px",
    },
  };
  // console.log(props);
  // console.log(showModal);
  // console.log(closeModal);
  // console.log(transactionData);
  // console.log(setTransactionData);
  // console.log(submitHandler);

  return (
    <div>
      {showModal && (
        <Modal
          isOpen={showModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="p-2 space-y-2">
            <div className="flex justify-between space-y-1">
              <div className="font-bold text-xl">Add Transaction</div>
              <button
                className="bg-blue-500 rounded-md p-2"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <div id="form-div">
              <form className="flex-col flex space-y-2">
                <input
                  type="text"
                  placeholder="amount"
                  className="p-2 border border-gray-500 outline-none space-y-1 rounded-lg"
                  value={transactionData.amount}
                  onChange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      amount: e.target.value,
                    })
                  }
                ></input>
                <div className="flex flex-col space-y-2">
                  <label className="">Type</label>
                  <select
                    className="rounded-md"
                    onChange={(e) =>
                      setTransactionData({
                        ...transactionData,
                        type: e.target.value,
                      })
                    }
                    value={transactionData.type}
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="space-y-1">Category</label>
                  <select
                    className="rounded-md"
                    value={transactionData.category}
                    onChange={(e) =>
                      setTransactionData({
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
                <div className=" flex flex-col space-y-2">
                  <input
                    type="text"
                    placeholder="reference"
                    className="p-2 border border-gray-500 outline-none space-y-1 rounded-lg"
                    value={transactionData.reference}
                    onChange={(e) =>
                      setTransactionData({
                        ...transactionData,
                        reference: e.target.value,
                      })
                    }
                  ></input>
                </div>

                <input
                  type="date"
                  placeholder=""
                  className="p-2 border border-gray-500 outline-none space-y-2 rounded-lg"
                  value={transactionData.date}
                  onChange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      // date: moment(e.target.value).format("YYYY-MM-DD"),
                      date: e.target.value,
                    })
                  }
                ></input>

                <input
                  type="text"
                  placeholder="description"
                  className="p-2 border border-gray-500 outline-none space-y-1 rounded-lg"
                  value={transactionData.description}
                  onChange={(e) =>
                    setTransactionData({
                      ...transactionData,
                      description: e.target.value,
                    })
                  }
                ></input>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 rounded-md p-2 "
                    onClick={(e) => submitHandler(e)}
                  >
                    SAVE
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
