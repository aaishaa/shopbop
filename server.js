'use strict';

const express = require('express');
const app = express();


let port = process.env.PORT /* <-- Makes it work on Heroku */ || 3000; 
console.log(`listening on port ${port}`);
app.listen(port);

module.exports = app;