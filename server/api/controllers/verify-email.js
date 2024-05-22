module.exports = {


  friendlyName: 'Verify email',


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

      const user_id = Helper.decrypt(inputs.user_id);

      if (!user_id) {
        throw "ID is required.";
      }

      var [err, user] = await Helper.to(Users.findOne({
        id: user_id
      }));

      if (err) {
        throw err;
      }

      if (!user) {
        throw "User not found.";
      }

      if (user.is_verfied) {
        throw "Already verified."
      }

      var [err, userUpdate] = await Helper.to(Users.updateOne({ id: user_id }).set({ is_verfied: true }));

      if (err) {
        throw err;
      }

      return this.res.redirect(Helper.baseUrlClient() + '/authentication/sign-in');
    } catch (error) {
      sails.log(error);
      return this.res.redirect(Helper.baseUrlClient() + '/authentication/sign-in');
    }
  }

};
