// functia pt ancora buton recipes
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

var exploreButton = document.querySelector('.btn-primary-bt');
exploreButton.addEventListener('click', function () {
    if (selectedCuisine) {
        console.log('Selected Cuisine:', selectedCuisine);

        // Construiește URL-ul utilizând o cale absolută către html_files
        var cuisineUrl = '/cuisines/' + selectedCuisine.toLowerCase().replace(' ', '_') + '.html';

        // Navighează la URL
        window.location.href = cuisineUrl;
    } else {
        console.log('Select a cuisine first!');
    }
});
