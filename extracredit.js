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

/*
formatCurrency()
Parameters: amount (number) to turn into currency
Returns: formatted currency string
Purpose: formats with two decimals per spec
*/
function formatCurrency(amount) {
    // Round the amount to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;

    // Convert to a string
    const amountString = roundedAmount.toString();

    // Split the string 
    const parts = amountString.split('.');

    // If no decimal part, add .00
    if (parts.length === 1) {
        return '$' + amountString + '.00';
    }

    // If one decimal part, add a zero
    if (parts[1].length === 1) {
        return '$' + amountString + '0';
    }

    // If two decimal parts
    return '$' + amountString;
}

/*
calculateOrder()
Parameters: None
Returns: None (displays the final order)
Purpose: Calculate and display the order
*/
function calculateOrder() {
    let subtotal = 0;

    // Loop through itemQuantities to get quantities and calculate subtotal
    for (const item in itemQuantities) {
        const quantity = parseInt(prompt(`Enter the quantity of ${item}:`)) || 0;
        itemQuantities[item] = quantity;
        subtotal += quantity * itemPrices[item];
    }

    // Apply discount if subtotal is $25 or more
    let discount = 0;
    if (subtotal >= 25) {
        discount = subtotal * 0.10;
    }

    // Calculate final total including tax
    const taxAmount = (subtotal - discount) * TAX_RATE;
    const finalTotal = subtotal - discount + taxAmount;

    // Get the div element to display the order details
    const orderDetailsDiv = document.getElementById("order-details");

    // Generate the HTML for order details
    let orderDetailsHTML = "<h2>Order Details</h2>";
    for (const item in itemQuantities) {
        orderDetailsHTML += `<p>${item}: ${itemQuantities[item]} x ${formatCurrency(itemPrices[item])} = ${formatCurrency(itemQuantities[item] * itemPrices[item])}</p>`;
    }
    orderDetailsHTML += `<p>Subtotal: ${formatCurrency(subtotal)}</p>`;
    orderDetailsHTML += `<p>Discount: ${formatCurrency(discount)}</p>`;
    orderDetailsHTML += `<p>Tax: ${formatCurrency(taxAmount)}</p>`;
    orderDetailsHTML += `<h3>Total: ${formatCurrency(finalTotal)}</h3>`;

    // Set the HTML content of the order details div
    orderDetailsDiv.innerHTML = orderDetailsHTML;
}

// Call the calculateOrder function when the page loads (for testing purposes)
calculateOrder();

