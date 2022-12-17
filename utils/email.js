/*eslint-disable*/
const nodemailer = require('nodemailer');

// module.exports=class Email{
//     constructor(user,url){
//         this.to=user.email;
//         this.firstname
//     }
// }
// module.exports = class Email {
//     constructor(user, url) {
//         // this.to = user.email;
//         this.firstname = user.name.split(' ')[0];
//         this.url = url;
//         this.from = `Abhishek <${process.env.Sendin_Email}>`;
//     }
//     newTransport() {
//         if (process.env.NODE_ENV === 'development') {
//             return nodemailer.createTransport({
//                 host: 'smtp-relay.sendinblue.com',
//                 port: 587,
//                 auth: {
//                     user: process.env.Sendin_Email,
//                     pass: process.env.Sendin_Smtp_Key,
//                 },
//             });
//         }
//         return nodemailer.createTransport({
//             host: 'smtp-relay.sendinblue.com',
//             port: 587,
//             auth: {
//                 user: 'starkop688@gmail.com',
//                 pass: 'xsmtpsib-cbfdd360208d8047f4a203fce76db4f5c23402ab0f468ecc6c74090d0667019e-cACF3nBO2TVj741J',
//             },
//         });
//         // return nodemailer.createTransport({
//         //     // host: process.env.EMAIL_HOST,
//         //     // port: process.env.EMAIL_PORT,
//         //     host: 'smtp-relay.sendinblue.com',
//         //     port: 587,
//         //     auth: {
//         //         user: process.env.Sendin_Email,
//         //         pass: process.env.Sendin_Smtp_Key,
//         //     },
//         // });
//     }
//     async send(subject) {
//         const mailOptions = {
//             from: this.from,
//             // from: 'starkop688@gmail.com',
//             // to: this.to,
//             to: 'burnthehell11@gmail.com',
//             subject,
//             text: 'Hello !!!!!',
//             html: `<p> Hi ${this.firstname}</p>
//             <p> Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}.</p>
//             <button><a href=${this.url}>Click here</a></button>

//             <p> If you didn't forget your password, please ignore this email!</p>`,
//         };
//         await this.newTransport().sendMail(mailOptions);
//     }
//     async sendWelcome() {
//         await this.send('Welcome to the natours family');
//     }
//     async sendPasswordReset() {
//         await this.send('Your password reset token (valid for only 10 minutes)');
//     }
// };

// const sendEmail = async(mailObj) => {
//     const { from, recipients, subject, message } = mailObj;

//     try {
//         // Create a transporter
//         let transporter = nodemailer.createTransport({
//             host: 'smtp-relay.sendinblue.com',
//             port: 587,
//             auth: {
//                 user: 'starkop688@gmail.com',
//                 pass: 'xsmtpsib-cbfdd360208d8047f4a203fce76db4f5c23402ab0f468ecc6c74090d0667019e-cACF3nBO2TVj741J',
//             },
//         });

//         // send mail with defined transport object
//         // let mailStatus = await transporter.sendMail({
//         //     name: "Rajveer",
//         //     from: from, // sender address
//         //     to: recipients, // list of recipients
//         //     subject: subject, // Subject line
//         //     text: message, // plain text
//         //     html: `${data}`,
//         // });

//         // console.log(`Message sent: ${mailStatus.messageId}`);
//         // // return `Message sent: ${mailStatus.messageId}`;
//         // res.render("contact");
//     } catch (error) {
//         console.error(error);
//         throw new Error(
//             `Something went wrong in the sendmail method. Error: ${error.message}`
//         );
//     }
// };
// const mailObj = {
//     from: 'starkop688@gmail.com',

//     recipients: ['burnthehell11@gmail.com'],
//     subject: 'Password Reset',
//     message: 'Hello !',
// };

// sendEmail(mailObj).then((res) => {
//     console.log(res);
// });

// const sendEmail = async(options) => {
//     // 1) Create a transporter
//     const transporter = nodemailer.createTransport({
//         host: 'smtp-relay.sendinblue.com',
//         port: 587,
//         auth: {
//             user: 'starkop688@gmail.com',
//             pass: 'xsmtpsib-cbfdd360208d8047f4a203fce76db4f5c23402ab0f468ecc6c74090d0667019e-cACF3nBO2TVj741J',
//         },
//     });

//     // 2) Define the email options
//     const mailOptions = {
//         from: 'Jonas Schmedtmann <hello@jonas.io>',
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//         // html:
//     };

//     // 3) Actually send the email
//     await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

// const nodemailer = require('nodemailer');

// module.exports=class Email{
//     constructor(user,url){
//         this.to=user.email;
//         this.firstname
//     }
// }
module.exports = class Email {
    constructor(user, url) {
        // this.to = user.email;
        this.firstname = user.name.split(' ')[0];
        this.url = url;
        this.from = 'starkop688@gmail.com';
    }
    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                host: 'smtp-relay.sendinblue.com',
                port: 587,
                auth: {
                    user: process.env.Sendin_Email,
                    pass: process.env.Sendin_Smtp_Key,
                },
            });
        }
        return nodemailer.createTransport({
            // host: process.env.EMAIL_HOST,
            // port: process.env.EMAIL_PORT,
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            auth: {
                user: 'starkop688@gmail.com',
                pass: xsmtpsib -
                    cbfdd360208d8047f4a203fce76db4f5c23402ab0f468ecc6c74090d0667019e -
                    cACF3nBO2TVj741J,
            },
        });
    }
    async send(subject) {
        const mailOptions = {
            from: this.from,
            // from: 'starkop688@gmail.com',
            // to: this.to,
            to: 'burnthehell11@gmail.com',
            subject,
            text: 'Hello !!!!!',
            html: `<p> Hi ${this.firstname}</p>
            <p> Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}.</p>
            <button><a href=${this.url}>Click here</a></button>
            
            <p> If you didn't forget your password, please ignore this email!</p>`,
        };
        await this.newTransport().sendMail(mailOptions);
    }
    async sendWelcome() {
        await this.send('Welcome to the natours family');
    }
    async sendPasswordReset() {
        await this.send('Your password reset token (valid for only 10 minutes)');
    }
};