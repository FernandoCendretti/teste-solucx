import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import CollaboratorController from './app/controllers/CollaboratorController';

const routes = new Router();

routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.delete);

routes.get('/collaborators', CollaboratorController.index);
routes.post('/collaborators', CollaboratorController.store);
routes.put('/collaborators/:id', CollaboratorController.update);
routes.delete('/collaborators/:id', CollaboratorController.delete);

export default routes;
