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
   * Create a new Collaborators
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
   * Update Collaborators
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

    if (!collaborator) {
      return res.status(400).json({ error: 'This collaborator not exits' });
    }

    const { id, name } = await collaborator.update(req.body);

    return res.json({ id, name });
  }

  /**
   * Delete Collaborators
   * @param {Express} req request
   * @param {Express} res response
   */
  async delete(req, res) {
    const collaborator = await Collaborator.destroy({
      where: { id: req.params.id },
    });

    if (!collaborator) {
      return res.status(400).json({ error: 'This collaborator not exits' });
    }

    return res.json({ message: 'Deleted User' });
  }
}

export default new CollaboratorController();
