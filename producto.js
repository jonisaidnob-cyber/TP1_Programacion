//Carga en LocalStorage los productos de la tienda

const productos = [
    {
        id: 1,
        nombre: "Notebook Lenovo Ideapad Slim 3 ",
        precio: 889.999,
        imagen1: "assets/img/notebookLenovo1.jpg",
        imagen2: "assets/img/notebookLenovo2.jpg",
        imagen3: "assets/img/notebookLenovo3.jpg",
        descripcion: "Notebook Lenovo con 8gb de RAM, 128gb SSD, procesador Intel N100, Windows 11"
    },
    {
        id: 2,
        nombre: "Celular Samsung Galaxy A07",
        precio: 289.999,
        imagen1: "assets/img/celularSamsung1.jpg",
        imagen2: "assets/img/celularSamsung2.jpg",
        imagen3: "assets/img/celularSamsung3.jpg",
        descripcion: "Celular Samsung Galaxy A07, 4gb de RAM, 128gb ROM, Cámara Frontal 50MP + 2MP, Pantalla 6.7"
    },
    {
        id: 3,
        nombre: "Tablet Philco 10.1",
        precio: 179.999,
        imagen1: "assets/img/tabletPhilco1.jpg",
        imagen2: "assets/img/tabletPhilco2.jpg",
        imagen3: "assets/img/tabletPhilco3.jpg",
        descripcion: "Tablet Philco 10.1, 4gb RAM, 64gb ROM, con Funda y Soporte Negro TP10A464NS"
    }
];

localStorage.setItem("productos", JSON.stringify(productos));


//Muestra los productos en la página principal

const listaProductos = document.getElementById("listaProductos");

for(i = 0; i < 3; i++){
    const nuevaImagen = document.createElement("img");
    listaProductos.appendChild(nuevaImagen);
    nuevaImagen.src = productos[i].imagen1;
    nuevaImagen.classList.add("productoImagen");

    const nuevaDescripcion = document.createElement("p");
    listaProductos.appendChild(nuevaDescripcion);
    nuevaDescripcion.textContent = productos[i].descripcion;

    const nuevoPrecio = document.createElement("p");
    listaProductos.appendChild(nuevoPrecio);
    nuevoPrecio.textContent = "$" + productos[i].precio;
}
