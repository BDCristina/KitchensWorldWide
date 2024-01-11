fetch('italian_recipes.json')
          .then(response => response.json())
          .then(data => {
            let section1HTML = '';
            let section2HTML = '';
            // Alte variabile pentru alte secțiuni similare

            let counter = 0;
            data.forEach(cuisine => {
              const cuisineHTML = `
                <div class="col-md-4">
                  <div class="cuisine">
                    <img src="${cuisine.image}" alt="${cuisine.name} Image" style="width: 100%; height: auto;">
                    <h3>${cuisine.name}</h3>
                    <p>${cuisine.description}</p>
                    <p>${cuisine.preparation_time}</p>
                  </div>
                </div>
              `;

              if (counter < 3) {
                section1HTML += cuisineHTML;
              } else if (counter < 6) {
                section2HTML += cuisineHTML;
              }
              // Alte condiții pentru alte secțiuni similare

              counter++;
            });

            document.getElementById('section1').innerHTML = section1HTML;
            document.getElementById('section2').innerHTML = section2HTML;
            // Alte secțiuni similare pot fi actualizate aici
          })
          .catch(error => console.error(error));


const pageTitle = "Italian Cuisine"; // Titlul paginii sau numele căutat
fetch('cuisines.json')
    .then(response => response.json())
    .then(data => {
        // Filtrăm datele pentru a obține doar elementele cu numele egal cu titlul paginii
        const filteredCuisines = data.filter(cuisine => cuisine.name === pageTitle);

        if (filteredCuisines.length > 0) {
            // Setează numele bucătăriei în elementul HTML cu id-ul 'cuisine-name'
            document.getElementById('cuisine-name').textContent = filteredCuisines[0].name;

            // Setează descrierea bucătăriei în elementul HTML cu id-ul 'cuisine-description'
            document.getElementById('cuisine-description').textContent = filteredCuisines[0].description;
        } else {
            console.log("Nu s-au găsit date pentru această bucătărie.");
        }
    })
    .catch(error => console.error(error));
          