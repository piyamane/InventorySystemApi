module.exports = () => {

   // const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
   // const Exceptions = require('./exceptions');
    const sql =  require('mssql');
    const config = require('./../../dbConfig')

    return {
        getProducts: async (req, res, next) => {
                const conn = await sql.connect(config);
                const ress = await conn.request().query('select * from product');
                return ress.recordset;

            },
        getSingleProduct: async (req, res, next) => {
            const conn = await sql.connect(config);
            var query = 'select * from Product where product_id = ' + req.params.id;
            console.log("iddddddddddddddddd-----", req.params.id);
            const ress = await conn.request().query(query);
            return ress.recordset;
        },
        createProduct: async (req, res, next)=> {
            console.log("price-----", req.body.price);
            
            const conn = await sql.connect(config);
            //insertsql.query = ['Product'](['product_name ='+ req.params.product_name],['product_price ='+ req.params.product_price],['product_quantity ='+ req.params.params.product_qty]);
            var query = `INSERT into [dbo].[product] ([product_name], [product_price], [product_description], [product_qty])
                         VALUES ('${req.body.name}',${req.body.price},'${req.body.description}',${req.body.quantity})`;
            console.log("query-----", query);
            const ress = await conn.request().query(query);
            return ress.recordset
        },
        updateProduct: async (req, res, next)=> {
            
            const conn = await sql.connect(config);
            //insertsql.query = ['Product'](['product_name ='+ req.params.product_name],['product_price ='+ req.params.product_price],['product_quantity ='+ req.params.params.product_qty]);
            var query = `update product set product_name ='${req.body.name}', product_price = ${req.body.price},
                        product_description = '${req.body.description}', product_qty = ${req.body.quantity} 
                        where product_id = ${req.params.id}`;
            console.log("query-----", query);
            const ress = await conn.request().query(query);
            return ress.recordset
            }, 
            deleteProduct: async (req, res, next)=> {
            
                const conn = await sql.connect(config);
                //insertsql.query = ['Product'](['product_name ='+ req.params.product_name],['product_price ='+ req.params.product_price],['product_quantity ='+ req.params.params.product_qty]);
                var query = `delete product where product_id = ${req.params._id}`;
                console.log("query-----", query);
                const ress = await conn.request().query(query);
                return ress.recordset
                }, 
            
        }
}