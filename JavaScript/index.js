// Codah Pedraza
// 12/3/24
// 24/FA ITSE 2302-7PDH2

// constants retrieving the ids from index.html (#1)
const form = document.getElementById('orderform');
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

// event listener for form submission (#2)
form.addEventListener('submit', (event) => {
	event.preventDefault();

	// retrieves form values inputted by the user
	const name = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const size = document.querySelector('input[name="size"]:checked').value;
	const quantity = parseInt(document.getElementById('quantity').value);

	// checks if a valid quantity is provided (#3)
	let isValidQuantity = true;
	// (#4)
	if (quantity < 1 || quantity > 20) {
		isValidQuantity = false;
		alert('Quantity must be between 1 and 20.');
		return;
	}

	// gets selected colors with the use of an empty array (#5)
	const selectedColors = [];
	document.querySelectorAll('input[name="color"]:checked').forEach(color => {
		selectedColors.push(color.value);
	});

	// ensures at least one color is selected
	if (selectedColors.length === 0) {
		alert('Please select at least one color.');
		return;
	}

	// retrieves the user's payment info
	const cardNumber = document.getElementById('cardNumber').value;
	const expDate = document.getElementById('expDate').value;

	// constants declaring shirt cost/value
	const pricePerShirt = 20;
	const totalCost = calculateTotalCost(quantity, pricePerShirt);

	// checks to see if everything is ready to display
	let isReadyToDisplay = true;

	// checks for an invalid shirt size (ghost code + proves functionality) (#6)
	switch (size) {
		case 'Small':
		case 'Medium':
		case 'Large':
			break;
		default:
			alert('Invalid shirt size selected.');
			isReadyToDisplay = false;
			return;
	}

	// displays the order summary and catches any errors (#7)
	try {
		// if else checking for errors then displaying the order summary if everything runs correctly (#8)
		if (isReadyToDisplay && isValidQuantity) {
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
		} else {
			throw new Error('Order data is incomplete or invalid.');
		}
	} catch (error) {
		console.error('Error displaying order summary:', error.message);
		alert('An error occurred while processing your order. Please try again.');
	}
});

// event listener for form reset
form.addEventListener('reset', () => {
	orderSummary.style.display = 'none';
	orderSummary.innerHTML = '';
});