'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addColumn('documentos', 'noPresenciaABS', {
         type: Sequelize.JSON,
         allowNull: true,
      });

      await queryInterface.addColumn('documentos', 'noPresenciaLBL', {
         type: Sequelize.JSON,
         allowNull: true,
      });

      await queryInterface.addColumn('documentos', 'manifiesto', {
         type: Sequelize.JSON,
         allowNull: true,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn('documentos', 'noPresenciaABS');
      await queryInterface.removeColumn('documentos', 'noPresenciaLBL');
      await queryInterface.removeColumn('documentos', 'manifiesto');
   },
};
