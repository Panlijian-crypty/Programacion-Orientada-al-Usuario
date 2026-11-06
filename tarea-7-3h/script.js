let inventario = [
    { id: 1, nombre: "Gel limpiador de pepino", categoria: "Cuidado facial", cantidad: 14, precio: 5.25, agotado: false },
    { id: 2, nombre: "Mascarilla de arcilla rosa", categoria: "Cuidado facial", cantidad: 8, precio: 7.50, agotado: false },
    { id: 3, nombre: "Bruma facial de té verde", categoria: "Cuidado facial", cantidad: 0, precio: 6.75, agotado: true },
    { id: 4, nombre: "Bálsamo de cacao", categoria: "Maquillaje", cantidad: 20, precio: 3.25, agotado: false },
    { id: 5, nombre: "Rubor en crema durazno", categoria: "Maquillaje", cantidad: 6, precio: 8.90, agotado: false },
    { id: 6, nombre: "Brocha para polvos", categoria: "Accesorios", cantidad: 9, precio: 4.80, agotado: false },
    { id: 7, nombre: "Esponja de maquillaje", categoria: "Accesorios", cantidad: 16, precio: 2.50, agotado: false },
    { id: 8, nombre: "Diadema de microfibra", categoria: "Accesorios", cantidad: 5, precio: 3.75, agotado: false }
];

const formulario = document.getElementById("formulario-producto");
const filtroCategoria = document.getElementById("filtro-categoria");
const sugerenciasCategoria = document.getElementById("categorias-sugeridas");
const cuerpoInventario = document.getElementById("cuerpo-inventario");
const mensajeError = document.getElementById("mensaje-error");
const mensajeVacio = document.getElementById("mensaje-vacio");
const mensajeActividad = document.getElementById("mensaje-actividad");
const totalProductos = document.querySelector("#total-productos");
const totalUnidades = document.querySelector("#total-unidades");
const valorTotal = document.querySelector("#valor-total");
const totalAgotados = document.querySelector("#total-agotados");

const moneda = new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD" });

function crearGeneradorId() {
    let contador = 100;

    return function siguienteId() {
        contador += 1;
        return contador;
    };
}

function calcularValorTotal(items) {
    let total = 0;
    for (const item of items) {
        total += item.cantidad * item.precio;
    }
    return total;
}

function contarUnidades(items) {
    let total = 0;
    for (const item of items) {
        total += item.cantidad;
    }
    return total;
}

function contarPorCategoria(items) {
    const conteo = Object.create(null);
    for (const item of items) {
        conteo[item.categoria] = (conteo[item.categoria] ?? 0) + 1;
    }
    return conteo;
}

function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

function crearFila(item) {
    const fila = document.createElement("tr");
    fila.classList.toggle("fila-agotada", item.agotado);
    fila.appendChild(crearCelda(item.nombre));
    fila.appendChild(crearCelda(item.categoria));
    fila.appendChild(crearCelda(item.cantidad));
    fila.appendChild(crearCelda(moneda.format(item.precio)));
    fila.appendChild(crearCelda(moneda.format(item.cantidad * item.precio)));

    const celdaEstado = crearCelda("");
    const estado = document.createElement("span");
    estado.className = "estado";
    estado.textContent = item.agotado ? "Agotado" : "Disponible";
    celdaEstado.appendChild(estado);
    fila.appendChild(celdaEstado);

    const celdaAcciones = crearCelda("");
    const botonEstado = document.createElement("button");
    botonEstado.type = "button";
    botonEstado.className = "btn-estado";
    botonEstado.textContent = "Cambiar estado";
    botonEstado.setAttribute("data-id", item.id);
    botonEstado.setAttribute("aria-label", "Cambiar estado de " + item.nombre);
    celdaAcciones.appendChild(botonEstado);

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.className = "btn-eliminar";
    botonEliminar.textContent = "Eliminar";
    botonEliminar.setAttribute("data-id", item.id);
    botonEliminar.setAttribute("aria-label", "Eliminar " + item.nombre);
    celdaAcciones.appendChild(botonEliminar);
    fila.appendChild(celdaAcciones);
    return fila;
}

function renderizar(items) {
    cuerpoInventario.textContent = "";
    let agotados = 0;
    for (const item of items) {
        cuerpoInventario.appendChild(crearFila(item));
        if (item.agotado) {
            agotados += 1;
        }
    }

    // Los indicadores muestran únicamente los productos visibles con el filtro actual.
    totalProductos.textContent = items.length;
    totalUnidades.textContent = contarUnidades(items);
    valorTotal.textContent = moneda.format(calcularValorTotal(items));
    totalAgotados.textContent = agotados;
    mensajeVacio.hidden = items.length > 0;
}

function filtrarPorCategoria(categoria) {
    const productosFiltrados = [];
    for (const item of inventario) {
        if (item.categoria === categoria) {
            productosFiltrados.push(item);
        }
    }
    return productosFiltrados;
}

function renderizarVistaActual() {
    const items = filtroCategoria.selectedIndex === 0
        ? inventario
        : filtrarPorCategoria(filtroCategoria.value);
    renderizar(items);
}

function incorporarCategoria(categoria) {
    for (const opcion of sugerenciasCategoria.options) {
        if (opcion.value === categoria) {
            return;
        }
    }
    filtroCategoria.add(new Option(categoria, categoria));
    sugerenciasCategoria.appendChild(new Option(categoria, categoria));
}

function validarProducto(datos) {
    if (!datos.nombre) {
        throw new Error("Escribe el nombre del producto.");
    }
    if (!datos.categoria) {
        throw new Error("Escribe o selecciona una categoría.");
    }
    if (!Number.isInteger(datos.cantidad) || datos.cantidad <= 0) {
        throw new Error("La cantidad debe ser un número entero mayor que cero.");
    }
    if (!Number.isFinite(datos.precio) || datos.precio < 0) {
        throw new Error("El precio debe ser un número mayor o igual que cero.");
    }
}

function agregarProducto(event) {
    event.preventDefault();
    mensajeError.hidden = true;
    mensajeError.textContent = "";

    const campos = formulario.elements;
    const datos = {
        nombre: campos.namedItem("nombre").value.trim(),
        categoria: campos.namedItem("categoria").value.trim(),
        cantidad: campos.namedItem("cantidad").valueAsNumber,
        precio: campos.namedItem("precio").valueAsNumber
    };

    try {
        validarProducto(datos);

        const producto = { id: generarId(), ...datos, agotado: false };
        inventario.push(producto);
        incorporarCategoria(producto.categoria);
        renderizarVistaActual();
        formulario.reset();

        mensajeActividad.textContent = "Producto agregado: " + producto.nombre + ".";
        console.log("Alta · ID " + producto.id + " · " + producto.nombre);
    } catch (error) {
        mensajeError.textContent = error.message;
        mensajeError.hidden = false;
        console.error(error.message);
    }
}

function eliminarProducto(id) {
    const productosRestantes = [];
    for (const item of inventario) {
        if (item.id !== id) {
            productosRestantes.push(item);
        }
    }
    return productosRestantes;
}

function cambiarEstado(id) {
    for (const item of inventario) {
        if (item.id === id) {
            item.agotado = !item.agotado;
            return item;
        }
    }
}

function gestionarAccion(event) {
    const boton = event.target.closest("button[data-id]");
    if (!boton) {
        return;
    }

    const id = Number(boton.getAttribute("data-id"));
    if (boton.classList.contains("btn-estado")) {
        const producto = cambiarEstado(id);
        const estado = producto.agotado ? "Agotado" : "Disponible";
        mensajeActividad.textContent = producto.nombre + " · " + estado;
        console.log("Cambio de estado · ID " + id + " · " + estado);
    } else if (boton.classList.contains("btn-eliminar")) {
        const nombre = boton.closest("tr").cells[0].textContent;
        inventario = eliminarProducto(id);
        mensajeActividad.textContent = "Producto eliminado: " + nombre + ".";
        console.log("Baja · ID " + id + " · " + nombre);
    }
    renderizarVistaActual();
}

const generarId = crearGeneradorId();
renderizar(inventario);

const conteoInicial = contarPorCategoria(inventario);
for (const categoria of Object.keys(conteoInicial)) {
    incorporarCategoria(categoria);
}

formulario.addEventListener("submit", agregarProducto);
cuerpoInventario.addEventListener("click", gestionarAccion);
filtroCategoria.addEventListener("change", renderizarVistaActual);

console.log("Inventario inicial");
console.table([...inventario]);
console.log("Productos por categoría");
console.table(conteoInicial);
