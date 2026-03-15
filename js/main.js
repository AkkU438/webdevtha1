// Function to generate the HTML for a single car card
function createCarCard(car) {
    return `
        <article class="card">
            <div class="card-container">
                <h3>${car.year} ${car.make} ${car.model}</h3>
                <p class="price">$${car.price.toLocaleString()}</p>
                <p><strong>Mileage:</strong> ${car.mileage.toLocaleString()} miles</p>
                <p><strong>Color:</strong> ${car.color}</p>
                <p><small>${car.gasMileage}</small></p>
            </div>
        </article>
    `;
}

// Function to display cars in the grid
function displayCars(carsArray) {
    const container = document.getElementById('car-container');
    container.innerHTML = ""; // Clear existing

    if (carsArray.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <h3>No cars match your criteria.</h3>
                <p>Please adjust your filters and try again.</p>
            </div>`;
        return;
    }

    carsArray.forEach(car => {
        container.innerHTML += createCarCard(car);
    });
}

// Main filtering logic
function filterCars() {
    // Get values from inputs
    const minYear = parseInt(document.getElementById('min-year').value) || 0;
    const maxYear = parseInt(document.getElementById('max-year').value) || 3000;
    const maxMileage = parseInt(document.getElementById('max-mileage').value) || Infinity;
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
    
    // Get Selected Makes (Multiple)
    const makeSelect = document.getElementById('make-select');
    const makeCheckboxes = document.querySelectorAll('input[name="make"]:checked');
    const selectedMakes = Array.from(makeCheckboxes).map(cb => cb.value);

    const colorCheckboxes = document.querySelectorAll('input[name="color"]:checked');
    const selectedColors = Array.from(colorCheckboxes).map(cb => cb.value);
    // Filter the array
    const filtered = usedCars.filter(car => {
        const matchesYear = car.year >= minYear && car.year <= maxYear;
        const matchesMileage = car.mileage <= maxMileage;
        const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
        const matchesMake = selectedMakes.length === 0 || selectedMakes.includes(car.make);
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(car.color);

        return matchesYear && matchesMileage && matchesPrice && matchesMake && matchesColor;
    });

    displayCars(filtered);
}

// Event Listeners
document.getElementById('apply-filters').addEventListener('click', filterCars);

document.getElementById('reset-filters').addEventListener('click', () => {
    document.getElementById('filter-form').reset();
    displayCars(usedCars); // Reset to show all
});

// Initial Load
window.onload = () => {
    displayCars(usedCars);
};