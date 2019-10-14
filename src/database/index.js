import Sequelize from 'sequelize';
import Client from '../app/models/Client';
import Collaborator from '../app/models/Collaborator';
import Store from '../app/models/Store';
import Experience from '../app/models/Experience';

import databaseConfig from '../config/database';

const models = [Client, Collaborator, Store, Experience];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
