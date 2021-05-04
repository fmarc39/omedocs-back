/* ! Pas encore utilisé */

// On récupère le package 'jsonwebtoken' qui permet d'implémenter les JSON Web Tokens pour envoyer des infos qui peuvent
// être vérifiées grâce à une signature digitale faite côté serveur
const jsonwebtoken = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// import User from 'src/reducers/user';
/// requête des users à la bddd
const { findUser } = require('../dataMappers/passwordResetDataMapper');

module.exports = {
    async createNewPassword (request, response) {
        const { email } = request.body;

        if (email === '') {
            response.status(400).send('email required');
        };
        console.error(email);

        const user = await findUser(email);
        console.log('user: ', user);
        
        if (user === null) {
            console.error('email not in database');
            response.status(403).send('email not in db');
        
        } else {
            // On extrait les données de l'utilisateur qui sont stockés en base de données
            const userData = {
                user
            };
            
            // Génère un token qui dure 30 minutes
            const accessToken = jsonwebtoken.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m',  algorithm: 'HS256' });

            console.log('email: ', user.email);
            console.log('password: ', user.password);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${user.email}`,
                    pass: `${user.password}`
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
                    + `http://localhost:3020/reset/${accessToken}\n\n`,
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
    },
}
