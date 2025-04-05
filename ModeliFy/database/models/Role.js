module.exports = (sequelize, DataTypes)=> {

    const alias = 'Rol'

    const cols = {
        name: {
            type: DataTypes.STRING(255),
            validate:{
                min: 3
            }
        },
    }

    const config = {
        tableName: 'roles',
        timestamps: false
    }

    const Rol = sequelize.define(alias, cols, config);
    
    Rol.associate = (model)=>{
        Rol.hasMany(model.User,{
            as: "users",
            foreignKey: "rol_id"
        })
    };

    return Rol
}