module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'categories',
        timestamps: true,
        underscored: true
    });

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'categoryId'
        });
    };

    return Category;
};