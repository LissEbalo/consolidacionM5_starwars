document.querySelectorAll('.rango').forEach(rango => {
    rango.addEventListener('mouseenter', function () {
        const range = this.getAttribute('data-range');
        const [start, end] = range.split('-').map(Number);
        obtenerPersonajes(this, start, end);
    });
});

async function obtenerPersonajes(section, start, end) {
    const container = section.parentElement;
    if (container.getAttribute("isLoading") == "true") {
        return;
    }
    //container.innerHTML = ''; // Limpiar personajes anteriores
    //container.appendChild(section);
    let characterNumber = container.getAttribute("characterNumber") || start;
    container.setAttribute("isLoading", true)
    for (let i = start; i <= end; i++) {
        if (characterNumber == i) {
            try {
                const response = await fetch(`https://swapi.dev/api/people/${i}/`);
                const personaje = await response.json();
                mostrarPersonaje(container, personaje);
                container.setAttribute("characterNumber", i + 1);
            } catch (error) {
                console.error('Error obteniendo personaje:', error);
            }
        }
    }
    container.setAttribute("isLoading", false)
}

function mostrarPersonaje(container, personaje) {
    const div = document.createElement('div');
    div.classList.add('personaje');

    div.innerHTML = `
        <h2>${personaje.name}</h2>
        <p><strong>Estatura:</strong> ${personaje.height} cm</p>
        <p><strong>Peso:</strong> ${personaje.mass} kg</p>
    `;

    container.appendChild(div);
}
