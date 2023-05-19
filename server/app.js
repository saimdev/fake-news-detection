const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use(require('./routers/auth'));

app.listen(5000, ()=>{})

