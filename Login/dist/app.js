var _a, _b, _c;
var Auth = /** @class */ (function () {
    function Auth() {
        this.users = [];
        this.storageKey = 'users';
        this.loadUsers();
    }
    // Load existing users from localStorage
    Auth.prototype.loadUsers = function () {
        var usersData = localStorage.getItem(this.storageKey);
        if (usersData) {
            this.users = JSON.parse(usersData);
        }
    };
    // Save users back to localStorage
    Auth.prototype.saveUsers = function () {
        localStorage.setItem(this.storageKey, JSON.stringify(this.users));
    };
    // Register a new user if the username isn't taken
    Auth.prototype.register = function (username, password) {
        if (this.users.find(function (user) { return user.username === username; })) {
            return false; // Username already exists
        }
        this.users.push({ username: username, password: password });
        this.saveUsers();
        return true;
    };
    // Check user credentials for login
    Auth.prototype.login = function (username, password) {
        return this.users.some(function (user) { return user.username === username && user.password === password; });
    };
    return Auth;
}());
var auth = new Auth();
// Handle login form submission
(_a = document.getElementById('login-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (e) {
    e.preventDefault();
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var username = usernameInput.value.trim();
    var password = passwordInput.value;
    var messageDiv = document.getElementById('message');
    if (auth.login(username, password)) {
        messageDiv.innerText = 'Login successful!';
    }
    else {
        messageDiv.innerText = 'Invalid username or password.';
    }
});
// Handle registration form submission
(_b = document.getElementById('register-form')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', function (e) {
    e.preventDefault();
    var usernameInput = document.getElementById('new-username');
    var passwordInput = document.getElementById('new-password');
    var username = usernameInput.value.trim();
    var password = passwordInput.value;
    var messageDiv = document.getElementById('message');
    if (auth.register(username, password)) {
        messageDiv.innerText = 'Registration successful! You can now log in.';
        // Optionally switch to login form automatically after registration
        toggleForms();
    }
    else {
        messageDiv.innerText = 'Username already exists. Please choose another one.';
    }
});
// Toggle between login and register forms
(_c = document.getElementById('toggle-link')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function (e) {
    e.preventDefault();
    toggleForms();
});
function toggleForms() {
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    var formTitle = document.getElementById('form-title');
    var toggleLink = document.getElementById('toggle-link');
    if (loginForm.style.display === 'none') {
        // Show login form
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        formTitle.innerText = 'Login';
        toggleLink.innerText = "Don't have an account? Register here";
    }
    else {
        // Show registration form
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        formTitle.innerText = 'Register';
        toggleLink.innerText = 'Already have an account? Login here';
    }
}
