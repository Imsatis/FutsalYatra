module.exports = {


  friendlyName: 'Sign in',


  description: '',


  inputs: {
    email: {
      type: 'string',
      required: true
    },
    password: {
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

      var [err, user] = await Helper.to(Users.findOne({
        'email': inputs.email
      }));

      if (err) {
        throw err;
      }

      if(!user) {
        throw "User not found."
      }


      var [err, isMatch] = await Helper.to(Helper.comparePasswords(inputs.password, user.password));

      if (err) {
        throw err;
      }

      if(!isMatch) {
        throw "Invalid password."
      }

      if(!user.is_verfied){
        throw "Please verify your email first!"
      }

      /**
       * 
       * Need to implement verfication email
       */

      delete user.password;
      this.req.session.user = Helper.encrypt(JSON.stringify(user));
      this.req.session.save();//Save the session immediately to ensure changes are persistent;
      return exits.success(Response.success("Sesssion created successfully.", {role_type: user.role_type}));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
