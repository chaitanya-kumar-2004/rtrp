document.getElementById('loanForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateLoan();
});

function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const loanTermYears = parseInt(document.getElementById('loanTerm').value);

    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = loanTermYears * 12;

    const monthlyEMI = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                       (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalAmount = monthlyEMI * numberOfPayments;
    const totalInterest = totalAmount - loanAmount;

    displayResults(monthlyEMI, totalInterest, totalAmount);
    generateAmortizationSchedule(loanAmount, monthlyInterestRate, monthlyEMI, numberOfPayments);
}

function displayResults(monthlyEMI, totalInterest, totalAmount) {
    document.getElementById('monthlyEMI').textContent = formatCurrency(monthlyEMI);
    document.getElementById('totalInterest').textContent = formatCurrency(totalInterest);
    document.getElementById('totalAmount').textContent = formatCurrency(totalAmount);
    document.getElementById('results').classList.remove('hidden');
}

function generateAmortizationSchedule(loanAmount, monthlyInterestRate, monthlyEMI, numberOfPayments) {
    const tableBody = document.getElementById('amortizationTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    let remainingBalance = loanAmount;

    for (let month = 1; month <= numberOfPayments; month++) {
        const interestPayment = remainingBalance * monthlyInterestRate;
        const principalPayment = monthlyEMI - interestPayment;
        remainingBalance -= principalPayment;

        const row = tableBody.insertRow();
        row.insertCell(0).textContent = month;
        row.insertCell(1).textContent = formatCurrency(monthlyEMI);
        row.insertCell(2).textContent = formatCurrency(principalPayment);
        row.insertCell(3).textContent = formatCurrency(interestPayment);
        row.insertCell(4).textContent = formatCurrency(Math.max(0, remainingBalance));
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}