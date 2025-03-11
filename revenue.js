document.getElementById('revenueForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateProfitLoss();
});

function calculateProfitLoss() {
    const revenue = parseFloat(document.getElementById('revenue').value);
    const expenses = parseFloat(document.getElementById('expenses').value);

    const profit = revenue - expenses;
    const profitMargin = (profit / revenue) * 100;

    displayResults(revenue, expenses, profit, profitMargin);
}

function displayResults(revenue, expenses, profit, profitMargin) {
    document.getElementById('totalRevenue').textContent = formatCurrency(revenue);
    document.getElementById('totalExpenses').textContent = formatCurrency(expenses);

    const profitLossElement = document.getElementById('profitLoss');
    profitLossElement.textContent = formatCurrency(Math.abs(profit));
    profitLossElement.className = profit >= 0 ? 'profit' : 'loss';
    profitLossElement.textContent += profit >= 0 ? ' Profit' : ' Loss';

    const profitMarginElement = document.getElementById('profitMargin');
    profitMarginElement.textContent = profitMargin.toFixed(2) + '%';
    profitMarginElement.className = profit >= 0 ? 'profit' : 'loss';

    document.getElementById('result').classList.remove('hidden');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}