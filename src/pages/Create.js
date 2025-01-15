import React, { useState, useEffect } from "react";
import sha256 from "js-sha256";
import Papa from "papaparse";
import "../styles/Create.css";
import accountsCSV from "../backend/accounts.csv";
import {
  collection,
  addDoc,
  getDocs,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const Create = ({ username }) => {
  const [recipient, setRecipient] = useState("");
  const [blockContent, setBlockContent] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [recipients, setRecipients] = useState([]);

  // Load recipients from CSV
  useEffect(() => {
    Papa.parse(accountsCSV, {
      download: true,
      header: true,
      complete: (result) => {
        const names = result.data
          .map((row) => row["Full Name"])
          .filter(Boolean);
        const filteredNames = names.filter((name) => name !== username); // Exclude current user
        setRecipients(filteredNames);
      },
    });
  }, [username]);

  // Check for Genesis Block and add it if not present
  useEffect(() => {
    const checkAndAddGenesisBlock = async () => {
      try {
        const blockchainQuery = query(collection(db, "Blockchain"));
        const snapshot = await getDocs(blockchainQuery);

        if (snapshot.empty) {
          const genesisBlock = {
            index: 0,
            transactions: [
              {
                sender: "System",
                recipient: "N/A",
                content: "Genesis Block - Start of the Blockchain",
              },
            ],
            proof: 69732,
            hash: sha256("Genesis Block"),
            previousHash: "0000000000",
            timestamp: serverTimestamp(),
          };

          await addDoc(collection(db, "Blockchain"), genesisBlock);
          console.log("Genesis Block added to Firestore.");
        } else {
          console.log("Genesis Block already exists.");
        }
      } catch (error) {
        console.error("Error checking or adding Genesis Block: ", error);
      }
    };

    checkAndAddGenesisBlock();
  }, []);

  const hashBlock = (block) => {
    const blockString = JSON.stringify(block, Object.keys(block).sort());
    return sha256(blockString);
  };

  const proofOfWork = (lastProof) => {
    let proof = 0;
    while (!isValidProof(lastProof, proof)) {
      proof++;
    }
    return proof;
  };

  const isValidProof = (lastProof, proof) => {
    const guess = `${lastProof}${proof}`;
    const guessHash = sha256(guess);
    return guessHash.startsWith("0000");
  };

  const handleAddBlock = () => {
    if (blockContent && recipient) {
      if (recipient === username) {
        alert("Sender and recipient cannot be the same.");
        return;
      }

      const newTransaction = {
        sender: username || "Guest",
        recipient,
        content: blockContent,
      };

      const newBlock = {
        index: blocks.length + 1, // Increment index correctly
        transactions: [newTransaction], // Only add the new transaction
      };

      setBlocks([...blocks, newBlock]);
      setBlockContent(""); // Clear the block content input
      setRecipient(""); // Clear the recipient input
    } else {
      alert("Please fill in all fields before adding a block!");
    }
  };

  const handleMineBlocks = async () => {
    if (blocks.length === 0) {
      alert("No blocks to mine. Please add blocks first.");
      return;
    }

    alert("Mining process started...");

    setTimeout(async () => {
      try {
        const blockchainQuery = query(collection(db, "Blockchain"));
        const snapshot = await getDocs(blockchainQuery);

        let previousHash = "0000000000";
        let lastProof = 0;

        if (!snapshot.empty) {
          const blockchainData = snapshot.docs.map((doc) => doc.data());
          const lastBlock = blockchainData.reduce((prev, current) =>
            prev.index > current.index ? prev : current
          );

          previousHash = lastBlock.hash;
          lastProof = lastBlock.proof;
        }

        const proof = proofOfWork(lastProof);
        const hash = hashBlock({
          index: snapshot.size + 1,
          transactions: blocks.flatMap((b) => b.transactions),
          proof,
          previousHash,
          timestamp: new Date().toISOString(),
        });

        const minedBlock = {
          index: snapshot.size + 1,
          transactions: blocks.flatMap((b) => b.transactions),
          proof,
          hash,
          previousHash,
          timestamp: serverTimestamp(),
        };

        await addDoc(collection(db, "Blockchain"), minedBlock);
        setBlocks([]);
        alert("Block mined and sent to Firestore successfully!");
      } catch (error) {
        console.error("Error writing document: ", error);
        alert("Failed to send mined block to Firestore.");
      }
    }, 2000);
  };

  return (
    <div className="create-container">
      <h1 className="create-title">Create Block</h1>
      <div className="create-grid">
        {/* Sender and Recipient */}
        <div className="grid-item sender-section">
          <div className="section-content">
            <p className="label">Sender:</p>
            <p className="value">{username || "Guest"}</p>
            <label className="label">Recipient</label>
            <select
              className="recipient-dropdown"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            >
              <option value="">Select Recipient</option>
              {recipients.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="step-indicator">
            <div className="step-circle">1</div>
          </div>
        </div>

        {/* Block Content Section */}
        <div className="grid-item block-content-section">
          <div className="section-content">
            <p className="label">Text Field to Add Block Contents</p>
            <textarea
              className="block-content"
              value={blockContent}
              onChange={(e) => setBlockContent(e.target.value)}
              placeholder="Enter block content"
            />
          </div>
          <div className="step-indicator">
            <div className="step-circle">2</div>
          </div>
        </div>

        {/* Add Block Section */}
        <div className="grid-item add-block-section">
          <button className="add-block-button" onClick={handleAddBlock}>
            Add Block
          </button>
          <div className="step-indicator">
            <div className="step-circle">3</div>
          </div>
        </div>

        {/* Mine Block Section */}
        <div className="grid-item mine-block-section">
          <button className="mine-block-button" onClick={handleMineBlocks}>
            Mine Blocks
          </button>
          <div className="step-indicator">
            <div className="step-circle">4</div>
          </div>
        </div>

        {/* Block View Section */}
        <div className="grid-item block-view-section">
          <h2 className="block-view-title">Block View</h2>
          {blocks.length > 0 ? (
            <>
              <div className="block-view-container">
                {blocks.map((block, index) => (
                  <div key={index} className="block-view-item">
                    <p>
                      <strong>Index:</strong> {block.index}
                    </p>
                    <p>
                      <strong>Sender:</strong>{" "}
                      {block.transactions[0]?.sender || "N/A"}
                    </p>
                    <p>
                      <strong>Recipient:</strong>{" "}
                      {block.transactions[0]?.recipient || "N/A"}
                    </p>
                    <p>
                      <strong>Content:</strong>{" "}
                      {block.transactions[0]?.content || "N/A"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No blocks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
