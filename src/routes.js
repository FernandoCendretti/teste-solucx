import { Router } from 'express';
import Client from './app/models/Client';

const routes = new Router();

routes.get('/', async (req, res) => {
  const client = await Client.create({
    name: 'Fernando',
    email: 'fernando@teste.com',
    phone: '(12) 9999-9999',
    cpf: '222.222.222-22',
  });
  return res.json(client);
});

export default routes;
