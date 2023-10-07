const TAX_RATE = 0.0625; 

const itemPrices = {
    hotdogs: 3.75,
    fries: 3.00,
    sodas: 2.50
};


const itemQuantities = {
    hotdogs: 0,
    fries: 0,
    sodas: 0
};


function calculateOrder() {
    let subtotal = 0;
    for (const itemName in itemQuantities) {
        if (itemQuantities.hasOwnProperty(itemName)) {
            const quantity = parseInt(prompt(`How many ${itemName} do you want?`)) || 0;
            itemQuantities[itemName] = quantity;
        }
    }


    for (const itemName in itemQuantities) {
        if (itemQuantities.hasOwnProperty(itemName)) {
            subtotal += itemQuantities[itemName] * itemPrices[itemName];
        }
    }
  
    let discount = 0;
    if (subtotal >= 25) {
        discount = subtotal * 0.10;
    }

    const taxAmount = (subtotal - discount) * TAX_RATE;
    const finalTotal = subtotal - discount + taxAmount;

    const orderDetailsDiv = document.getElementById("order-details");

    let orderDetailsHTML = '<h2>Order Summary</h2>';

    for (const itemName in itemQuantities) {
        if (itemQuantities.hasOwnProperty(itemName)) {
            const quantity = itemQuantities[itemName];
            const cost = quantity * itemPrices[itemName];
            orderDetailsHTML += `
                <p>${itemName}: ${quantity} x $${itemPrices[itemName].toFixed(2)} = $${cost.toFixed(2)}</p>
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

