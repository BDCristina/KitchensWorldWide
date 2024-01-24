//functionality for loading the content of a navigation menu (navbar) from an external HTML file and displaying it in a specific container on the page.
fetch('../html_files/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbarContainer').innerHTML = data;
    })
    .catch(error => console.error(error));
    