module.exports = {


  friendlyName: 'Confirm booking',


  description: '',



  inputs: {
    booking_id: {
      type: 'string',
      required: true
    }
  },


  exits: {
    invalid: {
      statusCode: 400
    },
  },

  fn: async function (inputs, exits) {
    try {

      const booking_id = Helper.decrypt(inputs.booking_id);

      if (!booking_id) {
        throw "Booking ID is required.";
      }

      var [err, booking] = await Helper.to(Bookings.findOne({
        id: booking_id
      }));

      if (err) {
        throw err;
      }

      if (!booking) {
        throw "Booking not found.";
      }

      if(booking.status == "booked") {
        throw "Already booked."
      }

      var [err, ground] = await Helper.to(Grounds.findOne({
        id: booking.ground_id
      }));

      if (err) {
        throw err;
      }

      if (!ground) {
        throw "Ground not found.";
      }

      var [err, player] = await Helper.to(Users.findOne({
        id: booking.user_id
      }));

      if (err) {
        throw err;
      }

      if (!player) {
        throw "Player not found.";
      }


      var [err, groundOwner] = await Helper.to(Users.findOne({
        id: ground.user_id
      }));

      if (err) {
        throw err;
      }

      if (!groundOwner) {
        throw "Ground owner not found.";
      }

      var [err, bookingUpdate] = await Helper.to(Bookings.updateOne({ id: booking_id }).set({ status: "booked" }));

      if (err) {
        throw err;
      }

      var [err, mail] = await Helper.to(Email.groundBooking(groundOwner, player, ground, booking, "player"));

      return this.res.redirect(Helper.baseUrlClient() + '/list-bookings');
    } catch (error) {
      sails.log(error);
      return this.res.redirect(Helper.baseUrlClient() + '/list-bookings');
    }
  }

};
