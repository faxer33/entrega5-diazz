const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de Manillar
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Configuración de directorios estáticos (por ejemplo, para archivos CSS o JS)
app.use(express.static('public'));

// ...

// Inicializar socket.io
io.on('connection', (socket) => {
    console.log('Cliente conectado');
    // Manejar eventos de socket aquí
});

// ...

// Configurar rutas
app.get('/', (req, res) => {
    // Renderizar la vista home.handlebars
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    // Renderizar la vista realTimeProducts.handlebars
    res.render('realTimeProducts');
});

// ...

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Emitir la lista de productos al cliente al conectar
    socket.emit('updateProductList', getAllProducts());

    // Manejar evento para agregar un producto
    socket.on('addProduct', (newProduct) => {
        // Lógica para agregar el producto a la lista
        // ...

        // Emitir la lista actualizada a todos los clientes
        io.emit('updateProductList', getAllProducts());
    });

    // Manejar evento para eliminar un producto
    socket.on('deleteProduct', (productId) => {
        // Lógica para eliminar el producto de la lista
        // ...

        // Emitir la lista actualizada a todos los clientes
        io.emit('updateProductList', getAllProducts());
    });

    // Manejar eventos adicionales si es necesario
});

// Función para obtener la lista actualizada de productos (puedes adaptarla según tu implementación)
function getAllProducts() {
    // Lógica para obtener la lista de productos
    // ...
    return productList;
}
// ...

// Manejar eventos de socket
socket.on('updateProductList', (updatedProductList) => {
    // Actualizar la lista de productos en la vista
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = ''; // Limpiar la lista antes de actualizar
    updatedProductList.forEach((product) => {
        const listItem = document.createElement('li');
        listItem.textContent = product.name;
        productListElement.appendChild(listItem);
    });
});

// ...
