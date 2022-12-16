import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required.'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET); // verifica se o token é valido
    const { id, email } = dados;

    const user = await User.findOne({ // verifica se o id e email enviados no token são iguais os da base
      where: {
        id,
        email,
      },
    });

    if (!user) { // se user não existir, quer dizer que não existe o e-mail e senha na base de dados
      return res.status(401).json({
        errors: ['Usuário inválido.'],
      });
    }

    req.userId = id; // salva o id do usuário pego do token
    req.userEmail = email; // salva o email do usuário pego do token
    return next();
  } catch (err) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido.'],
    });
  }
};
