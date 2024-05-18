module.exports = {


  friendlyName: 'Get avg rating',


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

      var [err, reviews] = await Helper.to(Reviews.tb().aggregate([
        {
          $match: { ground_id: inputs.ground_id }
        },
        {
          $group: {
            _id: "$ground_id", // grouping all documents
            total: { $sum: "$rating" }, // summing up the values in yourField
            totalCount: {$sum: 1}
          }
        },
        {
          $project: {
            _id: 0,
            average: { $divide: ["$total", "$totalCount"] } // calculate the average
          }
        }
      ]).toArray());

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
