module.exports = {


  friendlyName: 'Get booking slots',


  description: '',


  inputs: {

  },


  inputs: {
    ground_id: {
      type: 'string',
      required: true
    },
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

      var [err, bookings] = await Helper.to(Bookings.tb().find({ ground_id: inputs.ground_id }).project({start_time: 1, end_time: 1, _id: 0, id: "$_id"}).toArray());

      return exits.success(Response.success('Booking slots', bookings));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }

};

