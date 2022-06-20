const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPostTable = sequelize.define(
    'BlogPost',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        type: DataTypes.NUMBER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      published: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
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

  BlogPostTable.associate = (models) => {
    BlogPostTable.belongsTo(models.User, { foreignKey: 'id' });
  };

  return BlogPostTable;
};

module.exports = BlogPostSchema;
