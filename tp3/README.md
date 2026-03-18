# Proyecto Práctico 3 (TP3): Frontend, formularios y LocalStorage

Este directorio contiene una versión "Frontend puro" que funciona sin necesidad de tener un servidor "verdadero" (`index.html` y `script.js`). Acá los datos se guardan estrictamente dentro del navegador del usuario.

## ¿Qué hace el código?
El proyecto muestra una página con un formulario para registrar **Alumnos** (Nombre, Edad y Nota). En lugar de perder la información al recargar la página o de necesitar una instalación de base de datos, el formulario persiste localmente.
Cuenta con un botón "Traer Lista de Alumnos" que imprime una tabla con todos los registros previos.

## ¿Cómo funciona bajo el capó?
1. **Event Listeners (`DOMContentLoaded` y `submit`)**: Todo el código de JS (`script.js`) comienza una vez que la página HTML se carga completamente. Usamos `form.addEventListener('submit', (e) => e.preventDefault())` para desactivar el comportamiento por defecto (que recargaría la página) cuando se intenta enviar el formulario.
2. **Caché del Navegador (`localStorage`)**: El almacenamiento de datos depende íntegramente de la API Web `LocalStorage`, que preserva los datos incluso cerrando Chrome.
3. **Serialización (JSON)**: Como `LocalStorage` solo permite almacenar texto puro de tipo `string`, el script utiliza en todo momento la función `JSON.stringify(alumnos)` para convertir el Array antes de guardarlo. Cuando llamamos la función `mostrarLista()`, usamos `JSON.parse` para rearmar esa cadena de texto y que vuelva a comportarse como un Array sobre el que se puede iterar (`.forEach`).
4. **Renderización del DOM (`innerHTML`)**: Por cada registro almacenado, creamos programáticamente etiquetas de celda de tabla (`<tr> <td>...`) usando backticks, que luego añadimos al `tbody` de la vista (`tablaBody.appendChild(row)`).
