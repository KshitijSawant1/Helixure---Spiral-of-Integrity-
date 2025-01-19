# <img src="src/assets/HL.png" alt="InVision Logo" width="40"/> Helixure - Blockchain Management System

## Introduction
Helixure is a blockchain-based application designed to simplify block creation, mining, and exploration. The project focuses on user-friendly interactions with robust blockchain functionalities while ensuring data integrity using Google Firestore for secure storage.

## Features
1. **User Authentication**
   - Secure login system using email and password.
   - Account creation with recovery keyword for enhanced security.
   - Password recovery using the registered email and secure keyword.

2. **Dashboard Navigation**
   - Access to "Create Block" and "View Blockchain" functionalities.
   - Streamlined interface for seamless navigation.

3. **Block Creation and Mining**
   - Add and mine blocks with proof-of-work (PoW) validation.
   - Store blocks in Google Firestore with comprehensive metadata.

4. **Blockchain Exploration**
   - View mined blocks with metadata like hash, proof, timestamp, and transactions.
   - Search blocks by block number, sender, or recipient.

5. **Google Firestore Integration**
   - "Accounts" collection stores user credentials and recovery keywords securely.
   - "Blockchain" collection maintains mined blocks for transparency and integrity.

---

## Process Flow

### 1. User Authentication
#### ![3](https://github.com/user-attachments/assets/7ad7e9e9-a6c2-46d2-acfc-442e56f7fddd)
#### ![4](https://github.com/user-attachments/assets/c2c83146-7fe2-47e0-b324-adc41d92659f)

- **Login Page**: Users log in with registered email and password.
- **Account Creation**: New users provide their full name, email, password, and a secure keyword for recovery.

### 2. Dashboard Navigation
#### ![1](https://github.com/user-attachments/assets/589308f6-b2c3-40a6-9516-9cdb4f1d7062)

- **Welcome Page**: Users are greeted and can navigate to "Create Block" or "View Blockchain".

### 3. Create Block Page
#### ![5](https://github.com/user-attachments/assets/edf4d93b-37c2-483d-9ed1-0081f1f70fa1)

- **Block Creation**: Input sender (pre-filled), select recipient, and add block content.
- **Mining Process**: Validate and append the block to the blockchain using PoW.

### 4. View Blockchain
#### ![6](https://github.com/user-attachments/assets/5b4713e6-617d-4648-b994-eec67ba8cbde)

- **Blockchain Explorer**: View mined blocks with detailed metadata.
- **Search Functionality**: Filter blocks by block number, sender, or recipient.

### 5. Google Firestore: Accounts Collection
#### ![7](https://github.com/user-attachments/assets/ddcb873a-a156-4c3f-8dc9-9f94f0c0b7fa)

- **User Storage**: Stores user credentials, including email, password, and recovery keyword.

### 6. Google Firestore: Blockchain Collection
#### ![8](https://github.com/user-attachments/assets/58cc74c5-e7b3-49b6-a486-597a9ce06d06)

- **Blockchain Storage**: Mined blocks are stored with their hash, index, proof, timestamp, and transaction details.

---

## Technologies Used
- **Frontend**: React.js for a responsive and intuitive user interface.
- **Backend**: Proof-of-work algorithm for mining.
- **Database**: Google Firestore for secure and reliable data storage.

---

## Getting Started

### Prerequisites
- Node.js installed on your system.
- Google Firestore set up with collections: `Accounts` and `Blockchain`.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/helixure.git
   ```
2. Navigate to the project directory:
   ```bash
   cd helixure
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```

---

## Usage
1. **Account Creation**: Sign up with your details.
2. **Login**: Access your account using email and password.
3. **Create Block**: Add and mine blocks by providing content and recipient.
4. **View Blockchain**: Explore the blockchain and search for specific blocks.

---

## Screenshots

### 1. Welcome Page
![1](https://github.com/user-attachments/assets/c216a11f-5ec6-40d4-8055-b6b6494ef149)


### 2. Visionary Behind the Project
![2](https://github.com/user-attachments/assets/81548987-b266-423b-aef2-36282d5d78eb)


### 3. Create Block Page
![5](https://github.com/user-attachments/assets/cc8498ae-f644-4522-8061-c2c26a5baf89)


### 4. View Blockchain Page
![6](https://github.com/user-attachments/assets/cd88dbc9-88e2-4844-a594-6644bdb17b35)


### 5. Firestore - Accounts Collection

![7](https://github.com/user-attachments/assets/acd27ecd-446c-4094-8237-4d13c45a40e2)

### 6. Firestore - Blockchain Collection
![8](https://github.com/user-attachments/assets/2e356fbc-dbb9-41a8-bd8f-668ff4bf4a38)


---

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue for any bugs or feature requests.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact
For any queries or suggestions, please contact:
- **Name**: Kshitij Sawant
- **LinkedIn**: [Kshitij's LinkedIn](https://www.linkedin.com/in/kshitijksawant/)
- **GitHub**: [Kshitij's GitHub](https://github.com/KshitijSawant1)
- **LinkTree**: [Kshitij's LinkTree](https://linktr.ee/kshitij_sawant)

---
