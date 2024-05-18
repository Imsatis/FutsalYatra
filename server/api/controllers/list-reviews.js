module.exports = {


  friendlyName: 'List reviews',


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

      var [err, reviews] = await Helper.to(Reviews.tb().aggregate([{
        $match: {
          ground_id: inputs.ground_id
        }
      }, {
        $addFields: {
          userId: {
            $toObjectId: '$user_id'
          }
        }
      }, {
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
      }, {
        $project: {
          "user.password": 0,
          "user._id": 0,
          "user.is_verfied": 0,
          "user.role_type": 0,
          "user.createdAt": 0,
          "user.updatedAt": 0
        }
      }]).toArray());

      if (err) {
        throw err;
      }

      return exits.success(Response.success('Reviews list', reviews));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
