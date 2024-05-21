module.exports = {


  friendlyName: 'List bookings',


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
      // var [err, user] = await Helper.to(Helper.sessionAuth(this.req));

      // if (err) {
      //   throw err;
      // }

      var limit = this.req.param('limit');

      let match = {};

      // if (user.role_type != "admin") {
      //   match["user_id"] = user.id;
      // }

      // if (user.role_type == "owner") {
      //   var [err, grounds] = await Helper.to(Grounds.tb().find({
      //     user_id: user.id
      //   }).toArray());

      //   const groundIds = await Helper.getArrayOfValues(grounds, "id");

      //   match = {
      //     $or: [{
      //       user_id: user.id
      //     },
      //     {
      //       ground_id: groundIds
      //     }]
      //   }
      // }

      var [err, bookings] = await Helper.to(Bookings.tb().aggregate([
        {
          $match: match
        },
        {
          $addFields: {
            userId: {
              $toObjectId: '$user_id'
            },
            groundId: {
              $toObjectId: '$ground_id'
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
        },
        {
          $lookup: {
            from: 'grounds',
            localField: 'groundId',
            foreignField: '_id',
            as: 'ground'
          }
        }, {
          $unwind: {
            path: '$ground',
            preserveNullAndEmptyArrays: false
          }
        },
        {
          $project: {
            "user.password": 0
          }
        }
      ]).limit(limit ? limit : 250).toArray());

      if (err) {
        throw err;
      }

      return exits.success(Response.success('Bookings list', bookings));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
