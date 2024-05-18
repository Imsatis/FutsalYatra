/**
 * Bookings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { start } = require("repl");

module.exports = {

  db: function () {
    return Bookings.getDatastore().manager;
  },
  tb: function () {
    return this.db().collection('bookings');
  },
  collectionName: "bookings",
  collectionNameFriendly: "bookings",
  attributes: {
    user_id: {
      type: 'string',
      required: true
    },
    start_time: {
      type: 'ref',
      required: true
    },
    end_time: {
      type: 'ref',
      required: true
    },
    ground_id: {
      type: 'string',
      required: true
    },
    status: {
      type: 'string'
    },
  },

  /**
   * Before inserting in table
   */
  beforeCreate: function (valuesToSet, proceed) {
    if (Helper.hasProp(valuesToSet, 'createdAt')) {
      valuesToSet.createdAt = new Date(valuesToSet.createdAt);
    }
    if (Helper.hasProp(valuesToSet, 'updatedAt')) {
      valuesToSet.updatedAt = new Date(valuesToSet.updatedAt);
    }
    if (Helper.hasProp(valuesToSet, 'start_time')) {
      valuesToSet.start_time = new Date(valuesToSet.start_time);
    }
    if (Helper.hasProp(valuesToSet, 'end_time')) {
      valuesToSet.end_time = new Date(valuesToSet.end_time);
    }
    return proceed();
  },

  /**
   * Before updating in table
   */
  beforeUpdate: function (valuesToSet, proceed) {
    if (Helper.hasProp(valuesToSet, 'createdAt')) {
      valuesToSet.createdAt = new Date(valuesToSet.createdAt);
    }
    if (Helper.hasProp(valuesToSet, 'updatedAt')) {
      valuesToSet.updatedAt = new Date(valuesToSet.updatedAt);
    }
    if (Helper.hasProp(valuesToSet, 'start_time')) {
      valuesToSet.start_time = new Date(valuesToSet.start_time);
    }
    if (Helper.hasProp(valuesToSet, 'end_time')) {
      valuesToSet.end_time = new Date(valuesToSet.end_time);
    }
    return proceed();
  },

};

