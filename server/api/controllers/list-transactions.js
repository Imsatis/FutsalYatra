module.exports = {


  friendlyName: 'List transactions',


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
        throw err;
      }


      if (user.role_type == "admin") {
        var [err, transactions] = await Helper.to(Transactions.find());
      }else if(user.role_type == "owner") {

        var [err, grounds] = await Helper.to(Grounds.find({
          user_id: user.id
        }));

        const groundIds = await Helper.getArrayOfValues(grounds, "id");

        var [err, transactions] = await Helper.to(Transactions.find({
          ground_id: groundIds
        }));

      }else {
        var [err, transactions] = await Helper.to(Transactions.find({
          user_id: user.id
        }));
      }


      if (err) {
        throw err;
      }

      return exits.success(Response.success('Transactions list', transactions));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
