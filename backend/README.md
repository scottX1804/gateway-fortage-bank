# Gateway Fortage Bank - Backend API

Professional Node.js + Express + MongoDB banking backend with secure authentication and transaction management.

## Features

✅ User authentication with JWT
✅ Account management
✅ Transaction history (deposits, withdrawals, transfers)
✅ Password hashing with bcryptjs
✅ Input validation
✅ CORS enabled
✅ MongoDB integration
✅ Error handling

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create .env File

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb+srv://1804USER:Chris$00&5224$@cluster0.utkmbkk.mongodb.net/?appName=Cluster0
JWT_SECRET=your_super_secret_key_change_this
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:8000
```

### 3. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on: `http://localhost:5000`

## API Endpoints

### Authentication

#### Register
```
POST /api/auth/register
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123",
  "phone": "+1234567890",
  "accountType": "checking"
}
```

#### Login
```
POST /api/auth/login
Body: {
  "username": "johndoe",
  "password": "password123"
}
```

#### Verify Token
```
GET /api/auth/verify
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
```

### User Profile

#### Get Profile
```
GET /api/users/profile
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
```

#### Update Profile
```
PUT /api/users/profile
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
Body: {
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1234567890"
}
```

#### Change Password
```
POST /api/users/change-password
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
Body: {
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

### Account Management

#### Get Account Details
```
GET /api/accounts/details
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
```

#### Get Balance
```
GET /api/accounts/balance
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
```

### Transactions

#### Get All Transactions
```
GET /api/transactions?limit=10&skip=0
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
```

#### Get Transaction by ID
```
GET /api/transactions/:id
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
```

#### Deposit
```
POST /api/transactions/deposit
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
Body: {
  "amount": 500,
  "description": "Direct deposit"
}
```

#### Withdrawal
```
POST /api/transactions/withdrawal
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
Body: {
  "amount": 100,
  "description": "ATM withdrawal"
}
```

#### Transfer
```
POST /api/transactions/transfer
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
Body: {
  "amount": 250,
  "recipientAccount": "ACC1234567890",
  "recipientName": "Jane Smith",
  "description": "Payment to Jane"
}
```

## Project Structure

```
backend/
├── models/
│   ├── User.js           # User schema and methods
│   └── Transaction.js    # Transaction schema
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── users.js         # User profile endpoints
│   ├── accounts.js      # Account management endpoints
│   └── transactions.js  # Transaction endpoints
├── middleware/
│   └── auth.js          # JWT verification middleware
├── server.js            # Express server setup
├── package.json         # Dependencies
├── .env.example         # Environment template
└── README.md            # This file
```

## Security Features

- 🔒 JWT token-based authentication
- 🔐 Bcryptjs password hashing
- ✅ Input validation with express-validator
- 🛡️ CORS enabled
- 🔑 Environment variables for secrets
- 📝 Role-based access control

## Database Schema

### User
- firstName, lastName
- email, username
- password (hashed)
- phone
- accountNumber (auto-generated)
- accountType (savings, checking, business)
- balance
- role (user, admin)
- isVerified, twoFactorEnabled
- lastLogin, createdAt, updatedAt

### Transaction
- userId (reference to User)
- type (deposit, withdrawal, transfer, payment)
- amount, description
- recipientAccount, recipientName
- status (pending, completed, failed)
- transactionFee
- referenceNumber (unique)
- balanceAfter
- createdAt, updatedAt

## Error Handling

All endpoints return structured error responses:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Valid email is required"
    }
  ]
}
```

## Future Enhancements

- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Loan management
- [ ] Bill payments
- [ ] Account freeze/lock
- [ ] Transaction notifications
- [ ] Admin dashboard
- [ ] Advanced reporting

## Testing

Run tests with:
```bash
npm test
```

## Deployment

### Deploy to Heroku

1. Create Heroku account at https://www.heroku.com
2. Install Heroku CLI
3. Login: `heroku login`
4. Create app: `heroku create your-app-name`
5. Set environment variables: `heroku config:set MONGODB_URI=your_uri`
6. Deploy: `git push heroku main`

### Deploy to Railway.app

1. Sign up at https://railway.app
2. Connect your GitHub repository
3. Set environment variables
4. Deploy automatically

## Support

For issues or questions, contact support or open an issue on GitHub.

---

**Last Updated:** 2026-06-22