module.exports = {


  friendlyName: 'Change Role',


  description: '',



  inputs: {
    user_id: {
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

      if (user.role_type === 'player' || user.role_type === 'owner') {
        throw "Invalid access."
      }

      var [err, userUpdate] = await Helper.to(Users.updateOne({ id: inputs.user_id }).set({ role_type: "owner" }));

      if (err) {
        throw err;
      }


      if (!userUpdate) {
        throw "User not found.";
      }

      return exits.success(Response.success('Role updated.'));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
