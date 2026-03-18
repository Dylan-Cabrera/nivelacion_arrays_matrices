# Proyecto Práctico 3 (Parte 2): Backend Local Multi-red en ExpressJS

Esta carpeta es una evolución del Trabajo Práctico 3. Combina un entorno del lado del Servidor y una interfaz dinámica que prescinde del viejo `LocalStorage` del navegador, pasando a estar centralizada y accesible para los móviles de una red local.

## ¿Qué hace el código?
Esta aplicación permite recolectar los registros de distintos "Alumnos" por computadora y móvil (celulares, tablets). 
Cada dispositivo que se conecte, por ejemplo, usando el Wi-Fi de tu casa ingresando al puerto IP `http://10.254.199.137:3000`, observará **su propia lista separada** de alumnos y podrá agregar elementos usando el formulario. Es decir, los registros creados en la computadora son distintos a los del celular.

También automatizamos la tabla para que aparezcan los registros instantáneamente sin tener que apretar el botón "Traer Lista" (el cual se ocultó).

## ¿Cómo funciona bajo el capó?
La arquitectura es "Cliente-Servidor", separados en dos componentes:

**1. El Servidor NodeJS (`server.js`)**:
- Corre usando una librería llamada **Express**.
- Escucha todas las interacciones de tu computadora hacia el mundo externo mediante `app.listen(3000, '0.0.0.0')`. Al usar `0.0.0.0`, el servidor se expone a toda tu red LAN, no solamente a `localhost`.
- **Estructura de Datos Diferenciada**: Se creó una variable diccionaria / objeto global llamada `const alumnosPorIP = {};`. Cada vez que el servidor recibe una señal HTTP, extrae tu IP real (`req.ip`) y la utiliza como clave primaria. De esta manera, el Servidor guarda en la memoria RAM una estructura del estilo:
  ```json
  {
      "192.168.0.5": [{ "nombre": "Franco", "edad": "19" }],
      "10.254.199.137": [{ "nombre": "Ezequiel", "edad": "27" }]
  }
  ```
  Al no tener una base de datos real, los registros duran almacenados **mientras la ventana de Node (`node server.js`) siga abierta**.

**2. El Cliente Dinámico (`index.html`)**:
- El HTML no carga las cosas desde su propia memoria, sino que funciona como un espejismo que le ruega al servidor por la información mediante solicitudes `fetch('/alumnos')`, trayendo dinámicamente un archivo real JSON del Backend.
- Se capturó el formulario para usar una API nativa de JavaScript llamada `FormData`, el cual empaqueta los contenidos de los rectángulos de texto del input y los sube encubiertamente en JSON vía AJAX (POST). Al servidor comunicarle un "éxito" (`response.ok`), el cliente borra el texto del formulario de manera limpia y repinta todos los alumnos automáticamte, provocando la sensación de reactividad al instante.
