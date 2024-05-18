const nodemailer = require('nodemailer');

module.exports = {
    sendEmail: async function (to, subject, body) {
        try {
            smtpconfig = {
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: "satishthapa00@gmail.com",
                    pass: "tcyz vxwp uksf casj"
                },
                secure: false,
                tls: {
                    rejectUnauthorized: false
                }
            };

            let transporter = nodemailer.createTransport(smtpconfig);

            // setup email data with unicode symbols
            let mailOptions = {
                from: "Satish Thapa <satishthapa00@gmail.com>", // sender address
                bcc: [],
                to: to, // list of receivers
                subject: subject, // Subject line
                replyTo: "satishthapa00@gmail.com",
                html: body // html body
            };

            var [error, mail] = await Helper.to(transporter.sendMail(mailOptions));

            if (error) {
                throw error;
            }

            sails.log(`${subject} email sent to ${to}`);
            return true;
        } catch (error) {
            throw error
        }
    },

    /* Call email template
    * @type template file name
    * @callback callback function
    * @params If need to pass custom attributes to template
    */
    ETemplate: async function (type, callback, params = {}) {
        try {
            var EmailTemplate = require('email-templates');
            const ETemplate = new EmailTemplate({
                views: {
                    options: {
                        extension: 'ejs' // <---- HERE
                    }
                }
            });

            var pathPrefix = "./";

            let message = await ETemplate.render(pathPrefix + type, params);
            return message;
        } catch (error) {
            sails.log(error);
            throw error
        }
    },

    groundBooking: async function (groundOwner, player, ground, booking, type) {
        try {

            const templateType = type === "owner" ? "booking_confirmation_owner" : "booking_confirmation_player";

            var [error, body] = await Helper.to(this.ETemplate(templateType));

            if (error) {
                throw error;
            }

            if (!body) {
                throw "Email template not found.";
            }

            let replace_key = new RegExp('{{OwnerName}}', 'g')
            body = body.replace(replace_key, groundOwner.name);

            replace_key = new RegExp('{{PlayerName}}', 'g')
            body = body.replace(replace_key, player.name);

            replace_key = new RegExp('{{GroundName}}', 'g')
            body = body.replace(replace_key, ground.name);

            replace_key = new RegExp('{{StartTime}}', 'g')
            body = body.replace(replace_key, Helper._timeZone(booking.start_time));

            replace_key = new RegExp('{{EndTime}}', 'g')
            body = body.replace(replace_key, Helper._timeZone(booking.end_time));


            let TeamName = "Futsal Yatra";
            let Address = "Pokhra, Nepal"
            if (type === "player") {
                TeamName = groundOwner.name;
                Address = ground.location;
            }

            replace_key = new RegExp('{{TeamName}}', 'g')
            body = body.replace(replace_key, TeamName);

            replace_key = new RegExp('{{AddressInline}}', 'g')
            body = body.replace(replace_key, Address);

            if (type === "owner") {
                let confirmLink = Helper.baseUrlApi() + `/booking/${Helper.encrypt(booking.id)}/confirm`;
                replace_key = new RegExp('{{ConfirmBookingLink}}', 'g')
                body = body.replace(replace_key, confirmLink);
            }

            let to = type === "owner" ? groundOwner.email : player.email;

            var [error, mail] = await Helper.to(this.sendEmail(to, "Booking Confirmation!", body));
            return;
        } catch (error) {
            sails.log(error);
            throw error;
        }
    }
}