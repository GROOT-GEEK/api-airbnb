const express = require('express')
const router = express.Router()

const airbnbCtr = require("../controllers/airbnb.controller")

const vs = "/api/v1"

router.get(vs + "/airbnb/all-properties", airbnbCtr.consultarAirbnb)
router.get(vs + "/airbnb/types", airbnbCtr.consultar_tipo_propiedades)
router.get(vs + "/airbnb/reviews", airbnbCtr.consultar_propiedades_Nreseñas)
router.get(vs + "/airbnb/beds/:nro_beds", airbnbCtr.consultar_nro_camas)

module.exports = router




