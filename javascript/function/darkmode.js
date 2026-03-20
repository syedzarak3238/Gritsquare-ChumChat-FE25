function darkMode() {
    const darkmodeButton = document.querySelector('#darkmodeButton');
    const main = document.querySelector('#main');
    const sidenav = document.querySelector('#sidenav')
    const sidenava = document.querySelector('.sidenav')

    if (!darkmodeButton || !main) {
        console.error("Element saknas i DOM");
        return;
    }

    darkmodeButton.addEventListener('click', () => {
        main.classList.toggle("dark-mode");
        sidenav.classList.toggle('dark-modenav')
        sidenava.classList.toggle('dark-modeA')
    });
}

// Kör funktionen när skriptet laddas
darkMode();