import { Op } from 'sequelize';
import * as Yup from 'yup';
import Client from '../models/Client';

class ClientController {
  /**
   * Show all Clients
   * @param {Express} req request
   * @param {Express} res response
   */
  async index(req, res) {
    const client = await Client.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'cpf'],
    });

    return res.json(client);
  }

  /**
   * Create a new client
   * @param {Express} req request
   * @param {Express} res response
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      phone: Yup.string().min(11),
      cpf: Yup.string().min(11),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const clientExists = await Client.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { cpf: req.body.cpf },
          { phone: req.body.phone },
        ],
      },
    });

    if (clientExists) {
      return res.status(400).json({ error: 'Client already exists' });
    }

    const { id, name, email, phone, cpf } = await Client.create(req.body);

    return res.json({ id, name, email, phone, cpf });
  }

  /**
   * Update Client
   * @param {Express} req request
   * @param {Express} res response
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      phone: Yup.string().min(11),
      cpf: Yup.string().min(11),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, phone, cpf } = req.body;

    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(400).json({ error: 'This client not exits' });
    }

    if (email !== client.email) {
      const clientExists = await Client.findOne({
        where: {
          email,
        },
      });

      if (clientExists) {
        return res.status(400).json({ error: 'Client already exists' });
      }
    }
    if (cpf !== client.cpf) {
      const clientExists = await Client.findOne({
        where: {
          cpf,
        },
      });

      if (clientExists) {
        return res.status(400).json({ error: 'Cpf already exists' });
      }
    }
    if (phone !== client.phone) {
      const clientExists = await Client.findOne({
        where: {
          phone,
        },
      });

      if (clientExists) {
        return res.status(400).json({ error: 'phone already exists' });
      }
    }

    const { id, name } = await client.update(req.body);

    return res.json({ id, name, email, phone, cpf });
  }

  /**
   * Delete Client
   * @param {Express} req request
   * @param {Express} res response
   */
  async delete(req, res) {
    const client = await Client.destroy({ where: { id: req.params.id } });

    if (!client) {
      return res.status(400).json({ error: 'This client not exits' });
    }

    return res.json({ message: 'Deleted User' });
  }
}

export default new ClientController();
