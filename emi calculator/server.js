const express = require('express');
const path = require('path');
const app = express();

// Middleware for serving static files (CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle POST data (body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to calculate EMI
app.post('/calculate-emi', (req, res) => {
    const { salary, loan_amount, loan_type } = req.body;

    // Predefined interest rates for loan types
    const loanTypes = {
        "Home Loan": 8.5,
        "Car Loan": 9.0,
        "Education Loan": 7.5
    };

    const interestRate = loanTypes[loan_type];
    const loanAmount = parseFloat(loan_amount);
    const salaryAmount = parseFloat(salary);

    // Function to calculate EMI
    const calculateEMI = (loanAmount, interestRate, loanDuration) => {
        const monthlyInterestRate = (interestRate / 100) / 12;
        const emi = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanDuration));
        return emi.toFixed(2);
    };

    // Suggest loan duration based on salary and loan amount
    let loanDuration;
    if (loanAmount <= salaryAmount * 3) {
        loanDuration = 60; // 5 years
    } else if (loanAmount <= salaryAmount * 6) {
        loanDuration = 120; // 10 years
    } else {
        loanDuration = 240; // 20 years
    }

    // Calculate the EMI based on the selected loan type and suggested duration
    const emi = calculateEMI(loanAmount, interestRate, loanDuration);

    // Send response back with EMI details
    res.json({
        emi,
        loan_duration: loanDuration,
        loan_type: loan_type
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
