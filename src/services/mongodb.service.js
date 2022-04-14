
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
 * @returns tipos de propiedad
 * Documentación mongo https://www.mongodb.com/docs/manual/reference/method/db.collection.distinct/
 */
 const consultar_tipo = async (nombreColeccion) => {
  let coleccion = await defColeccion(nombreColeccion);
  return coleccion.distinct("property_type");//metodo de mongo que Encuentra los distintos valores para un campo específico en una sola colección o vista y devuelve los resultados en una matriz.
}

/**
 * 
 * @param {*} nombreColeccion 
 * @returns 20 propiedades con mayor numero de reseñas
 * Documentación mongo: 
 * .find https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
 * .sort https://www.quackit.com/mongodb/tutorial/mongodb_sort_query_results.cfm#:~:text=In%20MongoDB%2C%20you%20can%20sort,the%20results%20should%20be%20sorted.
 */
const consultar_reseñas = async (nombreColeccion) => {
  let coleccion = await defColeccion(nombreColeccion);
  return coleccion.find().sort({ number_of_reviews: -1 }).project({ name: 1, beds: 1, number_of_reviews: 1, price: 1 })
  .limit(20).toArray();// se pone el limite para que muestre solo las 20 de mayores
}

module.exports = { consultarDocumentos,consultar_tipo,consultar_reseñas }