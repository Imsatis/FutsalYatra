module.exports = {


  friendlyName: 'Book ground',


  description: '',


  inputs: {
    start_time: {
      type: 'string',
      required: true
    },
    end_time: {
      type: 'string',
      required: true
    },
    ground_id: {
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

      var [err, user] = await Helper.to(Helper.sessionAuth(this.req));

      if (err) {
        throw err;
      }

      var [err, ground] = await Helper.to(Grounds.findOne({
        id: inputs.ground_id
      }));

      if(!ground) {
        throw "Ground not found.";
      }

      var [err, booking] = await Helper.to(Bookings.create({
        start_time: inputs.start_time,
        end_time: inputs.end_time,
        ground_id: inputs.ground_id,
        user_id: user.id,
        status: "pending"
      }));

      if (err) {
        throw err;
      }

      if(!booking) {
        throw "Booking not created";
      }

      var [err, transaction] = await Helper.to(Transactions.create({
        amount: ground.price,
        status: "created",
        user_id: user.id,
        booking_id: booking.id,
        ground_id: ground.id
      }));

      if (err) {
        throw err;
      }

      if(!transaction) {
        throw "Transaction not created";
      }

      booking["transaction"] = transaction;

      var [err, groundOwner] = await Helper.to(Users.findOne({
        id: ground.user_id
      }));

      if(!groundOwner) {
        throw "Ground owner not found.";
      }

      var [err, mail] = await Helper.to(Email.groundBooking(groundOwner, user, ground, booking, "owner"));
      
      return exits.success(Response.success('Booking pending.', booking));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
