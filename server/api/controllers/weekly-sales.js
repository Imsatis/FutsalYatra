const moment = require('moment-timezone');
moment.tz.setDefault("UTC");

module.exports = {


  friendlyName: 'Weekly sales',


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

      let last_7_day = moment().tz("Asia/Kathmandu").add(-6, 'days').startOf('day').toDate();
      let total_match = {
        "status": "success",
        createdAt: {
          "$gte": last_7_day
        }
      }

      if (user.role_type == "owner") {
        total_match["user_id"] = user.id;
      }

      var [err, total_sales] = await Helper.to(Transactions.tb().aggregate([
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

      let salesArr = [];
      let labels = [];
      let start_day = moment(last_7_day).tz("Asia/Kathmandu").day();
      for (let i = 0, start_loop = 0, end_loop = 7; start_loop < end_loop;) {
        let sales = total_sales[i];
        let weekName = "";

        if (start_day > 6) {
          start_day = 0;
        }

        if (i < total_sales.length && start_day + 1 == sales._id.dayOfWeek) {
          salesArr.push(sales.count);
          weekName = sales._id.weekday;
          i++;
        } else {
          salesArr.push(0);
          weekName = moment(moment().tz("Asia/Kathmandu").day(start_day), "YYYY-MM-DD HH:mm:ss").format('dddd').substring(0, 3);
        }

        labels.push(weekName);

        start_day++;
        start_loop++
      }

      let response = {
        labels: labels,
        datasets: { label: "Sales", data: salesArr },
      }

      return exits.success(Response.success('Stats box', response));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }

};
