function toggleTheme() {
     const html = document.documentElement;

    // Icons on the button
    const darkModeToggle = document.getElementById("moon-icon");
    const lightModeToggle = document.getElementById("sun-icon");

    // Saves theme
    if (html.classList.contains("dark")) {
        // switches to light mode
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");

        darkModeToggle.classList.remove("hidden");
        lightModeToggle.classList.add("hidden");
    } else {
        // switches to dark mode
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");

        lightModeToggle.classList.remove("hidden");
        darkModeToggle.classList.add("hidden");
    }
}

// Initialises theme from local storage
function loadTheme() {
    const html = document.documentElement;

    // Icons on the button
    const darkModeToggle = document.getElementById("moon-icon");
    const lightModeToggle = document.getElementById("sun-icon");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        html.classList.add("dark");

        darkModeToggle.classList.add("hidden");
        lightModeToggle.classList.remove("hidden");
    } else {
        html.classList.remove("dark");

        lightModeToggle.classList.add("hidden");
        darkModeToggle.classList.remove("hidden");
    } 
}

// Runs on page load
window.addEventListener("DOMContentLoaded", loadTheme);

