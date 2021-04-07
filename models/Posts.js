const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model{}

Posts.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,    
            autoIncrement:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        contents:{
            type:DataTypes.STRING,

        },
        created_date:{
            type:DataTypes.DATEONLY,
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                key:'id',
            }
        }
 
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts',
      }
    
);

module.exports=Posts;