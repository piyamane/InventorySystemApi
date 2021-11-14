
module.exports = () => {

    const ProductService = require('../services/Product')();

    // const handleReject = (e, reject) => {
    //     if (e instanceof Exceptions.ServiceResponseException) {
    //         return reject(e);
    //     } else {
    //         return reject(new Exceptions.ServiceResponseException(500, e.toString()));
    //     }
    // };

    return {
        //add admin
        CreateProduct: async (req, res, next) => {
            try {
                const result = await ProductService.createProduct(req, res, next);
                //delete result.connection;
                return res.status(201).json(result);
            }
            catch (e) {
                handleReject(e, next);
            }
        },

        // Get all users
        GetAllProducts: async (req, res, next) => {
            try {
                const results = await ProductService.getProducts(req, res, next);
                if (results) {
                    return res.status(200).json(results);
                } else {
                    throw (new Exceptions.ServiceResponseException(404, 'Not Found'));
                }

            }
            catch (e) {
                handleReject(e, next);
            }
        },
        GetSingleProduct: async(req, res, next)=>{
            try{
                console.log("iddddddddddddddddd-----", req.params.id);
                const result = await ProductService.getSingleProduct(req, res, next);
                if(result){
                    return res.status(200).json(result);
                }
                else {
                    throw (new Exceptions.ServiceResponseException(404, 'Not Found'));
                }
            }catch(e){
                    handleReject(e. next);
                }
        },
        updateProduct: async (req, res, next) => {
            try {
                const result = await ProductService.updateProduct(req, res, next);
                //delete result.connection;
                return res.status(201).json(result);
            }
            catch (e) {
                handleReject(e, next);
            }
        },
        deleteProduct: async (req, res, next) => {
            try {
                const result = await ProductService.deleteProduct(req, res, next);
                //delete result.connection;
                return res.status(201).json(result);
            }
            catch (e) {
                handleReject(e, next);
            }
        },

    }
}