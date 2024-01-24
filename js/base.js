//functionality for managing data from json files about cuisines and recipes and  displaying them on the page

class Cuisine {
  constructor(data) {
    this.data = data;
  }

  getName() {
    return this.data.name;
  }

  getDescription() {
    return this.data.description;
  }

  getImage() {
    return this.data.image;
  }
  
}

class Recipe {
  constructor(data) {
    this.data = data;
  }

  getName() {
    return this.data.name;
  }

  getDescription() {
    return this.data.description;
  }

  getPreparationTime() {
    return this.data.preparation_time;
  }

  getImage() {
    return this.data.image;
  }
  getCuisineName() {
    return this.data.cuisine_name;
  }
}

class UIManager {
  updateCuisineInfo(cuisine) {
    document.getElementById('cuisine-name').textContent = cuisine.getName();
    document.getElementById('cuisine-description').textContent = cuisine.getDescription();
  }

  updateCuisineSections(sectionId, sectionHTML) {
    document.getElementById(sectionId).innerHTML = sectionHTML;
  }
}

class DataHandler {
  constructor(cuisinesFile, recipeFile) {
    this.cuisinesFile = cuisinesFile;
    this.recipeFile = recipeFile;
    this.data = {};
  }  

  
  fetchData(cuisineName) {
    if (!this.data[cuisineName]) {
      // Dacă datele pentru bucătărie nu există deja, fetch them
      return fetch(this.cuisinesFile)
        .then(response => response.json())
        .then(cuisinesData => {
          this.data[cuisineName] = {
            cuisines: cuisinesData.map(cuisineData => new Cuisine(cuisineData)),
            recipes: [],
          };
        })
        .then(() => fetch(this.recipeFile))
        .then(response => response.json())
        .then(recipeData => {
          this.data[cuisineName].recipes = recipeData.map(recipeData => new Recipe(recipeData));
        })
        .catch(error => console.error(`Error fetching data for ${cuisineName}:`, error));
    } else {
      // Dacă datele pentru bucătărie există deja, returnează o promisiune rezolvată
      return Promise.resolve();
    }
  }
}


function displayCuisineData(uiManager, dataHandler, cuisineName) {
  console.log(`Displaying data for ${cuisineName}`);
  dataHandler.fetchData(cuisineName).then(() => {
    // Loghează datele pentru debugging
    console.log("Cuisines:", dataHandler.data[cuisineName].cuisines);
    console.log("Recipes:", dataHandler.data[cuisineName].recipes);

    const selectedCuisine = dataHandler.data[cuisineName].cuisines.find(cuisine => cuisine.getName() === cuisineName);

    if (!selectedCuisine) {
      console.error(`Cuisine "${cuisineName}" not found.`);
      return;
    }

    console.log("Selected Cuisine:", selectedCuisine);

    const sectionHTML = dataHandler.data[cuisineName].recipes
      .filter(recipe => recipe.getCuisineName() === cuisineName)
      .map((recipe, index) => `
        <div class="col-md-4 mb-4">
          <div class="recipe">
            <h3>${recipe.getName()}</h3>
            <img src="${recipe.getImage()}" alt="${recipe.getName()} Image" class="img-fluid">
            <p>${recipe.getDescription()}</p>
            <p>${recipe.getPreparationTime()}</p>
            <!-- Alte informații despre rețetă -->
          </div>
        </div>
      `)
      .join('');

    console.log("Section HTML:", sectionHTML);

    uiManager.updateCuisineInfo(selectedCuisine);
    uiManager.updateCuisineSections('section1', sectionHTML);
  }).catch(error => console.error("Error processing data:", error));
}