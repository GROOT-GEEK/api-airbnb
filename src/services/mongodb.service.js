
const { MongoClient } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectarDB = async () => {
  await client.connect();
  let DB = client.db(process.env.DB_MONGODB)
  return DB;
}
/**
 * 
 * @param {*} nombreColeccion 
 * @returns coleccion a consultar, se hace apraevita rescribir el mismo codigo en los  metodos
 */
 const defColeccion = async (nombreColeccion) => {
  let db = await conectarDB();
  let coleccion = db.collection(nombreColeccion);
  return coleccion;
}

/**
 * @param {*} nombreColeccion 
 * @param {*} filtro 
 * @returns el numero de propiedades definidos en la variable DEFAULT_LIMIT_PROPERTIES 
 */
const consultarDocumentos = async (nombreColeccion, filtro) => {
  let db = await conectarDB()
  let coleccion = db.collection(nombreColeccion)
  filtro = filtro ? filtro : {}
  return coleccion.find(filtro).limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES)).toArray()
}

/**
 * 
 * @param {String} nombreColeccion 
 * @returns Documentos solo con tipo de propiedad
 * documentación mongo https://www.mongodb.com/docs/manual/reference/method/db.collection.distinct/
 */
 const consultar_tipo = async (nombreColeccion) => {
  let coleccion = await defColeccion(nombreColeccion);
  return coleccion.distinct("property_type");//metodo de mongo que Encuentra los distintos valores para un campo específico en una sola colección o vista y devuelve los resultados en una matriz.
}

module.exports = { consultarDocumentos,consultar_tipo }