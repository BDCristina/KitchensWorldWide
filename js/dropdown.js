document.addEventListener('DOMContentLoaded', function () {
    var dropdownToggle = document.getElementById('cuisineDropdownBtn');
    var dropdownMenu = document.querySelector('.dropdown-menu');

    var cuisineItems = document.querySelectorAll('.dropdown-item');
    var selectedCuisine = null;

    cuisineItems.forEach(function (item) {
        item.addEventListener('click', function () {
            selectedCuisine = item.textContent.trim();
            dropdownToggle.textContent = selectedCuisine;
            dropdownMenu.classList.remove('show'); // Închide dropdown-ul după selectare
        });
    });

    dropdownToggle.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
        if (!dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    var exploreButton = document.querySelector('.btn-primary-bt');
    exploreButton.addEventListener('click', function () {
        if (selectedCuisine) {
            var cuisineUrl = selectedCuisine.toLowerCase().replace(' ', '_') + '.html';
            window.location.href = cuisineUrl;
        } else {
            console.log('Select a cuisine first!');
        }
    });
});
