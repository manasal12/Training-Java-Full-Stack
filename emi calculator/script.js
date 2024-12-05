document.getElementById('emiForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const salary = document.getElementById('salary').value;
    const loanAmount = document.getElementById('loan_amount').value;
    const loanType = document.getElementById('loan_type').value;

    // Send POST request to backend to calculate EMI
    fetch('/calculate-emi', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            salary: salary,
            loan_amount: loanAmount,
            loan_type: loanType
        })
    })
    .then(response => response.json())
    .then(data => {
        // Show results
        document.getElementById('result').classList.remove('hidden');
        document.getElementById('resultType').textContent = `Loan Type: ${data.loan_type}`;
        document.getElementById('resultDuration').textContent = `Loan Duration: ${data.loan_duration} months`;
        document.getElementById('resultEMI').textContent = `Calculated EMI: ₹${data.emi}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
