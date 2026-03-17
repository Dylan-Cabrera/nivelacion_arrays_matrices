document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registro-form');
    const btnLista = document.getElementById('btn-traer-lista');
    const tablaAlumnos = document.getElementById('lista-alumnos');
    const tablaBody = document.getElementById('tabla-body');

    // Manejar el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const alumno = {
            nombre: document.getElementById('nombre').value,
            edad: document.getElementById('edad').value,
            nota: document.getElementById('nota').value
        };

        guardarAlumno(alumno);
        form.reset();
        alert('Alumno guardado correctamente en LocalStorage');
    });

    // Manejar el click del botón "Traer Lista"
    btnLista.addEventListener('click', () => {
        mostrarLista();
    });

    function guardarAlumno(alumno) {
        // Obtener la lista actual de alumnos (o una lista vacía si no existe)
        const alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
        
        // Agregar el nuevo alumno
        alumnos.push(alumno);
        
        // Guardar la lista actualizada de nuevo en LocalStorage
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
    }

    function mostrarLista() {
        // Obtener alumnos de LocalStorage
        const alumnos = JSON.parse(localStorage.getItem('alumnos') || '[]');
        
        // Limpiar el cuerpo de la tabla
        tablaBody.innerHTML = '';

        if (alumnos.length === 0) {
            alert('No hay alumnos registrados.');
            return;
        }

        // Cargar datos en la tabla
        alumnos.forEach(alumno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${alumno.nombre}</td>
                <td>${alumno.edad}</td>
                <td>${alumno.nota}</td>
            `;
            tablaBody.appendChild(row);
        });

        // Mostrar la tabla
        tablaAlumnos.style.display = 'table';
    }
});
