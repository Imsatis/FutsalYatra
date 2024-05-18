/**
 * Transactions.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  db: function () {
    return Transactions.getDatastore().manager;
  },
  tb: function () {
    return this.db().collection('transactions');
  },
  collectionName: "transactions",
  collectionNameFriendly: "transactions",
  attributes: {
    amount: {
      type: 'number',
      required: true
    },
    status: {
      type: 'string',
      required: true
    },
    user_id: {
      type: 'string',
      required: true
    },
    booking_id: {
      type: 'string',
      required: true
    },
    ground_id: {
      type: 'string',
      required: true
    },
    data: {
      type: 'ref'
    }
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

