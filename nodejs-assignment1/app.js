//assignment----28-11-2024


const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 9003;

// Middleware to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the views directory and set Pug as the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Sample users for login verification
var products = [
  { name: 'book1', description: 'book 1 available', price:150,available:10},
  { name: 'book2', description: 'book2 available ' ,price:100,available:19},
];
app.get('/',(req,res)=>{
    res.render('user',{products:products});
});
app.get('/admin', (req, res) => {
    res.render('admin');  // Render the 'admin.pug' form page
});



// Route to render login form
app.post('/admin', (req, res) => {
    
    const {name,description,price,availability}=req.body;
    if(name && description && price && availability){
        const p={name,description,price,availability};
        products.push(p);
        res.redirect('/')
    }
    else{
        res.send('invalid details')
    }
    
    
});

// Route to handle login form submission


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
