import Sequelize, { Model } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Client;
