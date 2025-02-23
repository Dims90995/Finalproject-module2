interface User {
    username: string;
    password: string;
  }
  
  class Auth {
    private users: User[] = [];
    private storageKey = 'users';
  
    constructor() {
      this.loadUsers();
    }
  
    // Load existing users from localStorage
    private loadUsers(): void {
      const usersData = localStorage.getItem(this.storageKey);
      if (usersData) {
        this.users = JSON.parse(usersData);
      }
    }
  
    // Save users back to localStorage
    private saveUsers(): void {
      localStorage.setItem(this.storageKey, JSON.stringify(this.users));
    }
  
    // Register a new user if the username isn't taken
    public register(username: string, password: string): boolean {
      if (this.users.find(user => user.username === username)) {
        return false; // Username already exists
      }
      this.users.push({ username, password });
      this.saveUsers();
      return true;
    }
  
    // Check user credentials for login
    public login(username: string, password: string): boolean {
      return this.users.some(
        user => user.username === username && user.password === password
      );
    }
  }
  
  const auth = new Auth();
  
  // Handle login form submission
  document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
  
    const messageDiv = document.getElementById('message') as HTMLDivElement;
    if (auth.login(username, password)) {
      messageDiv.innerText = 'Login successful!';
    } else {
      messageDiv.innerText = 'Invalid username or password.';
    }
  });
  
  // Handle registration form submission
  document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('new-username') as HTMLInputElement;
    const passwordInput = document.getElementById('new-password') as HTMLInputElement;
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
  
    const messageDiv = document.getElementById('message') as HTMLDivElement;
    if (auth.register(username, password)) {
      messageDiv.innerText = 'Registration successful! You can now log in.';
      // Optionally switch to login form automatically after registration
      toggleForms();
    } else {
      messageDiv.innerText = 'Username already exists. Please choose another one.';
    }
  });
  
  // Toggle between login and register forms
  document.getElementById('toggle-link')?.addEventListener('click', function(e) {
    e.preventDefault();
    toggleForms();
  });
  
  function toggleForms(): void {
    const loginForm = document.getElementById('login-form') as HTMLFormElement;
    const registerForm = document.getElementById('register-form') as HTMLFormElement;
    const formTitle = document.getElementById('form-title') as HTMLElement;
    const toggleLink = document.getElementById('toggle-link') as HTMLElement;
  
    if (loginForm.style.display === 'none') {
      // Show login form
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      formTitle.innerText = 'Login';
      toggleLink.innerText = "Don't have an account? Register here";
    } else {
      // Show registration form
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      formTitle.innerText = 'Register';
      toggleLink.innerText = 'Already have an account? Login here';
    }
  }
  