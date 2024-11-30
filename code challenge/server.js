const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize app
const app = express();
const port = 3003;

// In-memory data storage
let products = [];
let users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' }
];

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML pages
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve the login page where the user selects a role
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Handle the login form submission and check the role
app.post('/login', (req, res) => {
  const {  role } = req.body;

  // Check if user exists and the password matches
  const user = users.find(u => u.role === role);

  if (user) {
    // If valid admin credentials
    if (role === 'admin') {
      res.redirect('/admin/login'); // Redirect to Admin login page
    } 
    // If valid user credentials
    else if (role === 'user') {
      res.redirect('/user/login'); // Redirect to User login page
    }
  } else {
    res.send('Invalid credentials');
  }
});

// Admin Routes
app.get('/admin/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin_login.html'));
});

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = users.find(user => user.username === username && user.password === password && user.role === 'admin');
  
  if (adminUser) {
    res.redirect('/admin/dashboard');  // Redirect to Admin Dashboard
  } else {
    res.send('Invalid admin credentials');
  }
});

app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin_dashboard.html'));
});

// Register new product (Admin)
app.get('/admin/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register_product.html'));
});

app.post('/admin/register', (req, res) => {
  const { name, id, price, category, manufacturingDate, expirationDate } = req.body;
  const newProduct = { name, id, price, category, manufacturingDate, expirationDate };
  products.push(newProduct);
  res.redirect('/admin/products');
});

app.get('/admin/products', (req, res) => {
  res.render('view_products', { products });
});

// User Routes
app.get('/user/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user_login.html'));
});

app.post('/user/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password && u.role === 'user');

  if (user) {
    res.redirect('/user/search'); // Redirect to User Dashboard
  } else {
    res.send('Invalid user credentials');
  }
});



// User Product Search
app.get('/user/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'search_product.html'));
});

app.post('/user/search', (req, res) => {
  const { searchTerm, category } = req.body;

  // Filter products based on name and/or category (if category is provided)
  let filteredProducts = products.filter(product => {
    const matchByName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchByCategory = category ? product.category.toLowerCase().includes(category.toLowerCase()) : true;

    return matchByName && matchByCategory;
  });

  // If no products match the search criteria, show message
  if (filteredProducts.length === 0) {
    res.render('view_products', { products: [], message: "No products found matching your search." });
  } else {
    res.render('view_products', { products: filteredProducts });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
