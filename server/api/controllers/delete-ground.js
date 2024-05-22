module.exports = {


  friendlyName: 'Update ground',


  description: '',


  inputs: {
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

      if (user.role_type == "player") {
        throw "Invalid access!";
      }

      if (!inputs.ground_id) {
        throw "Ground id is required.";
      }

     
      var [err, ground] = await Helper.to(Grounds.updateOne({
        id: inputs.ground_id
      }));

      if (err) {
        return exits.invalid(Response.error(err));
      }

      return exits.success(Response.success('Ground Deleted.'));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }
};
