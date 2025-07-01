

// Modelo Producto //

import connection from "../database/db.js"; // Importamos la conexion a la BBDD


// Seleccionar todos los productos //
const selectAllProducts = async() => {
    let sql = `SELECT * FROM productos`;
    
    // Al usar [rows] la desestructuracion extrae directamente las filas (que es el primer elemento del resultado de la consulta), nos sirve porque hace el codigo mas legible y explicito
    return await connection.query(sql);
}


// Seleccionar producto por su id //
const selectProductFromId = async (id) => {
    // Consulta no optima, porque permite la inyeccion SQL
    let sql = `SELECT * FROM productos where id = ?`;

    return await connection.query(sql, [id]);
}


//Crear nuevo producto
const insertNewProduct = async (tipo, imagen, nombre, precio) => {
    let sql = `INSERT INTO productos (tipo, imagen, nombre, precio) VALUES (?, ?, ?, ?)`;

    return await connection.query(sql, [tipo, imagen, nombre, precio]);
}


//Actualizar producto
const updateProduct = async (nombre, imagen, precio, tipo, id) => {
    let sql = `
            UPDATE productos
            SET nombre = ?, imagen = ?, precio = ?, tipo = ?
            WHERE id = ?
        `;

    return await connection.query(sql, [nombre, imagen, precio, tipo, id]);
}


// Eliminar producto //
const deleteProduct = async (id) => {
    let sql = "DELETE FROM productos WHERE id = ?";

    return await connection.query(sql, [id]);
}


export default {
    selectAllProducts,
    selectProductFromId,
    insertNewProduct,
    updateProduct,
    deleteProduct
}