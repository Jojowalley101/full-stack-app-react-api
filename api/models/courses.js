'use strict';
const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    class Courses extends Model { }
    Courses.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A title is required'
                },
                notEmpty: {
                    msg: 'Please provide a title'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required'
                },
                notEmpty: {
                    msg: 'Please provide a description'
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: true,
            },
    }, { sequelize });

    Courses.associate = (models) => {
        Courses.belongsTo(models.Users, {
            foreignKey: {
               fieldName: "userId"
            }
        });
    }

    return Courses;
};

// Course.belongsTo(User, {
//     through: User,
// });