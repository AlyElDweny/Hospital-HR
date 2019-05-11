const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const joi = require('joi');

const app = express();

app.use(cors())

const db = config.get('mongoURI');
// 'mongodb://localhost/HR-hospital'

mongoose.connect( db , {useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err))

const logger = require('./middleWareFuncs/logger');

const departments = require('./routers/departments');
const affairs = require('./routers/affairs');
const services = require('./routers/services');
const newcvs = require('./routers/newcvs');

app.use(logger);

app.use(express.json());
app.use('/api/doctors', departments);
app.use('/api/affairs', affairs);
app.use('/api/services', services);
app.use('/api/newcvs', newcvs);
app.use('/api/users', require('./routers/users'));
app.use('/api/auth', require('./routers/auth'));

app.options('/api/doctors/:id', cors()) // enable pre-flight request for DELETE request
app.delete('/api/doctors/:id', cors(), function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });




    
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));