const UserSchema = (sequelize, DataTypes) => {
  const UserTable = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
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
