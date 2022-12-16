/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fotos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aluno_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { // referencia a tabela alunos por id
          model: 'alunos',
          key: 'id',
        },
        onDelete: 'SET NULL', // se a foto for apagada, o id do aluno vai ficar null // ON DELETE CASCADE -> apaga o registro junto
        onUpdate: 'CASCADE', // ON UPDATE CASCADE -> a imagem é atrelada ao ID do aluno, se alterarem o id, as imagens se atrelam ao novo id
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('fotos');
  },
};
