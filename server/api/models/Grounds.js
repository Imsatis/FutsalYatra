/**
 * Grounds.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  db: function () {
    return Grounds.getDatastore().manager;
  },
  tb: function () {
    return this.db().collection('grounds');
  },
  collectionName: "grounds",
  collectionNameFriendly: "grounds",
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    location: {
      type: 'string',
      required: true
    },
    price: {
      type: 'number',
      required: true
    },
    ground_image: {
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
    return proceed();
  },


};

