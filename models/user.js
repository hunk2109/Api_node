const db = require('../config/config');
const crypto = require('crypto');
const { callbackify } = require('util');

const User = {};

User.getall = ()=>{

   
    const sql= 'select * from users';

    return db.manyOrNone(sql);
}
User.getuser = (id,callback) =>{

    const sql =  `select 
    id,
    email,
    name,
    lastname,
    image,
    phone,
    password,
    session_token
    
    from
     users 
    where id = $1`;

    return db.oneOrNone(sql, id).then(user => {
        callback(null,user);
    })

},

User.getemailpass = (email) =>{
    const sql = `select 
    u.id,
    u.email,
    u.name,
    u.lastname,
    u.image,
    u.phone,
    u.password,
    u.session_token,
	json_agg(
	    json_build_object(
		   'id',r.id,
			'name', r.name,
			'image', r.image,
			'route', r.route

		)
	) as roles
    
    from
     users  as u
	 
	 inner join
	 
	 user_has_roles as uhr
	 on 
	 uhr.id_user = u.id
	
	 inner join roles as r
	 on
	 r.id =uhr.id_rol
    where 	
	u.email = $1
	 group by u.id`;

    return db.oneOrNone(sql,email);
}
User.create = (user) =>{
    const myPasswordHash = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = myPasswordHash;
    const sql =` insert into
     users(
        email,
        name,
        lastname,
        phone,
        image,
        password,
        created_at,
        update_at)
        values($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
        `;

    return db.oneOrNone(sql,[
    user.email,
    user.name,
    user.lastname,
    user.phone,
    user.image,
    user.password,
    new Date,
    new Date
    ]);
} 

User.isPassMatched = (candidatepass,hash) =>
{
    const myPasswordHash = crypto.createHash('md5').update(candidatepass).digest('hex');
    if (myPasswordHash === hash){
      return  true
    }

    return false;

}

module.exports = User;