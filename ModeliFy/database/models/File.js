module.exports = (sequelize, DataTypes)=> {

    const alias = 'File'

    const cols = {
        name: {
            type: DataTypes.STRING(255),
            validate:{
                min: 3
            }
        },
    }

    const config = {
        tableName: 'files',
        timestamps: false
    }

    const File = sequelize.define(alias, cols, config);

    File.associate = (model)=>{
        File.hasMany(model.Product,{
            as: "users",
            foreignKey: "file_id"
        })
    };

    return File
}