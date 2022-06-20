const PostCategorySchema = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define(
    'PostCategory',
    {
      categoryId: {
        type: DataTypes.NUMBER,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
      postId: {
        type: DataTypes.NUMBER,
        references: {
          model: 'BlogPost',
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
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });

    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategoryTable,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
  };

  // PostCategoryTable.associate = (models) => {
  //   PostCategoryTable.belongsToMany(models.Category, {
  //     foreignKey: 'id',
  //     through: 'PostCategory',
  //   });
  //   PostCategoryTable.belongsToMany(models.BlogPost, {
  //     foreignKey: 'id',
  //     through: 'PostCategory',
  //   });
  // };

  return PostCategoryTable;
};

module.exports = PostCategorySchema;
