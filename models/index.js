const User = require('./user.model');
const Profile = require('./profile.model');
const Post = require('./post.model');
const Role = require('./role.model');

// 1:1
User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

// 1:M
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// M:M
User.belongsToMany(Role, { through: 'UserRoles' });
Role.belongsToMany(User, { through: 'UserRoles' });

module.exports = { User, Profile, Post, Role };
