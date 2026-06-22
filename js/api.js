// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Set token in localStorage
function setToken(token) {
    localStorage.setItem('token', token);
}

// Remove token from localStorage
function removeToken() {
    localStorage.removeItem('token');
}

// Check if user is authenticated
function isAuthenticated() {
    return getToken() !== null;
}

// API call helper
async function apiCall(endpoint, method = 'GET', data = null) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                // Token expired or invalid
                removeToken();
                window.location.href = 'index.html';
            }
            throw new Error(result.message || 'API request failed');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Authentication APIs
const authAPI = {
    register: (data) => apiCall('/auth/register', 'POST', data),
    login: (data) => apiCall('/auth/login', 'POST', data),
    verify: () => apiCall('/auth/verify'),
    logout: () => apiCall('/auth/logout', 'POST')
};

// User APIs
const userAPI = {
    getProfile: () => apiCall('/users/profile'),
    updateProfile: (data) => apiCall('/users/profile', 'PUT', data),
    changePassword: (data) => apiCall('/users/change-password', 'POST', data),
    getAllUsers: () => apiCall('/users'),
    getUserById: (id) => apiCall(`/users/${id}`)
};

// Account APIs
const accountAPI = {
    getDetails: () => apiCall('/accounts/details'),
    getBalance: () => apiCall('/accounts/balance'),
    updateBalance: (amount) => apiCall('/accounts/update-balance', 'POST', { amount })
};

// Transaction APIs
const transactionAPI = {
    getAll: (limit = 10, skip = 0) => apiCall(`/transactions?limit=${limit}&skip=${skip}`),
    getById: (id) => apiCall(`/transactions/${id}`),
    deposit: (data) => apiCall('/transactions/deposit', 'POST', data),
    withdrawal: (data) => apiCall('/transactions/withdrawal', 'POST', data),
    transfer: (data) => apiCall('/transactions/transfer', 'POST', data)
};

// Helper function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Show loading overlay
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.add('active');
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.remove('active');
}

// Redirect to page
function redirectTo(page) {
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
    } else {
        window.location.href = page;
    }
}