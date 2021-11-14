
module.exports = () => {

    //const Exceptions = require('../services/exceptions');
    const AdminService = require('../services/Users')();

    // const handleReject = (e, reject) => {
    //     if (e instanceof Exceptions.ServiceResponseException) {
    //         return reject(e);
    //     } else {
    //         return reject(new Exceptions.ServiceResponseException(500, e.toString()));
    //     }
    // };

    return {
        //add admin
        CreateUser: async (req, res, next) => {
            try {
                const result = await AdminService.CreateUser(req, res, next);
                delete result.connection;
                return res.status(201).json(result);
            }
            catch (e) {
                handleReject(e, next);
            }
        },

        // Get all users
        GetAllUsers: async (req, res, next) => {
            try {
                const results = await AdminService.GetAllUsers(req, res, next);
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

        //Get single user
        GetSingleUser: async (req, res, next) => {
            try {
                const results = await AdminService.GetSingleUser(req, res, next);
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
        // Delete user
        deleteUser: async (req, res, next) => {
            try {
                const result = await AdminService.deleteUser(req, res, next);
                if (result) {

                    delete result.connection;
                    return res.status(200).json(result);
                } else {
                    throw (new Exceptions.ServiceResponseException(404, 'Not Found'));
                }
            }
            catch (e) {
                handleReject(e, next);
            }
        },


        // Update admin
        updateUser: async (req, res, next) => {
            try {
                const result = await AdminService.updateUser(req, res, next);
                if (result) {
                    return res.status(200).json(result);
                } else {
                    throw (new Exceptions.ServiceResponseException(404, 'Not Found'));
                }
            }
            catch (e) {
                handleReject(e, next);
            }
        },

        login: async (req, res, next) => {
            try {
                const result = await AdminService.login(req, res, next);
                return res.status(200).json(result);
            }
            catch (e) {
                handleReject(e, next);
            }
        },

    }
}