module.exports = {


  friendlyName: 'Get ground',


  description: '',


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

      var [err, ground] = await Helper.to(Grounds.findOne({
        id: inputs.ground_id
      }));

      return exits.success(Response.success('Ground details', ground));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }

};
