module.exports = {


  friendlyName: 'Sign up',


  description: '',


  inputs: {
    name: {
      type: 'string',
      required: true
    },
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

      //SuFM9#PtP4S@u9hl

      if(!inputs.name) {
        throw "Name is required.";
      }

      if(!inputs.email) {
        throw "Email is required.";
      }

      if(!inputs.password) {
        throw "Password is required.";
      }

      inputs.name = Helper.removeUrls(Helper.sanitizeHTML(Helper.html(inputs.name)));
      inputs.email = inputs.email.toLowerCase().trim();

      var [err, userCount] = await Helper.to(Users.count({
        'email': inputs.email
      }));

      if (err) {
        throw err;
      }

      if (userCount > 0) {
        throw "Email already exists.";
      }

      var [err, hashedPassword] = await Helper.to(Helper.hashPassword(inputs.password));

      if (err) {
        throw err;
      }

      var [err, user] = await Helper.to(Users.create({
        name: inputs.name,
        email: inputs.email,
        password: hashedPassword,
        is_verfied: false,
        role_type: "player"
      }));

      if (err) {
        throw err;
      }

      /**
       * 
       * Need to implement verfication email
       */

      delete user.password;
      this.req.session.user = Helper.encrypt(JSON.stringify(user));
      this.req.session.save();//Save the session immediately to ensure changes are persistent;
      return exits.success(Response.success("User created successfully."));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
