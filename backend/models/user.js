module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('Users', {
    //Informations obligatoires
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    statut: {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'user'
    },
    //Informations optionnel
    avatar: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    //Date
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    lastRefreshDate: {
      allowNull: true,
      type: Sequelize.DATE
    }
  });
  return User;
};