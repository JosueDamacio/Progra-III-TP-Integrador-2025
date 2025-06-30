import express from "express";
import enviroments from "../config/enviroments.js";
import connection from "../database/db.js";
import cors from "cors";

const app = express();
const PORT = enviroments.port; 

app.use(express.json()); 

app.use(cors()); 

app.use((req, res, next) => {
    // console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`); En caso de no registrar la zona horaria usaremos
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});


const validateId = (req, res, next) => {
    const id = req.params.id; 

    // En caso de no existir id o de que este no sea un numero
    if(!id || isNaN(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero"
        })
    }

    
    req.id = parseInt(id, 10);

    next();
}

app.get("/",(req,res)=>{
    res.send("hola mundo");
})

app.listen(PORT,()=>{
    console.log("servidor corriendo");
})

app.get("/products",(async(req,res) => {

    try {
        let sql = 'SELECT * from productos';
    let [rows]= await connection.query(sql);
    res.status(200).json({
        payload: rows
    });
    console.log(rows);
    } catch (error) {
        console.error("Error",error);
        res.status(500);
    }
    
}))

app.post("/productos", async (req, res) => {

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
});

app.get("/products/:id", validateId ,async (req, res) => {
    try {
        // let id = req.params.id
        let { id } = req.params;

        // let sql = `SELECT * FROM products where id = ${id}`; // Consulta no optimizada porque permite inyeccion SQL
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
});