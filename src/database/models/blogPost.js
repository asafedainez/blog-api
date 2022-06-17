const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define(
    'BlogPost',
    {
      id: DataTypes.NUMBER,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.NUMBER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'BlogPosts',
    }
  );

  BlogPostTable.associate = (models) => {
    BlogPostTable.hasMany(models.PostCategory, { foreignKey: 'id' });
  };

  // BlogPostTable.associate = (models) => {
  //   BlogPostTable.belongsTo(models.User, { foreignKey: id, as: userId });
  // };

  return BlogPostTable;
};

module.exports = BlogPostSchema;
