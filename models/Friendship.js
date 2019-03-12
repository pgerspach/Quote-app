const models = require("../models");

module.exports = function(sequelize, DataTypes) {
  var Friendship = sequelize.define("Friendship", {
    // Giving the Author model a name of type STRING
    FriendId: {
      type: DataTypes.STRING,
      references: {
        model: "Users",
        key: "id"
      }
    },
    status: {
      type: DataTypes.INTEGER
    }
  });

  Friendship.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Friendship.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };


  return Friendship;
};
