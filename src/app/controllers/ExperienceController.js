import * as Yup from 'yup';
import { isAfter, parseISO } from 'date-fns';
import Experience from '../models/Experience';
import Client from '../models/Client';
import Store from '../models/Store';
import Collaborator from '../models/Collaborator';

class ExperienceController {
  /**
   * Show all Collaborators
   * @param {Express} req request
   * @param {Express} res response
   */
  async index(req, res) {
    const experience = await Experience.findAll({
      attributes: ['id', 'date', 'grade', 'comment'],
      order: ['date'],
      include: [
        {
          model: Client,
          attributes: ['id', 'name'],
        },
        {
          model: Store,
          attributes: ['id', 'name'],
        },
        {
          model: Collaborator,
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(experience);
  }

  /**
   * Create a new Collaborators
   * @param {Express} req request
   * @param {Express} res response
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      grade: Yup.number().required(),
      comment: Yup.string().required(),
    });

    const { date, grade } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (isAfter(parseISO(date), new Date())) {
      return res.status(400).json({ error: 'This date is not permitted' });
    }

    if (grade < 0 || grade > 10) {
      return res.status(400).json({ error: 'This grade is not permitted' });
    }

    const { id, comment } = await Experience.create(req.body);

    return res.json({ id, date, grade, comment });
  }

  /**
   * Update Collaborators
   * @param {Express} req request
   * @param {Express} res response
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      grade: Yup.number().required(),
      comment: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { date, grade } = req.body;

    if (isAfter(parseISO(date), new Date())) {
      return res.status(400).json({ error: 'This date is not permitted' });
    }

    const experience = await Experience.findByPk(req.params.id);

    if (!experience) {
      return res.status(400).json({ error: 'This experience not exits' });
    }

    if (grade < 0 || grade > 10) {
      return res.status(400).json({ error: 'This grade is not permitted' });
    }

    const { id, comment } = await experience.update(req.body);

    return res.json({ id, date, grade, comment });
  }
}

export default new ExperienceController();
