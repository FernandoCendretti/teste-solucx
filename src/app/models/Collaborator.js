import Sequelize, { Model } from 'sequelize';

class Collaborator extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Collaborator;
