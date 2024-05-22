module.exports = {


  friendlyName: 'Logout',


  description: 'Logout something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    delete this.req.session.user;

    // Save the session to apply changes
    this.req.session.save();

    let self = this;
    // Invalidate the session
    this.req.session.destroy(function (err) {
      if (err) {
        sails.log(error);
      }
    });

    return this.res.redirect(Helper.baseUrlClient() + '/authentication/sign-in');
  }


};
