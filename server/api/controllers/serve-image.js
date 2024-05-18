module.exports = {


  friendlyName: 'Serve image',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    var filename = req.param('filename');
    var path = require('path');
    var fs = require('fs');

    var imagePath = path.resolve(sails.config.appPath, 'assets/images/', filename);

    fs.exists(imagePath, function (exists) {
      if (exists) {
        res.sendFile(imagePath);
      } else {
        return res.notFound();
      }
    });

  }


};
