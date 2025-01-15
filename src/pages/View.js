import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; // Firestore functions
import Papa from "papaparse";
import { db } from "../firebase"; // Firebase configuration
import accountsCSV from "../backend/accounts.csv";
import "../styles/View.css"; // Ensure the CSS matches the UI design

const View = () => {
  const [blocks, setBlocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch blockchain data from Firestore
  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Blockchain"));
        const fetchedBlocks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort blocks by index
        fetchedBlocks.sort((a, b) => a.index - b.index);
        setBlocks(fetchedBlocks);
        setFilteredBlocks(fetchedBlocks);
      } catch (error) {
        console.error("Error fetching blockchain data: ", error);
      }
    };

    fetchBlocks();
  }, []);

  // Load recipients from CSV
  useEffect(() => {
    Papa.parse(accountsCSV, {
      download: true,
      header: true,
      complete: (result) => {
        const names = result.data
          .map((row) => row["Full Name"])
          .filter(Boolean);
        setRecipients(names);
      },
    });
  }, []);

  // Handle search/filtering
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredBlocks(
      blocks.filter(
        (block) =>
          block.index.toString().includes(query) ||
          block.transactions.some(
            (transaction) =>
              transaction.sender.toLowerCase().includes(query) ||
              transaction.recipient.toLowerCase().includes(query)
          )
      )
    );
  };

  // Handle opening the edit modal
  const handleEdit = (block, transactionIndex) => {
    setEditTransaction({ block, transactionIndex });
    setErrorMessage("");
  };

  // Handle saving the updated transaction
  const handleSave = async () => {
    if (editTransaction) {
      const { block, transactionIndex } = editTransaction;

      // Ensure a recipient is selected
      const recipient =
        block.transactions[transactionIndex].recipient?.trim() || "";
      if (!recipient || recipient === "Select Recipient") {
        setErrorMessage("Please select a valid recipient.");
        return;
      }

      const updatedTransactions = [...block.transactions];
      const updatedBlock = { ...block, transactions: updatedTransactions };

      try {
        // Update the Firestore document
        const blockRef = doc(db, "Blockchain", block.id);
        await updateDoc(blockRef, {
          transactions: updatedBlock.transactions,
        });

        alert("Transaction updated successfully!");
        setEditTransaction(null);
        window.location.reload(); // Reload the data
      } catch (error) {
        console.error("Error updating transaction: ", error);
      }
    }
  };

  return (
    <div className="view-container">
      <h1 className="view-title">View Blockchain</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search by Block Number, Sender, or Recipient..."
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Blockchain Display */}
      <div className="blockchain-grid">
        {filteredBlocks.map((block) => (
          <div
            key={block.index}
            className={`block-card ${block.index === 0 ? "genesis-block" : ""}`}
          >
            <h3>Block Number: {block.index}</h3>
            <p>
              <strong>Block Hash:</strong> {block.hash}
            </p>
            <p>
              <strong>Previous Block Hash:</strong> {block.previousHash}
            </p>
            <p>
              <strong>Proof:</strong> {block.proof}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {block.timestamp?.seconds
                ? new Date(block.timestamp.seconds * 1000).toLocaleString()
                : "N/A"}
            </p>
            <h4>Transactions:</h4>
            {block.transactions.map((transaction, index) => (
              <div key={index} className="transaction">
                <p>
                  <strong>Sender:</strong> {transaction.sender}
                </p>
                <p>
                  <strong>Recipient:</strong> {transaction.recipient}
                </p>
                <p>
                  <strong>Content:</strong> {transaction.content}
                </p>
                {block.index !== 0 && (
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(block, index)}
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editTransaction && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Transaction</h3>
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </p>
            )}
            <label>
              Sender:
              <input
                type="text"
                value={
                  editTransaction.block.transactions[
                    editTransaction.transactionIndex
                  ].sender
                }
                disabled
              />
            </label>
            <label>
              Recipient:
              <select
                value={
                  editTransaction.block.transactions[
                    editTransaction.transactionIndex
                  ].recipient
                }
                onChange={(e) =>
                  setEditTransaction({
                    ...editTransaction,
                    block: {
                      ...editTransaction.block,
                      transactions: editTransaction.block.transactions.map(
                        (t, i) =>
                          i === editTransaction.transactionIndex
                            ? { ...t, recipient: e.target.value }
                            : t
                      ),
                    },
                  })
                }
              >
                <option value="Select Recipient" disabled>
                  Select Recipient
                </option>
                {recipients
                  .filter(
                    (recipient) =>
                      recipient !==
                      editTransaction.block.transactions[
                        editTransaction.transactionIndex
                      ].sender
                  )
                  .map((recipient, idx) => (
                    <option key={idx} value={recipient}>
                      {recipient}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Content:
              <input
                type="text"
                value={
                  editTransaction.block.transactions[
                    editTransaction.transactionIndex
                  ].content
                }
                onChange={(e) =>
                  setEditTransaction({
                    ...editTransaction,
                    block: {
                      ...editTransaction.block,
                      transactions: editTransaction.block.transactions.map(
                        (t, i) =>
                          i === editTransaction.transactionIndex
                            ? { ...t, content: e.target.value }
                            : t
                      ),
                    },
                  })
                }
              />
            </label>
            <div className="modal-buttons">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-button"
                onClick={() => setEditTransaction(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
