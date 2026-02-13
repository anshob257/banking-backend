💳 Ledger-Based Banking System Backend

Production-style banking backend built with **Node.js, Express, and MongoDB** implementing secure authentication, ledger-driven transactions, idempotency protection, and atomic balance computation.


🚀 Features

* 🔐 JWT Authentication with bcrypt password hashing
* 🏦 Account creation & management APIs
* 💳 Secure credit/debit transaction processing
* 📒 Ledger-based architecture for transaction consistency
* ♻️ Idempotency validation to prevent duplicate transactions
* ⚖️ Atomic balance calculation using MongoDB Aggregation Pipeline
* 📧 Email notifications using Nodemailer
* 🚫 Token blacklisting for secure logout
* 🛡 Auth middleware & cookie-based session handling

 Transaction Flow:

1. Validate JWT & account status
2. Check idempotency key
3. Create transaction (Pending)
4. Write ledger entry
5. Derive balance via aggregation
6. Send notification



## 🛠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT, bcrypt
* **Email Service:** Nodemailer
* **Security:** Middleware, Cookie Parser, Token Blacklisting



Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_password
```


▶️ Installation & Setup

bash
git clone https://github.com/yourusername/banking-backend.git
cd banking-backend
npm install
npm run dev
```


📡 API Endpoints

Auth

* POST `/api/auth/register`
* POST `/api/auth/login`
* POST `/api/auth/logout`

Account

* POST `/api/account/create`
* GET `/api/account/balance`

Transactions

* POST `/api/transaction/create`
* GET `/api/transaction/history`


🧠 Key Concepts Implemented

* Ledger-based financial architecture
* Idempotent transaction handling
* Atomic balance computation
* Secure REST API design
* Production-ready backend structuring


🔥 Why This Project Matters

This project simulates how real-world banking systems maintain:

* Transaction integrity
* Data consistency
* Security & authentication
* Duplicate prevention


👨‍💻 Author

Ansh Oberai
GitHub: https://github.com/anshob257
LinkedIn: https://www.linkedin.com/in/ansh-oberoi295
