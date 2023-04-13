const {User,Role} =  require('../models/index');
const ValidationError = require('../utils/validation-error');

class UserRepository {
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                throw  new ValidationError(error);                
            }           
            console.log("Something went wrong in user repo");
            throw (error);
        }
    }

    async delete(userId){
        try {
            const result = await User.destroy({
                where:{
                    id:  userId
                }
            })
            return result;
        } catch (error) {
            console.log("Something went wrong in user repo");
            throw (error);
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in user repo");
            throw (error);
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email: userEmail
                }
            })
            return user;
        } catch (error) {
            console.log("Something went wrong in user repo");
            throw (error);
        }
    }

    async isAdmin(userId){
        try {           
            const user = await this.getById(userId);            
            const adminRole =  await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            
            const response = user.hasRole(adminRole);
            
            return response;
        } catch (error) {
            console.log("Something went wrong in user repo");
            throw (error);
        }
    }

}

module.exports = UserRepository;