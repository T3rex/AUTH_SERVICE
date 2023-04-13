const express = require('express');
const {PORT} =  require('./config/serverConfig');
const apiRoutes =  require('./routes/index');
const bodyParser = require('body-parser');
const db = require('./models/index');


const UserService = require('./services/user-service');


const app = express();


const prepareAndStartServer = () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/authservice/api',apiRoutes);
   
    app.listen(PORT,async ()=>{
        console.log("Starting server on port " + PORT);

        if(process.env.DB_SYNC==='true'){
           db.sequelize.sync({alert:true});
        }        
    });
}

prepareAndStartServer();
