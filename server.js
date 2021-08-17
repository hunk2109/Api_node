const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT ||3000;
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

//firebase ini

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
//multer
const upload = multer({
    storage: multer.memoryStorage()
})

//Rutas

const users = require('./routes/userRoutess');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
app.use(cors());
app.disable('x-powered-by');
app.set('port',port);
/*
* Llmar Rutas
*/
users(app,upload)




server.listen(3000,'192.168.2.9'||'localhost',function(){
    console.log('Aplicacion node '+port+' init')
});

app.get('/',(req,res) =>{
    res.send('Delibery app')
});

// Error Handler
app.use((err,req,res,next)=>{
console.log(err);
res.status(err.status||500).send(err.status);
});


module.exports={
    app: app,
    server:server
}