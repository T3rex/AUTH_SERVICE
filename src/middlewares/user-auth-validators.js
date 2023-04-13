const validateUserSignUp = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            message: 'Something went wrong',
            err: 'Email or password missing'
        })
    }
    next();
}

const validateIsAdminRequest = (req,res,next) =>{
    if(!req.body.userId){
        return res.status(400).json({
            success: false,
            data: {},
            err: 'User id not provided',
            message: 'Something went wrong'
        });
    }
    next();
}

module.exports= {validateUserSignUp,validateIsAdminRequest};