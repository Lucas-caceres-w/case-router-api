'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.changeColumn('documentos', 'noPresenciaABS', {
         type: Sequelize.JSON,
         allowNull: true,
      });

      await queryInterface.changeColumn('documentos', 'noPresenciaLBL', {
         type: Sequelize.JSON,
         allowNull: true,
      });

      await queryInterface.changeColumn('documentos', 'manifiesto', {
         type: Sequelize.JSON,
         allowNull: true,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.changeColumn('documentos', 'noPresenciaABS');
      await queryInterface.changeColumn('documentos', 'noPresenciaLBL');
      await queryInterface.changeColumn('documentos', 'manifiesto');
   },
};
