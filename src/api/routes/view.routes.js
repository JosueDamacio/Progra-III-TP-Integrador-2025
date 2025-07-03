import { Router } from "express";
import { vistaConsultar, vistaCrear, vistaEliminar, vistaIndex, vistaModificar } from "../controllers/view.controller.js";



const router = Router();

// Ruta de las vistas EJS
router.get("/", vistaIndex);

router.get("/consultar", vistaConsultar);

router.get("/crear", vistaCrear);

router.get("/modificar", vistaModificar);

router.get("/eliminar", vistaEliminar);


// Exportar las rutas de las vistas
export default router;