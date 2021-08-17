const JwtStrategy = require('passport-jwt').Strategy;
const ExtratJwt = require('passport-jwt').ExtratJwt;
const Users = require('../models/user');
const keys = require('./keys');

module.exports = function(passport){

    let opts={};
    opts.jwtFromRequest = ExtratJwt.fromAthHeaderWithScheme('jwt')
    opts.secretOrKey = keys.secretOrKey;
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        Users.getuser(jwt_payload.id,(err,user)=>{

            if(err){
                return done(err,false);
            }

            if(user){
                return done(null,user)
            }
            else{
                return done(null,false);
            }
            

        })
    }))

  
}