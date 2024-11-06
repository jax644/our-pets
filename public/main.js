document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents page reload

        const name = document.getElementById('name-input').value.trim();

        // Clear previous results
        resultDiv.innerHTML = '';

        // Only proceed if there's a name to search
        if (name) {
            fetch(`/api/pets/${name}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Pet not found");
                    }
                    return response.json();
                })
                .then(pet => {
                    // Display the result in the DOM
                    resultDiv.innerHTML = `
                        <p><strong>Name:</strong> ${pet.name}</p>
                        <p><strong>Species:</strong> ${pet.species}</p>
                        <p><strong>Human(s):</strong> ${pet["human(s)"]}</p>
                        <img src='${pet.image}'>
                    `;
                })
                .catch(error => {
                    resultDiv.innerHTML = `<p>Sorry, no pet found by that name.</p>`;
                });
        } else {
            resultDiv.innerHTML = `<p>Please enter a name.</p>`;
        }
    });
});
