import { Router } from 'express';
import tokenController from '../controllers/TokenController'; // importa o objeto tokenController já instanciado, logo, não precisa estar com letra maiúscula

const router = new Router();

router.post('/', tokenController.store);

export default router;
