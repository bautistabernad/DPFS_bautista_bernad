const db = require('../../../database/models');

const apiUsersController = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll();

            const usersData = users.map(user => {
                return {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    detail: `http://localhost:3000/api/users/${user.id}`
                };
            });

            return res.json({
                count: users.length,
                users: usersData
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Error al obtener usuarios'
            });
        }
    },

    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({
                    error: 'Usuario no encontrado'
                });
            }

            return res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                image: `http://localhost:3000/images/users/${user.image}`,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Error al obtener usuario'
            });
        }
    }
};

module.exports = apiUsersController;