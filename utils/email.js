/*eslint-disable*/
const nodemailer = require('nodemailer');
module.exports = class Email {
    constructor(user, url) {
        // this.to = user.email;
        this.firstname = user.name.split(' ')[0];
        this.url = url;
        this.from = 'tonystark@gmail.com';
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
                user: process.env.Sendin_Email,
                pass: process.env.Sendin_Smtp_Key,
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