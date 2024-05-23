module.exports = {


  friendlyName: 'Update Profile',


  description: '',



  inputs: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    old_password: {
      type: 'string'
    },
    new_password: {
      type: 'string'
    }
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

      if (!inputs.name) {
        throw "Name is required!";
      }

      if (!inputs.email) {
        throw "Email is required!";
      }

      if (inputs.new_password && !inputs.old_password) {
        throw "Old password is required!";
      }

      if (inputs.old_password && !inputs.new_password) {
        throw "New password is required!";
      }

      inputs.name = Helper.removeUrls(Helper.sanitizeHTML(Helper.html(inputs.name)));
      inputs.email = inputs.email.toLowerCase().trim();

      var re = /\S+@\S+\.\S+/;
      if (!re.test(inputs.email)) {
        throw "Invalid email address.";
      }

      var [err, userCount] = await Helper.to(Users.count({
        id: { '!=': user.id },
        'email': inputs.email
      }));

      if (err) {
        throw err;
      }

      if (userCount > 0) {
        throw "Email already exists.";
      }

      if (inputs.old_password) {

        var [err, getUser] = await Helper.to(Users.findOne({
          id: user.id
        }));

        var [err, isMatch] = await Helper.to(Helper.comparePasswords(inputs.old_password, getUser.password));

        if (err) {
          throw err;
        }

        if (!isMatch) {
          throw "Invalid password."
        }
      }

      let update = {
        name: inputs.name,
        email: inputs.email
      }

      if (inputs.new_password) {
        var [err, hashedPassword] = await Helper.to(Helper.hashPassword(inputs.new_password));

        if (err) {
          throw err;
        }

        update["password"] = hashedPassword;
      }

      var [err, userUpdate] = await Helper.to(Users.updateOne({ id: user.id }).set(update));

      if (err) {
        throw err;
      }


      if (!userUpdate) {
        throw "User not found.";
      }

      delete userUpdate.password;
      this.req.session.user = Helper.encrypt(JSON.stringify(userUpdate));
      this.req.session.save();//Save the session immediately to ensure changes are persistent;
      return exits.success(Response.success('Profile updated.', userUpdate));
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }


};
