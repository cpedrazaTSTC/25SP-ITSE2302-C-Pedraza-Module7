// Codah Pedraza
// 12/3/24
// 24/FA ITSE 2302-7PDH2

// the two ID's defined from purchasepage.html in order 
// to fulfill the overall functionality of the logic (constant)
const form = document.getElementById('orderform');
// constant
const orderSummary = document.getElementById('ordersum');

// function to calculate the total cost
function calculateTotalCost(quantity, pricePerShirt) {
    return quantity * pricePerShirt;
}

// function to display the order summary
function displayOrderSummary({ name, email, size, selectedColors, quantity, totalCost, cardNumber, expDate }) {
    orderSummary.innerHTML = `
        <h2>Order Summary</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Selected Size:</strong> ${size}</p>
        <p><strong>Selected Colors:</strong> ${selectedColors.join(', ')}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Total Cost:</strong> $${totalCost}</p>
        <p><strong>Card Ending:</strong> ****${cardNumber.slice(-4)}</p>
        <p><strong>Expiration Date:</strong> ${expDate}</p>
    `;
    orderSummary.style.display = 'block';
    orderSummary.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // retrieves form values based off user input (constant)
    const name = document.getElementById('name').value;
	// constant
    const email = document.getElementById('email').value;
	// constant
    const size = document.querySelector('input[name="size"]:checked').value;
	// constant
    const quantity = parseInt(document.getElementById('quantity').value);

    // gets selected colors (constant)
    const selectedColors = [];
    document.querySelectorAll('input[name="color"]:checked').forEach(color => {
        selectedColors.push(color.value);
    });

    // retrieves the user's payment info (constant)
    const cardNumber = document.getElementById('cardNumber').value;
	// constant
    const expDate = document.getElementById('expDate').value;

    // calculates the total cost (constant)
    const pricePerShirt = 20;
	// constant
    const totalCost = calculateTotalCost(quantity, pricePerShirt);

    // displays order summary
    displayOrderSummary({
        name,
        email,
        size,
        selectedColors,
        quantity,
        totalCost,
        cardNumber,
        expDate,
    });
});

// event listener for form reset
form.addEventListener('reset', () => {
    orderSummary.style.display = 'none';
    orderSummary.innerHTML = '';
});