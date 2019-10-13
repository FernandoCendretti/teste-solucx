import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import CollaboratorController from './app/controllers/CollaboratorController';
import StoreController from './app/controllers/StoreController';

const routes = new Router();

routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.delete);

routes.get('/collaborators', CollaboratorController.index);
routes.post('/collaborators', CollaboratorController.store);
routes.put('/collaborators/:id', CollaboratorController.update);
routes.delete('/collaborators/:id', CollaboratorController.delete);

routes.get('/stores', StoreController.index);
routes.post('/stores', StoreController.store);
routes.put('/stores/:id', StoreController.update);
routes.delete('/stores/:id', StoreController.delete);

export default routes;
