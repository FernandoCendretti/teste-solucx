import * as Yup from 'yup';
import Collaborator from '../models/Collaborator';

class CollaboratorController {
  /**
   * Show all Collaborators
   * @param {Express} req request
   * @param {Express} res response
   */
  async index(req, res) {
    const collaborator = await Collaborator.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(collaborator);
  }

  /**
   * Create a new client
   * @param {Express} req request
   * @param {Express} res response
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, name } = await Collaborator.create(req.body);

    return res.json({ id, name });
  }

  /**
   * Update Client
   * @param {Express} req request
   * @param {Express} res response
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const collaborator = await Collaborator.findByPk(req.params.id);

    const { id, name } = await collaborator.update(req.body);

    return res.json({ id, name });
  }

  /**
   * Delete Client
   * @param {Express} req request
   * @param {Express} res response
   */
  async delete(req, res) {
    await Collaborator.destroy({ where: { id: req.params.id } });

    return res.json({ message: 'Deleted User' });
  }
}

export default new CollaboratorController();
