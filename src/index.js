'use strict'

const express = require('express');
const path = require('path');
/*
body-parser es un paquete de NPM que analiza los cuerpos de las solicitudes entrantes en un middleware 
antes que sus controladores, disponible en la propiedad req.body. 
 */
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


//Archivos estáticos:
app.use(express.static(path.join(__dirname, 'public')));


//**** Mongoose *******************************************************************:

var mongoose = require('mongoose');
//Dirección a la base de datos local:
//const urlLocal = 'mongodb://localhost:27017/api_rest_notas2022';
//Url a mongoDB Atlas:
const url = "mongodb+srv://usuarioReact:usuarioReact12345@database-prueba.nykx7ou.mongodb.net/"
//Configuración para evitar fallos en la conexión con mongoDB
mongoose.Promise = global.Promise;

//**** Ficheros ruta **************************************************************:

var noteRoutes = require('./routes/note');

//**** Middlewares ****************************************************************:

/*
El middleware es el software que brinda servicios y funciones comunes a las aplicaciones.
Generalmente, se encarga de la gestión de los datos, los servicios de aplicaciones, la mensajería, la autenticación y 
la gestión de las API.
*/

//Cargamos el bodyParser: middleware para analizar cuerpos de a través de la URL
//Este analizador acepta solo la codificación UTF-8 contenida en el body
app.use(bodyParser.urlencoded({ extended: false }));

//Cualquier tipo de petición lo convertimos a json:
app.use(bodyParser.json());

//Activar el CORS para permitir peticiones AJAX y HTTP desde el frontend.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Cargamos los archivos de ruta
app.use('/api', noteRoutes);

//Nos conectamos a mongoDB. Opción { useNewUrlParser: true } para utilizar las últimas funcionalidades de mongoDB
mongoose.connect(url, { useNewUrlParser: true }).then(() =>{

	console.log('Conexión con la BDD realizada con éxito!!!');

	app.listen(port, () =>{
		console.log('servidor ejecutándose en http://localhost:' + port );
	});

});
