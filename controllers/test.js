const nodemailer = require('nodemailer');

module.exports = (app) => {
  app.post('/forgotPassword', (req, res) => {
    if (req.body.email === '') {
      res.status(400).send('email required');
    }
    console.error(req.body.email);

    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user === null) {
        console.error('email not in database');
        res.status(403).send('email not in db');
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
            user: `${process.env.EMAIL_ADDRESS}`,
          },
        });

        const mailOptions = {
          from: 'o.medocs11@gmail.com',
          to: `${user.email}`,
          subject: 'Connexion à O\'Medocs',
          text:
            'Nous vous avons envoyé cet e-mail pour vous aider à vous connecter à votre compte O\'Medocs.\n\n'
            + 'Si vous n\'avez pas essayé de vous connecter à votre compte ou si vous n\'avez pas demandé cet e-mail, pas de panique.\n\n'
            + 'Votre adresse e-mail a peut-être été entrée par erreur. Vous pouvez simplement ignorer ou supprimer cet e-mail, et utiliser votre mot de passe existant pour vous connecter.\n\n'
            + `http://localhost:3020/reset/${token}\n\n`,
        };
        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          }
          else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
  });
};