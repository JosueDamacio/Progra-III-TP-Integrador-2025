//controlar interaccion del usuario
import connection from "../database/db.js";
import Products from "../models/product.models.js";


//?modificar
//!GET ALL PRODUCTS///////
export const getAllProducts = async (req, res) => {

    try {

        const [rows] = await Products.selectAllProducts();
        
        // 2 optimizacion, responder con exito aunque este vacio
        // Aca devolvemos el texto plano JSON con toda la informacion de los productos
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron usuarios" : "Usuarios encontrados"
        });

    } catch (error) {
        console.error("Error obteniendo productos", error);
        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        })
    }
}

//!GET by ID/////////////////////
export const getProductById = async (req, res) => {
    try {
        let { id } = req.params;

        let sql  = `SELECT * FROM productos where id = ?`;

        let [rows] = await connection.query(sql, [id]);

        // Verificamos si se encontro el producto
        if(rows.length === 0) {
            return res.status(404).json({
                error: `No se encontro el producto con id: ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        })

    } catch(error) {
        console.error(`Error obteniendo producto con id ${id}`, error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto por id"
        });
    }
}

//!POST/////////////////////
export const createProduct = (async (req, res) => {

    try {

        // Recogemos y guardamos en variables los valores que recibimos del cliente
        let { nombre,precio,tipo,imagen,activo } = req.body;


        if (!nombre || !imagen || !precio || !tipo) {
            return res.status(400).json({
                message: "Datos inválidos. Asegurate de enviar nombre, precio, tipo e imagen"
            });
        }

        // Proteccion contra SQL injection, usamos placeholders ?
        let sql = `INSERT INTO productos (nombre, precio, tipo, imagen, activo) VALUES (?, ?, ?, ?, ?)`;
        let [rows] = await connection.query(sql, [nombre, precio, tipo, imagen, activo ?? true]);

        // Devolvemos informacion util del insert para devolver el ID del producto creado
        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });


    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
})

//?modificar
//!MODIFY PRODUCTO///////
export const modifyProduct = async (req, res) => {
    try {
        const { id, nombre, imagen, precio, tipo } = req.body;

        if(!id || !tipo || !imagen || !nombre || !precio) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }
        const [result] = await Products.updateProduct(nombre, imagen, precio, tipo, id);

        // Testearmos que se actualizara
        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            })
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.error("Error al actualizar el producto", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}

//!DELETE PRODUCTS/////////////////////
export const removeProduct = async (req, res) =>{
    try {
        let { id } = req.params;

        if(!id) {
            return res.status(400).json({
                message: "Se requiere un id para eliminar un producto"
            })
        }

        let sql = `DELETE FROM productos WHERE id = ?`;

        let [result] = await connection.query(sql, [id]);

        if(result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontro un producto con id ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });

    } catch (error) {
        console.error("Error en DELETE /productos/:id", error);

        res.status(500).json({
            message: `Error al eliminar producto con id ${id}`, error,
            error: error.message
        });
    }
}