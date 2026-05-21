module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'category_id'
        },
        teacherId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'teacher_id'
        }
    }, {
        tableName: 'products',
        timestamps: true,
        underscored: true
    });

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categoryId'
        });
        Product.belongsTo(models.User, {
            as: 'teacher',
            foreignKey: 'teacherId'
        });
    };

    return Product;
};