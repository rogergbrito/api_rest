import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) { // verifica se existe valor no e-mail e senha
      return res.status(401).json({
        errors: ['Credenciais inválidas.'],
      });
    }

    const user = await User.findOne({ where: { email } }); // verifica na base de dados se o e-mail existe

    if (!user) { // verifica se existe valor no e-mail
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) { // verifica se o retorno foi false, se sim, retornar erro 401
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, { // gera um token para o usuário linkado nos dados id e email dele, token_secret e expiration criados no .ENV
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

export default new TokenController(); // exporta a class tokenController
