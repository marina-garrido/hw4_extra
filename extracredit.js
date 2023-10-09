// Constants
const TAX_RATE = 0.0625; // 6.25%

// Define an associative array for item names and prices
const itemPrices = {
    hotdogs: 3.75,
    fries: 3.00,
    sodas: 2.50
};

// Define an associative array for item names and quantities
const itemQuantities = {
    hotdogs: 0,
    fries: 0,
    sodas: 0
};

// Function to format currency
function formatCurrency(amount) {
    // Round the amount to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;

    // Convert to a string
    const amountString = String(roundedAmount);

    // Check if the string contains a decimal point
    if (amountString.includes('.')) {
        const parts = amountString.split('.');
        let decimalPart = parts[1];

        // Ensure two decimal places
        if (decimalPart.length === 1) {
            decimalPart += '0';
        }

        return '$' + parts[0] + '.' + decimalPart;
    } else {
        // No decimal part, add '.00'
        return '$' + amountString + '.00';
    }
}

// Function to calculate and display the order
function calculateOrder() {
    // Initialize variables for subtotal, discount, and tax
    let subtotal = 0;
    let discount = 0;
    let taxAmount = 0;

    // Loop to get quantities from the user and calculate subtotal
    for (const item in itemQuantities) {
        const quantity = parseInt(document.getElementById(item).value) || 0;
        itemQuantities[item] = quantity;
        subtotal += quantity * itemPrices[item];
    }

    // Apply discount if subtotal is $25 or more
    if (subtotal >= 25) {
        discount = subtotal * 0.10;
    }

    // Calculate tax amount
    taxAmount = (subtotal - discount) * TAX_RATE;

    // Calculate final total
    const finalTotal = subtotal - discount + taxAmount;

    // Display order details
    const orderDetailsDiv = document.getElementById("order-details");
    let orderDetailsHTML = '';

    // Loop to display quantity and cost for each item
    for (const item in itemQuantities) {
        const quantity = itemQuantities[item];
        const itemCost = quantity * itemPrices[item];
        orderDetailsHTML += `<p>${item}: ${quantity} x ${formatCurrency(itemPrices[item])} = ${formatCurrency(itemCost)}</p>`;
    }

    orderDetailsHTML += `
        <p>Subtotal: ${formatCurrency(subtotal)}</p>
        <p>Discount: ${formatCurrency(discount)}</p>
        <p>Tax: ${formatCurrency(taxAmount)}</p>
        <h3>Total: ${formatCurrency(finalTotal)}</h3>
    `;

    // Set the HTML content of the order details div
    orderDetailsDiv.innerHTML = orderDetailsHTML;
}

