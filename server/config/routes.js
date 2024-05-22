/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  /**
   * Users
   */
  'POST /sign-in': { action: 'sign-in' },
  'POST /sign-up': { action: 'sign-up' },
  'GET /verify': { action: 'verify-session' },


  'GET /images/:filename': {
    action: 'serve-image',
    skipAssets: true
  },

  /**
   * Grounds
   */
  'POST /add-ground': { action: 'add-ground' },
  'PUT /edit-ground/:ground_id': { action: 'update-ground' },
  'DELETE /delete-ground/:ground_id': { action: 'delete-ground' },
  'GET /list-grounds': { action: 'list-grounds' },
  'GET /get-ground/:ground_id': { action: 'get-ground' },

  /**
   * Bookings
   */
  'GET /list-bookings': { action: 'list-bookings' },
  'POST /book-ground': { action: 'book-ground' },
  'GET /booking/:booking_id/confirm': { action: 'confirm-booking' },
  'GET /get-booking-slots/:ground_id': { action: 'get-booking-slots' },

  /**
   * Reviews
   */
  'POST /add-review': { action: 'add-review' },
  'GET /list-reviews/:ground_id': { action: 'list-reviews' },
  'GET /get-avg-rating/:ground_id': { action: 'get-avg-rating' },

  /**
   * Transactions
  */
  'GET /payment/:type': { action: 'record-payment' },
  'GET /list-transactions': { action: 'list-transactions' },

  /**
  * Users
  */
  'GET /list-users': { action: 'list-users' },
  'PUT /change-role/:user_id': { action: 'change-role' },


  /**
   * Stats
   */
  'GET /stats-box': { action: 'stats-box' },
  'GET /weekly-bookings': { action: 'weekly-bookings' },
  'GET /weekly-upcoming-bookings': { action: 'weekly-upcoming-bookings' },
  'GET /weekly-sales': { action: 'weekly-sales' },


};
