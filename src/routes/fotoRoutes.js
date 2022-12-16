import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired';

import fotoController from '../controllers/FotoController'; // importa o objeto HomeController já instanciado, logo, não precisa estar com letra maiúscula

const router = new Router();

router.post('/', loginRequired, fotoController.store);

export default router;
