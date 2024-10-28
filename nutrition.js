// async function fetchNutrition() {
//     const foodItem = document.getElementById('foodInput').value;
//     const appId = 'ea7111b1';
//     const appKey = 'd8f3251c464706cb5d93d61f5ed441cf';
//     const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(foodItem)}`;

//     try {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error("Failed to fetch nutrition data");
//         const data = await response.json();

//         document.getElementById('nutritionResults').innerHTML = `
//             <h2>Nutrition Information for: ${foodItem}</h2>
//             <p>Calories: ${data.calories}</p>
//             <p>Protein: ${data.totalNutrients.PROCNT ? data.totalNutrients.PROCNT.quantity + ' ' + data.totalNutrients.PROCNT.unit : 'N/A'}</p>
//             <p>Carbs: ${data.totalNutrients.CHOCDF ? data.totalNutrients.CHOCDF.quantity + ' ' + data.totalNutrients.CHOCDF.unit : 'N/A'}</p>
//             <p>Fat: ${data.totalNutrients.FAT ? data.totalNutrients.FAT.quantity + ' ' + data.totalNutrients.FAT.unit : 'N/A'}</p>
//         `;
//     } catch (error) {
//         document.getElementById('nutritionResults').innerText = "Error fetching nutrition data.";
//     }
// }

document.getElementById('calculate-button').addEventListener('click', () => {
    const foodItems = document.getElementById('food-input').value;
    if (!foodItems) return;

    // Edamam API URL
    const appId = 'ea7111b1';
    const appKey = 'd8f3251c464706cb5d93d61f5ed441cf';
    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}`;

    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    const items = foodItems.split('\n');

    items.forEach(async (item) => {
        try {
            const response = await fetch(`${apiUrl}&ingr=${encodeURIComponent(item)}`);
            const data = await response.json();

            if (data.calories) {
                resultsContainer.innerHTML += `
                    <p><strong>${item}</strong> - ${data.calories} kcal</p>
                    <p>Protein: ${data.totalNutrients.PROCNT.quantity.toFixed(1)} g</p>
                    <p>Carbs: ${data.totalNutrients.CHOCDF.quantity.toFixed(1)} g</p>
                    <p>Fat: ${data.totalNutrients.FAT.quantity.toFixed(1)} g</p>
                    <hr>
                `;
            } else {
                resultsContainer.innerHTML += `<p>No data found for "${item}"</p><hr>`;
            }
        } catch (error) {
            resultsContainer.innerHTML += `<p>Failed to fetch data for "${item}".</p><hr>`;
        }
    });

    document.getElementById('results-container').style.display = 'block';
});

