import Sequelize, { Model } from 'sequelize';

class Experience extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        grade: Sequelize.INTEGER,
        comment: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id' });
    this.belongsTo(models.Collaborator, { foreignKey: 'collaborator_id' });
    this.belongsTo(models.Store, { foreignKey: 'store_id' });
  }
}

export default Experience;
