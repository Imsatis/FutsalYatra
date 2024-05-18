module.exports = {


  friendlyName: 'Verify session',


  description: '',


  inputs: {

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
        return this.res.forbidden(err);
      }

      delete user.password;
      return exits.success(Response.success('Session valid', user));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
