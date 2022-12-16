import { Router } from 'express';
import homeController from '../controllers/HomeController'; // importa o objeto HomeController já instanciado, logo, não precisa estar com letra maiúscula

const router = new Router();

router.get('/', homeController.index);

export default router;
