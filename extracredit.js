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

// Function to calculate and display the order
function calculateOrder() {
    let subtotal = 0;

    // Loop through itemQuantities to get quantities from the user
    for (const itemName in itemQuantities) {
        if (itemQuantities.hasOwnProperty(itemName)) {
            const quantity = parseInt(prompt(`How many ${itemName} do you want?`)) || 0;
            itemQuantities[itemName] = quantity;
        }
    }

    // Calculate subtotal using a loop
    for (const itemName in itemQuantities) {
        if (itemQuantities.hasOwnProperty(itemName)) {
            subtotal += itemQuantities[itemName] * itemPrices[itemName];
        }
    }

    // Apply discount if subtotal is at least $25
    let discount = 0;
    if (subtotal >= 25) {
        discount = subtotal * 0.10;
    }

    // Calculate final total including tax
    const taxAmount = (subtotal - discount) * TAX_RATE;
    const finalTotal = subtotal - discount + taxAmount;

    // Get the div element where we want to display the order details
    const orderDetailsDiv = document.getElementById("order-details");

    // Generate the HTML for order details
    let orderDetailsHTML = '<h2>Order Summary</h2>';

    // Loop through itemQuantities to display quantities and costs
    for (const itemName in itemQuantities) {
        if (itemQuantities.hasOwnProperty(itemName)) {
            const quantity = itemQuantities[itemName];
            const cost = quantity * itemPrices[itemName];
            orderDetailsHTML += `
                <p>${itemName}: ${quantity} x $${itemPrices[itemName]} = $${cost.toFixed(2)}</p>
            `;
        }
    }

    orderDetailsHTML += `
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <p>Discount: $${discount.toFixed(2)}</p>
        <p>Tax: $${taxAmount.toFixed(2)}</p>
        <h3>Total: $${finalTotal.toFixed(2)}</h3>
    `;

    // Set the HTML content of the order details div
    orderDetailsDiv.innerHTML = orderDetailsHTML;
}


