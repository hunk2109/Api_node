const userController = require('../controllers/usersControllers');

module.exports =(app,upload) =>{
    app.get('/api/users/getall',userController.getall);

    app.post('/api/users/create',upload.array('image',1), userController.registerwithimg);

    app.post('/api/users/login',userController.login);

}