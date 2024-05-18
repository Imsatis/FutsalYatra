module.exports = {


  friendlyName: 'List users',


  description: '',



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


      if (user.role_type != "admin") {
        throw "Invalid access!";
      }

      var [err, users] = await Helper.to(Users.tb().find().project({password: 0}).toArray());

      if (err) {
        throw err;
      }

      return exits.success(Response.success('Users list', users));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
