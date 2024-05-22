/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {

  name: '_futsal',

  /***************************************************************************
  *                                                                          *
  * Session secret is automatically generated when your new app is created   *
  * Replace at your own risk in production-- you will invalidate the cookies *
  * of your users, forcing them to log in again.                             *
  *                                                                          *
  ***************************************************************************/
  secret: '33dcf061f74b9fc3253c3663eca8931d',


  /***************************************************************************
  *                                                                          *
  * Customize when built-in session support will be skipped.                 *
  *                                                                          *
  * (Useful for performance tuning; particularly to avoid wasting cycles on  *
  * session management when responding to simple requests for static assets, *
  * like images or stylesheets.)                                             *
  *                                                                          *
  * https://sailsjs.com/config/session                                       *
  *                                                                          *
  ***************************************************************************/
  // isSessionDisabled: function (req){
  //   return !!req.path.match(req._sails.LOOKS_LIKE_ASSET_RX);
  // },

  // adapter: 'mongo',
  // url: 'mongodb+srv://new:QaoXaxCT1x935sxe@futsalcluster.wec2rsr.mongodb.net/fgfdg?retryWrites=true&w=majority&appName=FutsalCluster',
  // url: 'mongodb+srv://new:QaoXaxCT1x935sxe@futsalcluster.wec2rsr.mongodb.net/futsal?retryWrites=true&w=majority&appName=FutsalCluster',
  // database:"futsal",
  // host: "futsalcluster.wec2rsr.mongodb",
  // pass: "QaoXaxCT1x935sxe",
  // port: 27017,
  // db: "futsal",
  // collection: 'sessions',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    // secure: true,
    // sameSite: 'none'
  },

  saveUninitialized: false,
  resave: true
};
