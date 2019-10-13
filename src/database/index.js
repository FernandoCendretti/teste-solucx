import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import Client from '../app/models/Client';
import Collaborator from '../app/models/Collaborator';
import Store from '../app/models/Store';

const models = [Client, Collaborator, Store];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
