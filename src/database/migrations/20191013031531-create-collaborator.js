module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('collaborators', {
      id: {
        type: Sequelize.INTEGER,
        allownull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allownull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allownull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allownull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('collaborators');
  },
};
