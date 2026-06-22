// Authentication JavaScript

// Register form submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleRegister();
    });
}

// Login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleLogin();
    });
}

// Handle registration
async function handleRegister() {
    const firstName = document.getElementById('firstName')?.value;
    const lastName = document.getElementById('lastName')?.value;
    const email = document.getElementById('email')?.value;
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;
    const phone = document.getElementById('phone')?.value;
    const accountType = document.getElementById('accountType')?.value || 'checking';

    if (!firstName || !lastName || !email || !username || !password || !phone) {
        alert('Please fill all fields');
        return;
    }

    showLoading();
    try {
        const response = await authAPI.register({
            firstName,
            lastName,
            email,
            username,
            password,
            phone,
            accountType
        });

        setToken(response.token);
        alert('Account created successfully!');
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert('Registration failed: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Handle login
async function handleLogin() {
    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;

    if (!username || !password) {
        alert('Please fill all fields');
        return;
    }

    showLoading();
    try {
        const response = await authAPI.login({ username, password });
        setToken(response.token);
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    } catch (error) {
        alert('Login failed: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Toggle between login and register
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm?.style.display !== 'none') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
}