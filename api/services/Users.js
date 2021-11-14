module.exports = () => {

    const jwt = require('jsonwebtoken');
    //const Exceptions = require('./exceptions');
    const sql =  require('mssql');
    const config = require('../../dbConfig')

    return {
        CreateUser: async (req, res, next) => {
                const collection = req.app.locals.db.collection('MvestCerebro');
                let doc = {
                    _id: req.body._id,
                    name: req.body.name,
                    role_name: req.body.role_name,  //added field
                    phone_no: req.body.phone_no,
                    address: req.body.address,
                    password: req.body.password,
                    photo: req.body.photo,
                    gender: req.body.gender,
                    create_ts: req.body.create_ts,
                    isActive: true
                };
                const conn = await sql.connect(config);
                const ress = await conn.request().query('select * from product');
                return ress.recordset;

            },
            login: async (req, res, next) => {
                const collection = req.app.locals.db.collection('MvestCerebro');
                const result = await collection.findOne({ _id: req.body.name });
                if (!result) {
                    return new Exceptions.ServiceResponseException(401, 'Invalid name')
                }
                const match = req.body.password == result.password;
                if (match) {

                    // response = {
                    //     status_code: 200,
                    //     data: result,
                    //     error: '',
                    //     token: jwt.sign(result, process.env.JWT_SECRET, { expiresIn: '24h' })
                    // }
                    var result_response = JSON.parse(JSON.stringify(result));
                    result_response.token = jwt.sign(result, process.env.JWT_SECRET, { expiresIn: '24h' });
                    response = {
                        status_code: 200,
                        data: result_response,
                        error: '',
                    }

                    return response;
                } else {
                    return new Exceptions.ServiceResponseException(401, 'Invalid password')
                }
            },
        }
}