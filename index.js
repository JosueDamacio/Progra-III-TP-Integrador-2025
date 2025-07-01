import express from "express";
import enviroments from "./src/api/config/enviroments.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import { productRoutes } from "./src/api/routes/index.js";


const PORT = enviroments.port;
const app = express();




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



app.listen(PORT, () => {
    console.log(`servidor activo en el puerto ${PORT}`);
})