const db = require('../config/config');
const Rol = {};

Rol.create =(id_user,id_rol) =>{
    const sql = `
    insert into
            user_has_roles(
                id_user,
                id_rol,
                created_at,
                update_at
            )

            values($1,$2,$3,$4)
    `;

    return db.none(sql,[
        id_user,
        id_rol,
        new Date(),
        new Date()
    ]);
}

module.exports = Rol;