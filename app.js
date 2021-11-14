const sql = require('mssql')
const config = require('./dbConfig')
require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require("morgan");


const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    app.listen(process.env.API_PORT, () => console.info(`REST API running on port ${process.env.API_PORT}`));
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

  
// ROUTES
const UsersRouter = require(`./api/routes/Users`);
const ProductRouter = require(`./api/routes/Product`);
  const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
	res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS,DELETE")
	next();
});


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//app.use('/', authRouter);
app.use('/Users', UsersRouter);
app.use('/Product', ProductRouter);

module.exports = {
  sql, poolPromise,app
}

