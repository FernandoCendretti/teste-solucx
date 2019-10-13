import * as Yup from 'yup';
import Store from '../models/Store';

class CollaboratorController {
  /**
   * Show all Stores
   * @param {Express} req request
   * @param {Express} res response
   */
  async index(req, res) {
    const collaborator = await Store.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(collaborator);
  }

  /**
   * Create a new Stores
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

    const { id, name } = await Store.create(req.body);

    return res.json({ id, name });
  }

  /**
   * Update Stores
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
    const store = await Store.findByPk(req.params.id);

    const { id, name } = await store.update(req.body);

    return res.json({ id, name });
  }

  /**
   * Delete Stores
   * @param {Express} req request
   * @param {Express} res response
   */
  async delete(req, res) {
    await Store.destroy({ where: { id: req.params.id } });

    return res.json({ message: 'Deleted User' });
  }
}

export default new CollaboratorController();
