const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    name:{type: DataTypes.STRING, allowNull: false},
    password:{type: DataTypes.STRING, allowNull: false},
})

const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, unique: false, allowNull: false},
    userId: {
        type: DataTypes.INTEGER, unique: true,
        references: {
            model: User,
            key: 'id'
        }
    }
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    header: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
    userId: {
        type: DataTypes.INTEGER, unique: true,
        references: {
            model: User,
            key: 'id'
        }
    }
})

User.hasMany(Post);
Post.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

module.exports = {Post, User, Token}