const moment = require('moment-timezone');

module.exports = {


  friendlyName: 'Weekly bookings',


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

      if (user.role_type == "owner") {
        total_match["user_id"] = user.id;
      }

      let last_7_day = moment().tz("Asia/Kathmandu").add(-6, 'days').startOf('day').toDate();

      var [err, total_bookings] = await Helper.to(Bookings.tb().aggregate([
        {
          $match: {
            createdAt: {
              "$gte": last_7_day
            }
          }
        },
        {
          $project: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            dayOfWeek: { $dayOfWeek: "$createdAt" }
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

      let start_day = moment(last_7_day).day();
      let bookArr = [];
      let labels = []; 
      for (let i = 0, startLoop=0, loopTime = 7; startLoop < loopTime;) {
        let booking = total_bookings[i];
        if (i <= booking.length && start_day == booking._id.dayOfWeek) {
          bookArr.push(booking.count);
          i++;
        } else {
          bookArr.push(0);
        }
        start_day++;

        if(start_day > 6) {
          start_day = 0;
        }
    
        let weekName = moment(new Date(booking._id.year, booking._id.month - 1, booking._id.day), "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0, 3);
        labels.push(weekName);

        startLoop++
      }

      let response = {
        weekly_bookings: {
          labels: labels,
          datasets: { label: "Bookings", data: bookArr },
        }
      }

      return exits.success(Response.success('Stats box', response));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }

};
