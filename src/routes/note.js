'use strict'

var express = require('express');

var Note = require('../controllers/note');

//Llamamos al objeto router de express:
var router = express.Router();

//Rutas para artículos***********************************************************************************

//Guardar un nuevo artículo.
router.post('/save', Note.save);

//Obtener todos las notas.
router.get('/notes', Note.getNotes);

//Eliminar un artículo. Le pasamos el parámetro :id como obligatorio.
router.delete('/delete/:id', Note.delete);

//Actualizar una nota. Le pasamos el parámetro :id como obligatorio.:
router.put('/update/:id', Note.update);

module.exports = router;