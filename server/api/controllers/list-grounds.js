module.exports = {


  friendlyName: 'List grounds',


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

      const { search_ground, facilities, sort } = this.req.query;

      let aggregate = [];
      let _match = {};

      if (search_ground) {
        var contains = new RegExp('.*' + search_ground + '.*', 'i');

        _match["name"] = contains;
        _match["location"] = contains;
        _match["description"] = contains;
      }

      if (facilities) {
        let avail_facilities = facilities.split(",");

        for (const facility of avail_facilities) {
          if (facility == "shower") {
            _match["shower"] = true;
          }

          if (facility == "changing_room") {
            _match["changing_room"] = true;
          }

          if (facility == "locker") {
            _match["locker"] = true;
          }
        }
      }

      aggregate.push({
        $match: _match
      },
        {
          $addFields: {
            ground_id: {
              $toString: "$_id"
            }
          }
        },
        {
          $lookup: {
            from: "reviews",
            localField: "ground_id",
            foreignField: "ground_id",
            as: "reviews"
          }
        },
        {
          $addFields: {
            avg_rating: { $avg: "$reviews.rating" }
          }
        },
        {
          $project: {
            reviews: 0,
            ground_id: 0
          }
        });


      if (sort) {
        let sortBy = {};

        switch (sort) {
          case "price-asc":
            sortBy["price"] = 1;
            break;
          case "price-desc":
            sortBy["price"] = -1;
            break;
          case "rating-asc":
            sortBy["avg_rating"] = 1;
            break;
          case "rating-desc":
            sortBy["avg_rating"] = -1;
            break;
          case "newest":
            sortBy["updatedAt"] = -1;
            break;
          default:
            sortBy["createdAt"] = -1;
        }

        aggregate.push({
          $sort: sortBy
        });
      }


      var [err, grounds] = await Helper.to(Grounds.tb().aggregate(aggregate).toArray());

      return exits.success(Response.success('Grounds list', grounds));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }
}
