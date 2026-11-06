# Programación Orientada al Usuario

Trabajos de Pan Lijian Wong para la asignatura de Programación Orientada al Usuario en la UCA, ciclo 02/2026.

## Actividades

| Actividad | Qué incluye | Archivo para empezar |
| --- | --- | --- |
| [Ejercicios de HTML](./ejercicios-html/) | Cuatro páginas con títulos, formato de texto y listas. | [Primer ejercicio](./ejercicios-html/ejercicio_01.html) |
| [CSS básico](./actividad-css-basico/) | Artículo con formato IEEE a una columna sobre el control de cambios con Git, con una hoja de estilos externa y evidencia de la prueba local. | [Artículo](./actividad-css-basico/index.html) |
| [About Me](./About-me/) | Sitio personal con tres páginas sobre el perfil, los estudios y los intereses del autor. | [Página principal](./About-me/index.html) |
| [Tabla de multiplicar](./ejercicios-javascript/) | Script que genera un arreglo con los productos del 1 al 10 mediante un bucle `for` y `push()`. | [tabla-multiplicar.js](./ejercicios-javascript/tabla-multiplicar.js) |
| [Control de inventario · Módulo 7](./tarea-7-3h/) | Aplicación que permite agregar y eliminar productos, cambiar su estado, filtrar por categoría y consultar totales. | [Inventario](./tarea-7-3h/index.html) |

## Cómo ejecutar los trabajos

Descarga el repositorio con **Code → Download ZIP** y descomprímelo. Si usas Git, también puedes clonarlo.

```bash
git clone https://github.com/Panlijian-crypty/Programacion-Orientada-al-Usuario.git
cd Programacion-Orientada-al-Usuario
```

**Páginas web.** Abre el archivo HTML de la actividad en tu navegador. Mantén cada carpeta completa para que carguen sus estilos, scripts e imágenes. Los reproductores de About Me requieren conexión a Internet.

**Tabla de multiplicar.** Con Node.js instalado, ejecuta este comando desde la raíz del repositorio.

```bash
node ejercicios-javascript/tabla-multiplicar.js
```

Con `numero = 1`, la consola muestra `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`. Puedes cambiar `numero` en el script para generar otra tabla.

## Ejercicios de HTML

| Ejercicio | Contenido |
| --- | --- |
| [01](./ejercicios-html/ejercicio_01.html) | Títulos, listas, negrita y cursiva. |
| [02](./ejercicios-html/ejercicio_02.html) | Definición del sonido con texto destacado. |
| [03](./ejercicios-html/ejercicio_03.html) | Receta de cheesecake con ingredientes, equipo e instrucciones. |
| [04](./ejercicios-html/ejercicio_04.html) | Departamentos de El Salvador organizados en listas anidadas. |

## Control de inventario · Módulo 7

Abre [`tarea-7-3h/index.html`](./tarea-7-3h/index.html) en el navegador. El inventario empieza con ocho productos de cuidado personal repartidos en tres categorías.

1. Para probar el alta, agrega **Tinta labial de cereza** en la categoría **Maquillaje**, con **11** unidades y un precio unitario de **$6.40**.
2. Selecciona **Maquillaje** en el filtro. El resumen se recalcula según los productos que aparecen en la tabla.
3. Usa **Cambiar estado** o **Eliminar** en una fila. En la consola del navegador puedes ver el inventario inicial, el conteo por categoría y el registro de cada operación.

Los cambios se mantienen mientras la página está abierta. Al recargar, se vuelve a cargar el inventario inicial.

### Capturas

| Captura | Qué muestra |
| --- | --- |
| [01 · Inventario inicial](./tarea-7-3h/capturas/captura-01-inventario.png) | Los ocho productos y los totales iniciales. |
| [02 · Alta de producto](./tarea-7-3h/capturas/captura-02-alta-producto.png) | La fila nueva y los indicadores actualizados. |
| [03 · Filtro por categoría](./tarea-7-3h/capturas/captura-03-filtro.png) | Los productos de Maquillaje y su resumen. |
| [04 · Consola del navegador](./tarea-7-3h/capturas/captura-04-consola.png) | El inventario inicial, el conteo por categoría y el registro de un alta, cambios de estado y una baja. |
