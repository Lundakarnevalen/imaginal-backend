const Sequelize = require("sequelize");
const dbc = require("../config/database");

const Booking = dbc.define("Booking", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phoneNbr: Sequelize.STRING,
  nbrGuests: Sequelize.INTEGER,
});

Booking.associate = (models) => {
  Booking.belongsTo(models.Event, {foreignKey: 'eventId'})
}

module.exports = {
  Booking
};
