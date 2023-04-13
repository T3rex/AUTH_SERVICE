const UserService = require('../services/user-service');

const userService = new UserService();

const createUser = async (req,res)=>{
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
                data: response,
                message: 'User created successfully',
                success: true,
                err: {}
        })
    } catch (error) {
        console.log("Something went wrong in user controller",error);
        return res.status(error.statusCode).json(
            {   data: {},
                message: error.message,
                success: false,
                err: error.description
            });
    }
}

const deleteUser = async (req,res)=>{
    try {
        const response = await userService.delete(req.params.id);
        return res.status(200).json({
                data: response,
                message: 'User deleted successfully',
                success: true,
                err: {}
        })
    } catch (error) {
        console.log("Something went wrong in user controller",error);
        return res.status(500).json(
            {   data: {},
                message: 'Something went wrong in user controller',
                success: false,
                err: error
            });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
                JWT: response,
                message: 'User signed in successfully',
                success: true,
                err: {}
        })
    } catch (error) {
         console.log("Something went wrong in user controller",error);
        return res.status(500).json(
            {   data: {},
                message: 'Something went wrong in user controller',
                success: false,
                err: error
            });
    }
}

const isAuthentitcated = async (req,res) =>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success : true,
            err: {},
            data: response,
            message: 'user is authenticated'
        })
        
    } catch (error) {
        console.log("Something went wrong in user controller",error);
        return res.status(500).json(
            {   data: {},
                message: 'Something went wrong in user controller',
                success: false,
                err: error
            });
    }
}

const isAdmin = async (req,res) =>{
    try {       
        const response =  await userService.isAdmin(req.body.userId);
        return res.status(200).json({
            data: response,
            err:{},
            success:true,
            message:'Success'
        });
    } catch (error) {
         console.log("Something went wrong in user controller",error);
        return res.status(500).json(
            {   data: {},
                message: 'Something went wrong in user controller',
                success: false,
                err: error
            });
    }
}

const getById= async(req,res) =>{
    try {       
        console.log(req.params);
        const response =  await userService.getById(req.params.id);
        return res.status(200).json({
            data: response,
            err:{},
            success:true,
            message:'Success'
        });
    } catch (error) {
         console.log("Something went wrong in user controller",error);
        return res.status(500).json(
            {   data: {},
                message: 'Something went wrong in user controller',
                success: false,
                err: error
            });
    }
} 

module.exports = {
    createUser,deleteUser,signIn,isAuthentitcated,isAdmin,getById
};