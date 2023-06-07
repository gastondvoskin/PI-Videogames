const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Videogame', 
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      background_image: {
        type: DataTypes.STRING,
        allowNull: false,
        /* validate: {
          is: /^image\/(jpeg|png|gif)$/, // accepts JPEG, PNG, and GIF formats
        }, */
      },
      platforms: {                      // array of objects. I need each's object property name. eg PlayStation 5, Xbox Series S/X, etc. 
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      released: {
        type: DataTypes.DATEONLY,       // YYYY-MM-DD     "2013-09-17"
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {                  // only in the id request
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {timestamps: false}
  );
};

