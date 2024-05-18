module.exports = {


  friendlyName: 'Add review',


  description: '',



  inputs: {
    ground_id: {
      type: 'string',
      required: true
    },
    rating: {
      type: 'number',
      required: true
    },
    review: {
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

      if (err) {
        throw err;
      }


      if (!ground) {
        throw "Ground not found.";
      }

      var [err, booking] = await Helper.to(Reviews.create({
        ground_id: inputs.ground_id,
        user_id: user.id,
        review: inputs.review,
        rating: inputs.rating
      }));

      if (err) {
        throw err;
      }

      return exits.success(Response.success('Review added.', booking));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
