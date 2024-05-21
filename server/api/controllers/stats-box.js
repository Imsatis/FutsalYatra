const moment = require('moment-timezone');
moment.tz.setDefault("UTC");

module.exports = {


  friendlyName: 'Stats box',


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

      if (user.role_type == "player") {
        throw "Invalid access!";
      }

      let total_match = {
        "status": "booked"
      }

      let upcoming_match = {
        start_time: {
          '>=': moment().tz("Asia/Kathmandu").toDate()
        },
        "status": "booked"
      }

      let revenue_match = {
        "status": "success"
      }


      if (user.role_type == "owner") {
        total_match["user_id"] = user.id;
        upcoming_match["user_id"] = user.id;
        revenue_match["user_id"] = user.id;
      }

      var [err, total_bookings] = await Helper.to(Bookings.count(total_match));

      if (err) {
        throw err;
      }

      var [err, upcoming_bookings] = await Helper.to(Bookings.count(upcoming_match));

      if (err) {
        throw err;
      }


      var [err, total_revenue] = await Helper.to(Transactions.tb().aggregate([
        {
          $match: revenue_match
        },
        {
          $group: {
            _id: null,
            amount: { $sum: "$amount" }
          }
        }
      ]).toArray());

      if (err) {
        throw err;
      }


      var [err, total_players] = await Helper.to(Users.count({
        "role_type": "player"
      }));

      if (err) {
        throw err;
      }



      let response = {
        total_bookings,
        upcoming_bookings,
        total_revenue: total_revenue && total_revenue.length > 0 ? total_revenue[0].amount : 0,
        total_players
      }

      return exits.success(Response.success('Stats box', response));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }

};
