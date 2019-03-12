module.exports = function(sequelize, DataTypes) {
  const Witness = sequelize.define("Witness", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    }
  });

  Witness.associate = models => {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Witness.belongsTo(models.Quotes, {
      foreignKey: {
        allowNull: false
      }
    });
    Witness.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Witness;
};
