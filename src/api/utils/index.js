/////////////////////////////////////////////////////////////
// Logica para trabajar con archivos y rutas del proyecto //

// Convierte una URL de archivo (file:\) a una ruta de un sistema de archivos
import { fileURLToPath } from "url";

// Dirname devuelve el directorio padre de una ruta
// Join une partes de rutas
import { dirname, join } from "path";


const __filename = fileURLToPath(import.meta.url);
// import.meta.url: Proporciona la URL absoluta del modulo actual (file:///ruta/al/archivo.js)
// fileURLTOPath: Convierte esa URL a una ruta de sistema (/ruta/al/archivo.js)

const __dirname = join(dirname(__filename), "../../../");
// dirname(__filename): Obtener el directorio del archivo actual
// join(..., "../../../"): Retrocede tres niveles en la estructura de directorios utils->api->src->tpIntegradorBack

export {
    __dirname,
    join
}