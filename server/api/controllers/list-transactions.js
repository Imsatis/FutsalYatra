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


      let match = {};
      if (user.role_type == "admin") {

      } else if (user.role_type == "owner") {

        var [err, grounds] = await Helper.to(Grounds.find({
          user_id: user.id
        }));

        const groundIds = await Helper.getArrayOfValues(grounds, "id");
        match = {
          ground_id: groundIds
        }
      } else {
        match = {
          user_id: user.id
        }
      }

      var [err, transactions] = await Helper.to(Transactions.tb().aggregate([
        {
          $match: match
        },
        {
          $addFields: {
            userId: {
              $toObjectId: '$user_id'
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        }, {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: false
          }
        }
      ]).toArray());


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
