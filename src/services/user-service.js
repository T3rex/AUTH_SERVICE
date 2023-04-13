const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService{
    
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'ValidationError'){
                throw error;
            }
            console.log("Something went wrong in user service");
            throw (error);
        }
    }

    async delete(userId){
        try {
            const result = await this.userRepository.delete(userId);
            return result;
        } catch (error) {
            console.log("Something went wrong in user service");
            throw (error);
        }
    }

    async getById(userId){
        try{
            const user =  await this.userRepository.getById(userId);
            return user;
        }catch(error){
            console.log("Email does not exist");
            throw error;
        }
    }

    async signIn(email,password){
        try {
            const user = await this.userRepository.getByEmail(email);
            if(user){
                const passwordsMatch = this.checkPassword(password,user.password);
                if(!passwordsMatch){
                    console.log("Password does not match");
                    throw {error: "Incorrect password"};
                }

                const newJWT = this.createToken({email:user.email, id:user.id});
                return newJWT;
            }
            else{
                console.log("Email does not exist");
                    throw {error: "Email not registered"};
            }

        } catch (error) {
            console.log("Something went wrong in sign-in service");
            throw (error);
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: "Authentication failed"};
            }            
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: "No user of with the corresponsing token exists"};
            }            
            return user.id;
        } catch (error) {
            console.log("Something went wrong in sign-in service");
            throw (error);
        }
    }
    

    createToken(user){
        try {
            const token = jwt.sign( user, JWT_KEY, { expiresIn: '1d' });
            return token;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw (error);
        }
    }

    verifyToken(token){
        try {
            const decoded = jwt.verify(token, JWT_KEY);
            return decoded;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw (error);
        }
    }

    checkPassword(plainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(plainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw (error);
        }
    }

    async isAdmin(userId){
        try {
            const response =  await this.userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            console.log("Something went wrong user service");
            throw (error);
        }
    }
}

module.exports = UserService;