const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Users',
    }
  );

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, { foreignKey: 'id' });
  };

  return UserTable;
};

module.exports = UserSchema;
