// Constants
const ITEM_PRICES = {
    "Hotdogs": 3.75,
    "French Fries": 3.00,
    "Drinks": 2.50
};
const TAX_RATE = 0.0625; // 6.25%

// Initialize an object to store item quantities
const itemQuantities = {};

// Function to format currency
function formatCurrency(amount) {
    // Round the amount to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;
    return '$' + roundedAmount.toFixed(2);
}

// Function to calculate and display the order
function calculateOrder() {
    // Initialize variables for subtotal, discount, and tax
    let subtotal = 0;
    let discount = 0;
    let taxAmount = 0;

    // Loop to get quantities from the user and calculate subtotal
    for (const item in ITEM_PRICES) {
        const quantity = parseInt(prompt(`How many ${item} do you want?`)) || 0;
        itemQuantities[item] = quantity;
        subtotal += quantity * ITEM_PRICES[item];
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
        const itemCost = quantity * ITEM_PRICES[item];
        orderDetailsHTML += `<p>${item}: ${quantity} x ${formatCurrency(ITEM_PRICES[item])} = ${formatCurrency(itemCost)}</p>`;
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
