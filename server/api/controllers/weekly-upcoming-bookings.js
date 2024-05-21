const moment = require('moment-timezone');
moment.tz.setDefault("UTC");

module.exports = {


  friendlyName: 'Weekly upcoming bookings',


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

      let today = moment().tz("Asia/Kathmandu").toDate();
      let future_7_days = moment().tz("Asia/Kathmandu").add(6, 'days').startOf('day').toDate();
      let total_match = {
        "status": "booked",
        start_time: {
          "$gte": today,
          "$lte": future_7_days
        }
      }

      if (user.role_type == "owner") {
        total_match["user_id"] = user.id;
      }

      var [err, total_bookings] = await Helper.to(Bookings.tb().aggregate([
        {
          $match: total_match
        },
        {
          $project: {
            year: { $year: { date: '$createdAt', timezone: "Asia/Kathmandu" } },
            month: { $month: { date: '$createdAt', timezone: "Asia/Kathmandu" } },
            day: { $dayOfMonth: { date: '$createdAt', timezone: "Asia/Kathmandu" } },
            dayOfWeek: { $dayOfWeek: { date: '$createdAt', timezone: "Asia/Kathmandu" } }
          }
        },
        {
          $addFields: {
            weekday: {
              $arrayElemAt: [
                ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"],
                { $subtract: ["$dayOfWeek", 1] }
              ]
            }
          }
        },
        {
          $group: {
            _id: {
              year: "$year",
              month: "$month",
              day: "$day",
              dayOfWeek: "$dayOfWeek",
              weekday: "$weekday"
          },
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            "_id.year": 1,
            "_id.month": 1,
            "_id.day": 1
          }
        }
      ]).toArray());

      if (err) {
        throw err;
      }

      let bookArr = [];
      let labels = [];
      let start_day = moment(today).tz("Asia/Kathmandu").day();
      for (let i = 0, start_loop=0, end_loop = 7; start_loop < end_loop;) {
        let booking = total_bookings[i];
        let weekName = "";

        if(start_day > 6) {
          start_day = 0;
        }
        
        if (i < total_bookings.length && start_day + 1 == booking._id.dayOfWeek) {
          bookArr.push(booking.count);
          weekName = booking._id.weekday;
          i++;
        } else {
          bookArr.push(0);
          weekName = moment(moment().day(start_day), "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0, 3);
        }

        labels.push(weekName);

        start_day++;
        start_loop++
      }

      let response = {
        labels: labels,
        datasets: { label: "Upcoming Bookings", data: bookArr },
      }

      return exits.success(Response.success('Stats box', response));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }

};
