let expenses = [];

document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    addExpense();
});

function addExpense() {
    const type = document.getElementById('expenseType').value;
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);

    if (description && amount) {
        const expense = {
            type: type,
            description: description,
            amount: amount
        };

        expenses.push(expense);
        updateExpenseTable();
        calculateTotal();
        clearForm();
    }
}

function updateExpenseTable() {
    const tableBody = document.querySelector('#expenseTable tbody');
    tableBody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td data-label="Type">${expense.type}</td>
            <td data-label="Description">${expense.description}</td>
            <td data-label="Amount">₹${expense.amount.toFixed(2)}</td>
            <td data-label="Action"><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
    });
}

function calculateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalAmount').textContent = `₹${total.toFixed(2)}`;
}

function clearForm() {
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseAmount').value = '';
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenseTable();
    calculateTotal();
}

// Initialize the table
updateExpenseTable();
calculateTotal();