const User = require('../models/user');
const userRoutess = require('../routes/userRoutess');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Rol = require('../models/roles');
const storage = require('../utils/cloud_storage');

module.exports ={

    async getall(req,res,next){
        try{

            const data = await User.getall();
            console.log(`Usuario: ${data}`);
            return res.status(201).json(data);

        }
        catch(error){

            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al Optener datos'
            });


        }
    },

    async register(req,res,next){
        try{
            const user = req.body;
            const data= await User.create(user);
            await Rol.create(data.id,1) // Rol por defecto
            return res.status(201).json({
                success: true,
                message: 'Datos Registrados correctamente!',
                data: data.id

            });
        }
        catch(error){
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un Error!',
                error: error
            });

        }
    },
    async registerwithimg(req,res,next){
        try{
            
            const user = JSON.parse(req.body.user);
            console.log(`datos: ${user}`);
            const files = req.files;
            if(files.lenght > 0){
                const pathImage =`image_${Date.now()}`;
                const url = await storage(files[0],pathImage);
                if(url != undefined && url != null){
                    user.image= url;
                    console.log(req.body.user)
                }
            }
            const data= await User.create(user);
            await Rol.create(data.id,1) // Rol por defecto
            return res.status(201).json({
                success: true,
                message: `Datos Registrados correctamente con imagen!`,
                data: data

            });
        }
        catch(error){
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un Error!',
                error: error
            });

        }
    },


    async login(req,res,next){
        try{

            const email  = req.body.email;
            const password = req.body.password;
            const user = await User.getemailpass(email);

            if(!user){
                return res.status(401).json({
                    success:false,
                    message: 'El Usuario no fue encontrado '
                })

                
                 
            }

            if(User.isPassMatched(password,user.password)){

                const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey,{
                   // expiresIn: (60*60*24)//1 hora
                });
                const data= {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    lastname: user.lastname,
                    phone: user.phone,
                    image: user.image,
                    session_token: `JWT ${token}`,
                    roles: user.roles,
                   
                    

                }

                console.log(`Usuario: ${data}`);

                return res.status(201).json({
                    success:true,
                    data: data,
                    message:'Datos Validados Correctamente'
                });


                    
            }
            else{
                
                return res.status(401).json({
                    success:false,
                    message:'La contraseñes es incorrecta'
                    
                });
                
            }


        }
        catch(error){

            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message:`Error: ${error}`,
                error
            })
        }
    }




};