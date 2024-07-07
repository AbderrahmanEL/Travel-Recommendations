document.addEventListener('DOMContentLoaded', () => {
    // Fetch the data from JSON file on page load
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            window.travelData = data;
            console.log("Data fetched successfully", data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Function to perform search based on keywords
function search() {
    const query = document.getElementById('search').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (window.travelData) {
        const results = [];

        // Check for matching beaches
        results.push(...window.travelData.beaches.filter(beach => 
            beach.name.toLowerCase().includes(query)
        ));

        // Check for matching temples
        results.push(...window.travelData.temples.filter(temple => 
            temple.name.toLowerCase().includes(query)
        ));

        // Check for matching cities within countries
        window.travelData.countries.forEach(country => {
            results.push(...country.cities.filter(city => 
                city.name.toLowerCase().includes(query)
            ));
        });

        if (results.length > 0) {
            results.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                resultDiv.innerHTML = `
                    <h3>${result.name}</h3>
                    <img src="${result.imageUrl}" alt="${result.name}">
                    <p>${result.description}</p>
                `;
                resultsContainer.appendChild(resultDiv);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    } else {
        resultsContainer.innerHTML = '<p>Data not available. Please try again later.</p>';
    }
}

// Function to reset search results
function reset() {
    document.getElementById('search').value = '';
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
}
