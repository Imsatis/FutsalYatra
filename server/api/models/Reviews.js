/**
 * Reviews.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  db: function () {
    return Reviews.getDatastore().manager;
  },
  tb: function () {
    return this.db().collection('reviews');
  },
  collectionName: "reviews",
  collectionNameFriendly: "reviews",
  attributes: {
    user_id: {
      type: 'string',
      required: true
    },
    ground_id: {
      type: 'string',
      required: true
    },
    review: {
      type: 'string',
      required: true
    },
    rating: {
      type: 'number',
      required: true
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

