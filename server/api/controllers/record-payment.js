module.exports = {


  friendlyName: 'Record payment',


  description: '',



  inputs: {
    type: {
      type: 'string',
      required: true
    }
  },


  exits: {
    invalid: {
      statusCode: 400
    },
  },

  fn: async function (inputs, exits) {
    try {

      var data = this.req.param('data');
      var payemntType = inputs.type;


      let trans = {};
      let paymentStatus = "failed";
      if (payemntType == "success" && trans.status == "COMPLETE") {

        if (!data) {
          throw "Invalid request!"
        }

        data = atob(data);
        trans = JSON.parse(data);
        paymentStatus = "success"
      }

      var [err, updateTransaction] = await Helper.to(Transactions.updateOne({
        id: trans.transaction_uuid
      }).set({
        status: paymentStatus,
        data: trans
      }));

      if (err) {
        return err;
      }

      return this.res.redirect('http://localhost:3000/bookings');
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
