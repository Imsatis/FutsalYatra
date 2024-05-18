const xssFilters = require('xss-filters');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const crypto = require('crypto');
const moment = require('moment-timezone');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    baseUrlClient: function (req) {
        return "http://localhost:3000";
    },

    baseUrlApi: function () {
        return "http://localhost:1337";
    },

    to: function (promise) {
        return promise.then(data => {
            return [null, data];
        }).catch(err => [err]);
    },

    sanitizeHTML: function (str) {
        if (!str) return str;

        return str.replace(/[^\w. \/:?&#-=*()\[\]+]/gi, function (c) {
            return '&#' + c.charCodeAt(0) + ';';
        });
    },

    html: function (input) {
        if (input) {
            return xssFilters.inHTMLData(input);
        }
        return "";
    },

    removeUrls: function (str) {
        // Regular expression to match URLs
        var urlPattern = /\b(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

        // Replace URLs with an empty string
        return str.replace(urlPattern, '');
    },

    hashPassword: async function (password) {
        try {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);
            // Hash the password with the salt
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            throw new Error('Error hashing password');
        }
    },

    comparePasswords: async function (inputPassword, hashedPassword) {
        try {
            // Compare the input password with the hashed password
            const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
            return isMatch;
        } catch (error) {
            throw new Error('Error comparing passwords');
        }
    },

    hasProp: function (obj, prop) {
        if (_.has(obj, prop)) {
            return true;
        }
        return false;
    },

    errorMessage: function (err) {
        if (err instanceof Error) {
            if (Helper.hasProp(err, 'response')) {
                if (Helper.hasProp(err.response, 'data')) {
                    if (Helper.hasProp(err.response.data, 'message')) {
                        return err.response.data.message;
                    }
                }
            }
            return err.message;
        }
        if (Helper.hasProp(err, 'message')) {
            return err.message;
        }
        return err;
    },

    encrypt: function (text) {
        let iv = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer.from("3kfhdu3p67VC61jmV54rIYu154sjahfk"), iv);
        let encrypted = cipher.update(text);

        encrypted = Buffer.concat([
            encrypted, cipher.final()
        ]);

        return iv.toString('hex') + ':' + encrypted.toString('hex');
    },

    decrypt: function (text) {
        let textParts = text.split(':');
        let iv = new Buffer.from(textParts.shift(), 'hex');
        let encryptedText = new Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer.from("3kfhdu3p67VC61jmV54rIYu154sjahfk"), iv);
        let decrypted = decipher.update(encryptedText);

        decrypted = Buffer.concat([
            decrypted, decipher.final()
        ]);

        return decrypted.toString();
    },

    sessionAuth: function (req) {
        return new Promise(async (resolve, reject) => {
            if (typeof req.session.user !== 'undefined') {
                var json_type = req.is('json');
                var multi_part = req.is('multipart/form-data');
                if (!multi_part) {
                    if ((req.method == 'POST' || req.method == 'DELETE' || req.method == 'PUT') && !json_type) {
                        return reject('Access denied');
                    }
                }

                var decryptedSession = JSON.parse(this.decrypt(req.session.user));
                return resolve(decryptedSession);
            } else {
                return reject('Session expired please login again.');
            }
        });
    },


    /**
     * Get date with timezone
     * @param {*} endDate 
     */
    _timeZone: function (date, timezone = "Asia/Kathmandu", format = null) {

        if (!format) {
            format = "MMMM DD, YYYY h:mm A";
        }

        return moment.tz(date, timezone).format(format);
    },

    /**
     * Returns mongodb object id
     */
    objectId: function (id) {
        return new ObjectId(id);
    },

    /**
     * Get the array of valuse
     * It can return dynamic values with toObject.
     * @param {*} documents 
     */

    getArrayOfValues: async function (document, key, toObject = false) {

        return document.map(data => {

            if (key == "_id" && !toObject) {
                return data[key].toString();
            }

            if (toObject) {
                return this.objectId(data[key]);
            }

            return data[key];
        });
    },
}