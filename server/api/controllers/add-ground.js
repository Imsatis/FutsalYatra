module.exports = {


  friendlyName: 'Add ground',


  description: '',


  inputs: {
    name: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    location: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    shower: {
      type: 'boolean'
    },
    changing_room: {
      type: 'boolean'
    },
    locker: {
      type: 'boolean'
    },
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

      if(!inputs.name) {
        throw "Ground name is required.";
      }

      if(!inputs.price) {
        throw "Ground price is required.";
      }
      
      if(!inputs.price < 0 ) {
        throw "Ground price can't be in negative.";
      }
      
      if(!inputs.location) {
        throw "Ground location is required.";
      }

      this.req.file('ground_image').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images')
      },async function (err, files) {
        if (err) {
          sails.log(err);
          return exits.invalid(Response.error(Helper.errorMessage(err)));
        }


        var fileName = require('path').basename(files[0].fd);

        var [err, ground] = await Helper.to(Grounds.create({
          user_id: user.id,
          name: Helper.sanitizeHTML(Helper.html(inputs.name)),
          price: Number(Helper.sanitizeHTML(Helper.html(inputs.price))),
          location: Helper.sanitizeHTML(Helper.html(inputs.location)),
          description: Helper.sanitizeHTML(Helper.html(inputs.description)),
          ground_image: fileName,
          shower: inputs.shower ? true : false,
          changing_room: inputs.changing_room ? true : false,
          locker: inputs.locker ? true : false,
        }));

        if (err) {
          return exits.invalid(Response.error(err));
        }

        return exits.success(Response.success('Ground Added.'));
      });
    } catch (error) {
      sails.log(error);
      return exits.invalid(Response.error(Helper.errorMessage(error)));
    }
  }
};
