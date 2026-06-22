// Dashboard JavaScript

// Check authentication on page load
document.addEventListener('DOMContentLoaded', async () => {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    // Load dashboard data
    await loadDashboard();

    // Setup logout
    document.getElementById('logoutBtn')?.addEventListener('click', logout);

    // Setup mobile menu
    document.getElementById('menuToggle')?.addEventListener('click', toggleMenu);
});

// Load all dashboard data
async function loadDashboard() {
    showLoading();
    try {
        // Load user profile
        const userProfile = await userAPI.getProfile();
        updateUserInfo(userProfile);

        // Load account details
        const accountDetails = await accountAPI.getDetails();
        updateAccountInfo(accountDetails);

        // Load transactions
        const transactions = await transactionAPI.getAll(5);
        updateTransactions(transactions);

        // Calculate stats
        calculateStats(transactions.transactions);
    } catch (error) {
        console.error('Error loading dashboard:', error);
        alert('Error loading dashboard. Please refresh the page.');
    } finally {
        hideLoading();
    }
}

// Update user information
function updateUserInfo(user) {
    document.getElementById('userName').textContent = user.firstName || 'User';
    document.getElementById('userEmail').textContent = user.email;
}

// Update account information
function updateAccountInfo(account) {
    document.getElementById('accountNumber').textContent = account.accountNumber;
    document.getElementById('accountType').textContent = account.accountType;
    document.getElementById('accountTypeDetail').textContent = 
        `${account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)} Account`;
    document.getElementById('balanceAmount').textContent = formatCurrency(account.balance);
    document.getElementById('memberSince').textContent = formatDate(account.createdAt);
}

// Update transactions list
function updateTransactions(response) {
    const container = document.getElementById('transactionsContainer');
    const transactions = response.transactions;

    if (transactions.length === 0) {
        container.innerHTML = '<p class="loading">No transactions yet</p>';
        return;
    }

    container.innerHTML = transactions.map(txn => `
        <div class="transaction-item ${txn.type}">
            <div class="transaction-info">
                <div class="transaction-icon">${getTransactionIcon(txn.type)}</div>
                <div class="transaction-details">
                    <h4>${txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}</h4>
                    <p>${txn.description}</p>
                </div>
            </div>
            <div class="transaction-amount">
                <div class="amount">${txn.type === 'withdrawal' || txn.type === 'transfer' ? '-' : '+'}${formatCurrency(txn.amount)}</div>
                <div class="date">${formatDate(txn.createdAt)}</div>
            </div>
        </div>
    `).join('');
}

// Get transaction icon
function getTransactionIcon(type) {
    const icons = {
        deposit: '📥',
        withdrawal: '📤',
        transfer: '💸',
        payment: '💳'
    };
    return icons[type] || '📋';
}

// Calculate statistics
function calculateStats(transactions) {
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    let totalTransfers = 0;

    transactions.forEach(txn => {
        if (txn.type === 'deposit') totalDeposits += txn.amount;
        if (txn.type === 'withdrawal') totalWithdrawals += txn.amount;
        if (txn.type === 'transfer') totalTransfers += txn.amount;
    });

    document.getElementById('totalDeposits').textContent = formatCurrency(totalDeposits);
    document.getElementById('totalWithdrawals').textContent = formatCurrency(totalWithdrawals);
    document.getElementById('totalTransfers').textContent = formatCurrency(totalTransfers);
    document.getElementById('totalTransactions').textContent = transactions.length;
}

// Logout function
async function logout() {
    try {
        await authAPI.logout();
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        removeToken();
        window.location.href = 'index.html';
    }
}

// Toggle mobile menu
function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.remove('active');
    });
});