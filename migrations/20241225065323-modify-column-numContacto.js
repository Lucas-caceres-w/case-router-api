'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('personals', 'numContacto', {
         type: Sequelize.BIGINT.UNSIGNED, // Cambiar el tipo de dato a BIGINT UNSIGNED
         allowNull: false, // Asegúrate de definir las restricciones necesarias
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('personals', 'numContacto', {
         type: Sequelize.INTEGER.UNSIGNED, // Revertir a INT UNSIGNED
         allowNull: false,
      });
   },
};
