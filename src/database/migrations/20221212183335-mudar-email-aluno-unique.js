/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn( // trocar o createTable para changeColumn
      'alunos', // tabela a mexer
      'email', // parâmetro a mexer
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // deixar único (não poder ter mais de 1 e-mail igual)
      },
    );
  },

  // async down() {}
};
