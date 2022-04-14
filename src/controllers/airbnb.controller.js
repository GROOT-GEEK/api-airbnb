
// Importar los servicios
const { consultarDocumentos,consultar_tipo,consultar_reseñas,consultar_camas} = require('../services/mongodb.service');

/**
 * metodo ya funcional de consultar el numero de propiedades en la variable global
 * DEFAULT_LIMIT_PROPERTIES
 */
const consultarAirbnb = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Airbnb consultados"
        let resultado = await consultarDocumentos(process.env.COLLECTION_AIRBNB)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando los airbnb."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

/**
 * Readme 1-consulta tipo de propiedades
 */
 const consultar_tipo_propiedades= async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "listado tipo de propiedades consultado"
        let resultado = await consultar_tipo(process.env.COLLECTION_AIRBNB)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando los tipos de propiedades de airbnb."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

/**
 * Readme 2-consulta 20 propiedades con mayor numero de reseñas
 */
 const consultar_propiedades_Nreseñas= async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "20 propiedades con mas reseñas"
        let resultado = await consultar_reseñas(process.env.COLLECTION_AIRBNB)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando las propiedades con mas reseñas de airbnb."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

/**
 * Readme 3-consulta numero de camas de cada propiedad.
 */
 const consultar_nro_camas= async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "mayor numero de camas de las propiedades"
        let nro_camas = req.params["nro_beds"];
        let resultado = await consultar_camas(process.env.COLLECTION_AIRBNB,nro_camas)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando el numero de camas de las propiedades de airbnb."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

/**
 * exportar modulos usados en los routers
 */
module.exports = {
    consultarAirbnb,consultar_tipo_propiedades,consultar_propiedades_Nreseñas,consultar_nro_camas
}