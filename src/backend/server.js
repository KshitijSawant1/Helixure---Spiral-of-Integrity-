const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Define the path to the accounts.csv file
const filePath = "./src/backend/accounts.csv";

// Ensure accounts.csv exists or create it with a header row
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "Full Name,Email,Password,Keyword\n", "utf8");
  console.log("accounts.csv file created.");
}

// Signup Endpoint
app.post("/signup", (req, res) => {
  const { fullName, email, password, keyword } = req.body;

  // Validate required fields
  if (!fullName || !email || !password || !keyword) {
    return res.status(400).send("All fields are required.");
  }

  // Prepare the data to append
  const newAccount = `${fullName},${email},${password},${keyword}\n`;

  // Append the new account to accounts.csv
  fs.appendFile(filePath, newAccount, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).send("Error saving the account.");
    }
    res.status(201).send("Account created successfully.");
  });
});

// Login Endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("All fields are required.");
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }

    const accounts = data.split("\n").map((line) => line.split(","));
    const user = accounts.find((account) => account[1] === email);

    if (!user || user.length < 2) {
      return res.status(404).send("Email not found.");
    }

    if (user[2] !== password) {
      return res
        .status(400)
        .send("Password incorrect. Please enter your keyword.");
    }

    res.status(200).json({ message: "Login successful.", username: user[0] });
  });
});

// Recover Endpoint
app.post("/recover", (req, res) => {
  const { email, keyword } = req.body;

  if (!email || !keyword) {
    return res.status(400).send("Email and keyword are required.");
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading file.");
    }

    const accounts = data.split("\n").map((line) => line.split(","));
    const user = accounts.find((account) => account[1] === email);

    if (!user || user.length < 4) {
      return res.status(404).send("Account not found.");
    }

    if (user[3].trim() !== keyword.trim()) {
      return res.status(400).send("Keyword incorrect.");
    }

    res.status(200).json({
      username: user[0],
      email: user[1],
      password: user[2],
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
