const jsonwebtoken = require('jsonwebtoken');
const connectDataMapper = require('../dataMappers/connectDataMapper');
const { insertUser } = require('../dataMappers/connectDataMapper');
const bcrypt = require('bcrypt');

module.exports = {    

    // Récupérer et renvoyer sous format JSON les informations du nouvel utilisateur qui s'est inscrit
    async signup (request, response) {
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        // Récupérer les infos du nouvel utilisateur
        const newUser = await insertUser (
            request.body.userType,
            request.body.establishment,
            request.body.rpps,
            request.body.finess,
            request.body.adeli,
            request.body.email, 
            hashedPassword,
            request.body.phoneNumber,
            request.body.address,
            request.body.city, 
            request.body.region,
            request.body.zipCode
        );

        if (!newUser) {
            response.status(400).json({
                error: {
                    message: "newUser_impossible"
                }
            });
            return;
        }

        // Envoyer les infos de l'utilisateur en format JSON avec un status de succès
        response.status(201).json({ data: newUser });
    },


    // Se connecter
    async login (request, response) {
        // Voir dans ma base de données si j'ai un utilisateur avec cet email
        const user = await connectDataMapper.findUserByEmail(request.body.email);

        // Si aucun utilisateur a cet email, on renvoit une erreur d'authentification (401)
        if (! user) {
            response.status(401).json({
                error: {
                    name: "authentification_error",
                    detail: "bad-credentials"
                }
            });
            return;
        };

        console.log(request.body.password);
        console.log(user[0]);
        console.log(user[0].password);

        // Je vérifie que le mot de passe haché qui est enregistré dans ma base de données correspond au mot de passe donnée par 
        // l'utilisateur
        if (await bcrypt.compare(request.body.password, user[0].password)) {
            console.log('good');

            // On extrait les données de l'utilisateur qui sont stockés en base de données
            const userData = {
                user
                // userType: user[0].userType,
                // establishment: user[0].establishment, 
                //rpps: user[0].rpps, 
                //finess: user[0].finess,
                //adeli: user[0].adeli, 
                //email: user[0].email, 
                //password: user[0].password,
                //phoneNumber: user[0].phoneNumber,
                //address: user[0].address,
                //city: user[0].city,
                //region: user[0].region,
                //zipCode: user[0].zipCode
            };

            console.log(userData);

            // Générer un token
            const token = jsonwebtoken.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m',  algorithm: 'HS256' });

            // Renvoyer notre token avec les infos de l'utilisateur au front
            response.status(200).json({ 
                status: "success",
                user: userData, 
                token
            });
        // Si le mote de passe est incorrect, on renvoit une erreur d'authentification (401)
        } else {
            response.status(401).json({
                error: {
                    name: "authentification_error",
                    detail: "bad-credentials"
                }
            });
        };
    },
}; 