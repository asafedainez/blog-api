const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.NUMBER,
        references: {
          model: 'BlogPost',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.NUMBER,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      tableName: 'PostCategories',
    }
  );

  PostCategoryTable.associate = (models) => {
    PostCategoryTable.belongsToMany(models.BlogPost);
    PostCategoryTable.belongsToMany(models.Category);
  };

  return PostCategoryTable;
};

module.exports = PostCategorySchema;
