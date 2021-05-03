const crypto = require('crypto-js');
const nodemailer = require('nodemailer');

// import User from 'src/reducers/user';
/// requête des users à la bddd
const { findUsers } = require('../dataMappers/passwordResetDataMapper');

module.exports = {
    async createNewPassword (request, response) {
        const { userId } = parseInt(request.params.userId, 10);
        const { email } = request.body;

        if (email === '') {
          response.status(400).send('email required');
        }
        console.error(email);

        const User = await findUsers(userId);

        User.findOne({
          where: {
            email: email,
          },
        }).then((user) => {
          if (user === null) {
            console.error('email not in database');
            response.status(403).send('email not in db');
          }
          else {
            const token = crypto.randomBytes(20).toString('hex');
            user.update({
              resetPasswordToken: token,
              resetPasswordExpires: Date.now() + 3600000,
            });

            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: `${user.email}`,
                pass: `${user.password}`,
              },
            });

            const mailOptions = {
              from: 'o.medocs11@gmail.com',
              to: `${user.email}`,
              subject: 'Connexion à O\'Medocs',
              text:
                'Nous vous avons envoyé cet e-mail pour vous aider à vous connecter à votre compte O\'Medocs.\n\n'
                + 'Si vous n\'avez pas essayé de vous connecter à votre compte ou si vous n\'avez pas demandé cet e-mail, pas de panique.\n\n'
                + 'Votre adresse e-mail a peut-être été entrée par oreur. Vous pouvez simplement ignorer ou supprimer cet e-mail, et utiliser votre mot de passe existant pour vous connecter.\n\n'
                + `http://localhost:3020/reset/${token}\n\n`,
            };
            console.log('sending mail');

            transporter.sendMail(mailOptions, (error, response) => {
              if (error) {
                console.error('there was an error: ', error);
              }
              else {
                console.log('here is the response: ', response);
                response.status(200).json('recovery email sent');
              }
            });
          }
        });
    },
}
