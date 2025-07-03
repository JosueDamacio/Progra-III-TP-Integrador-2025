import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";


const PORT = enviroments.port;
const app = express();



// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs");

// Le indicamos a la aplicacion desde que ruta va a servir vistas desde raizProyecto/src/views
app.set("views", join(__dirname, "src/views"));

// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public")));


// Middlewares //

// Middlewares de aplicacion -> Aplicados a nivel de aplicacion para todas las solicitudes
app.use(express.json()); // Parseamos JSON en las solicitudes POST y PUT 
app.use(cors()); // Middleware CORS basico que permite todas las solicitudes
app.use(loggerUrl);



// Rutas //
app.get("/", (req, res) => {
    res.send("Funcionando");
});

// Productos
app.use("/api/productos", productRoutes);

// Rutas de las vistas EJS
app.use("/dashboard", viewRoutes);

app.listen(PORT, () => {
    console.log(`servidor activo en el puerto ${PORT}`);
})