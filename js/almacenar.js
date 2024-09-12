// Carga los ítems desde el almacenamiento local
function cargaDatos() {
    const datos = JSON.parse(localStorage.getItem('items')) || [];
    return datos;
}

// Función para guardar los ítems en el almacenamiento local
function guardaDatos(datos) {
    localStorage.setItem('items', JSON.stringify(datos));
}

// Función para mostrar la lista de ítems en la vista
function mostrarDatos() {
    const itemList = document.getElementById('contenedor');
    const datos = cargaDatos();
    itemList.innerHTML = '';

    datos.forEach(dato => {
        const li = document.createElement('li');
        li.className = 'list-group-item'; // Clase Bootstrap para estilo de lista
        li.textContent = dato;
        itemList.appendChild(li);
    });
}

// Función para agregar un nuevo ítem a la lista
function agregarDatos() {
    const newItemInput = document.getElementById('item');
    const nuevoDato = newItemInput.value.trim();

    if (nuevoDato) {
        const datos = cargaDatos();
        datos.push(nuevoDato);
        guardaDatos(datos);
        mostrarDatos();
        newItemInput.value = ''; // Limpiar el campo de entrada
    }
}

// Función para limpiar la lista de ítems
function limpiarDatos() {
    localStorage.removeItem('items');
    mostrarDatos();
}

// Inicializar la vista y agregar los event listeners
function init() {
    mostrarDatos();

    document.getElementById('agregar').addEventListener('click', agregarDatos);
    document.getElementById('limpiar').addEventListener('click', limpiarDatos);

    // Opcional: también permitir añadir ítems con la tecla Enter
    document.getElementById('item').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarDatos();
        }
    });
}

// Ejecutar la inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', init);
