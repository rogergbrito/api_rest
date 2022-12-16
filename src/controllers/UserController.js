import User from '../models/User';

class UserController {
  async store(req, res) { // criar usuário
    try {
      const novoUser = await User.create(req.body); // os dados serão mandados pelo insomnia, no body
      const { id, nome, email } = novoUser;
      return res.status(200).json({ id, nome, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      }); // mostra o erro que retorna no console
    }
  }

  // Index
  async index(req, res) { // buscar todos os usuários
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email', 'created_at', 'updated_at'] }); // seta os atributos a mostrar
      return res.json(users);
    } catch (err) {
      return res.json(null);
    }
  }

  // Show
  async show(req, res) { // mostrar usuário de ID específico
    try {
      const user = await User.findByPk(req.params.id); // procurar por chave primaria = findByPk

      const { id, nome, email } = user; // pega os atributos a mostrar e retorna
      return res.json({ id, nome, email });
    } catch (err) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) { // atualizar um usuário
    try {
      const user = await User.findByPk(req.userId); // procurar por chave primaria = findByPk

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados; // pega os atributos a mostrar e retorna
      return res.json({ id, nome, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      }); // mostra o erro que retorna no console
    }
  }

  // Delete
  async delete(req, res) { // apagar um usuário
    try {
      const user = await User.findByPk(req.userId); // procurar por chave primaria = findByPk

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      await user.destroy(); // apaga o id selecionada da base de dados
      return res.json(null);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((e) => e.message),
      }); // mostra o erro que retorna no console
    }
  }
}

export default new UserController(); // já exporta instanciado
