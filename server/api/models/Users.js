/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

 
  db: function () {
    return Users.getDatastore().manager;
  },
  tb: function () {
    return this.db().collection('users');
  },
  collectionName: "users",
  collectionNameFriendly: "users",
  attributes: {

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
    is_verfied: {
      type: 'boolean',
      required: true
    },
    role_type: {
      type: 'string',
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

