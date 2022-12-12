const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors=require('cors');
const {job}=require('./utils/cronJob');
const routes = require('./routes/route');
const bodyParser = require('body-parser');
const morgan=require('morgan');
const app = express();
const server = http.createServer(app);
app.use(morgan('tiny'));
app.use([
    cors(),
    express.static("public"),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
     routes
]);

const db=mongoose.connect("mongodb+srv://flexmoney:1z08nxxeiz07MaGy@cluster0.une2qr2.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
job.start();
const port = 8000;

app.get('/', (req, res) => {
    res.send("Hello from express");
})

server.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}!`);
});