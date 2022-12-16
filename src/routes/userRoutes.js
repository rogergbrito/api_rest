import { Router } from 'express';
import userController from '../controllers/UserController'; // importa o objeto HomeController já instanciado, logo, não precisa estar com letra maiúscula

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não deveria existir -> só para completar o CRUD
router.get('/', userController.index); // lista usuários
router.get('/:id', userController.show); // lista usuário

router.post('/', userController.store); // cria um usuário
router.put('/', loginRequired, userController.update); // atuliza usuário
router.delete('/', loginRequired, userController.delete); // deleta usuário

export default router;

/*
index -> Lista todos os usuários -> GET
store/create -> cria um novo usuário -> POST
delete -> apaga um usuário -> DELETE
show -> mostra um usuário -> GET
update -> atualiza um usuário -> PATCH OU PUT
*/
