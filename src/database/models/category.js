const CategorySchema = (sequelize, DataTypes) => {
  const CategoryTable = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Categories',
    }
  );

  CategoryTable.associate = (models) => {
    CategoryTable.hasMany(models.PostCategory, { foreignKey: 'id' });
  };

  return CategoryTable;
};

module.exports = CategorySchema;
