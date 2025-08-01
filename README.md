🛒 E-commerce Backend - Proyecto con Node.js, Express y MongoDB
📌 Descripción del Proyecto
Este proyecto es una aplicación backend de comercio electrónico desarrollada con Node.js, Express y MongoDB. Permite gestionar productos y carritos de compra mediante una API RESTful y una interfaz visual renderizada con Handlebars.
Incluye funcionalidades como:

- Paginación de productos
- Filtros por categoría, precio y stock
- Ordenamiento dinámico
- Vista con detalles de producto

✅ Requisitos

- Node.js v16 o superior
- MongoDB local o Atlas
- Dependencias principales: express, express-handlebars, mongoose, mongoose-paginate-v2, dotenv.

⚙️ Instalación y Configuración

1. Clonar el repositorio
   git clone https://github.com/PaulinaBarcosM/proyect-backend-Coder.git
   cd proyecto-backend-Coder
2. Instalar dependencias
   npm install
3. Configurar entorno
   Crear un archivo .env en la raíz del proyecto con las siguientes variables:
   env
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/ecommerce
   ⚠️ Si usás MongoDB Atlas, reemplazá MONGO_URI con tu conexión remota.

🚀 Ejecución del Proyecto
Ejecutar en modo desarrollo:
npm run dev
El servidor se iniciará en:
📍 http://localhost:8080

🧭 Rutas Principales
🖥️ Vistas Renderizadas
Lista de productos con paginación y filtros
http://localhost:8080/views/products/view

Detalle de producto individual
http://localhost:8080/views/products/details/:id

🔌 API REST
📦 Productos (/api/products)
Obtener todos los productos: GET /api/products

Obtener por ID: GET /api/products/:id

Crear nuevo producto: POST /api/products

Actualizar producto: PUT /api/products/:id

Eliminar producto: DELETE /api/products/:id

Subir imagen: POST /api/products/:id/upload (FormData → file)

Agregar productos de prueba: POST /api/products/seed

🛒 Carritos (/api/carts)
Crear carrito: POST /api/carts

Obtener por ID: GET /api/carts/:cid

Agregar producto al carrito: POST /api/carts/:cid/products/:pid

Actualizar cantidad de un producto: PUT /api/carts/:cid/products/:pid

Reemplazar productos: PUT /api/carts/:cid/products

Vaciar carrito: PUT /api/carts/:cid

Eliminar producto: DELETE /api/carts/:cid/products/:pid

Eliminar carrito: DELETE /api/carts/:cid

Agregar carritos de prueba: POST /api/carts/seed

🧪 Pruebas con Postman
Usá Postman para probar todos los endpoints de la API.
📌 Recordá enviar los datos en formato JSON y usar Content-Type: application/json cuando corresponda.

👤 Autor
Paulina Barcos Melchiori
Backend Developer | Proyecto Coderhouse 2025

Creamos tres entornos: desarrollo, producción y testeo(testing). Cada uno tiene su .env con puerto, url de mongo y clave secreta

npm run dev # modo desarrollo
npm start # producción
npm run test # test
