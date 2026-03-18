# Proyecto Práctico 2 (TP2): Matrices y Arreglos en Python

Este directorio contiene un cuaderno intermedio de Python (`matrices.ipynb`) dedicado a la recolección, manipulación y ordenamiento de datos utilizando listas y arreglos multidimensionales (matrices).

## ¿Qué hace el código?
El script permite ingresar los datos de múltiples personas interactivamente desde la consola. Por cada persona, el programa solicita:
- **Nombre**
- **Edad**
- **Nota**

Primero, muestra la lista entera de registros a medida que fueron ingresados. Luego, reordena todos los datos dando prioridad a **las mejores calificaciones** de mayor a menor y, finalmente, calcula el **promedio general** de las notas de todos los alumnos ingresados.

## ¿Cómo funciona bajo el capó?
1. **Loop Interactivo (`while True`)**: Utiliza `input()` para permitir que el usuario ingrese tantos registros como quiera. El loop finaliza ("break") cuando el usuario responde `"n"` al prompt para repetir.
2. **Matrices (Listas Anidadas)**: Guarda los datos temporales del usuario como una lista simple: `[nombre, edad, nota]`. Luego hace `.append()` de esa persona adentro de otra lista gigante llamada `personas` (nuestra "matriz" o lista de listas).
3. **Ordenamiento Dinámico**: Usando el método nativo `personas.sort(reverse=True, key=lambda p: p[2])`, la matriz principal se ordena tomando exclusivamente el índice `2` de la lista interna (donde se ubica la 'nota'), garantizando que el arreglo principal se ordene por promedios más altos.
4. **Acumulación (Suma)**: Utiliza una variable sumatoria `total_notas` que acumula valores en cada iteración y usa una variable contadora `i` para dividir al final y obtener el promedio.
