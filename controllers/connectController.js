const jsonwebtoken = require('jsonwebtoken');
const argon2 = require('argon2');
const connectDataMapper = require('../dataMappers/connectDataMapper');
const { insertUser } = require('../dataMappers/connectDataMapper');
const jwt = require('express-jwt');



// const authorizationMiddleware = jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ['HS256'] });

// app.get('/recipes', authorizationMiddleware,(req, res) => { /* Du code ici */ };




module.exports = {    

    // Récupérer et renvoyer sous format JSON les informations du nouvel utilisateur qui s'est inscrit
    async register(request, response) {
        // Récupérer les infos du nouvel utilisateur
        const newUser = await insertUser (
            request.body.userType,
            request.body.establishment,
            request.body.rpps,
            request.body.finess,
            request.body.adeli,
            request.body.email, 
            request.body.password,
            request.body.phoneNumer,
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
        // Authentifier l'utilisateur (à faire)
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

        // Je vérifie que le mot de passe haché qui est enregistré dans ma base de données correspond au mot de passe donnée par 
        // l'utilisateur
        if (await argon2.verify(user.password_hash, request.body.password)) {
            // On extrait les données de l'utilisateur qui sont stockés en base de données
            const userData = {
                userType: user.userType,
                establishment: user.establishment, 
                rpps: user.rpps, 
                finess: user.finess,
                adeli: user.adeli, 
                email: user.email, 
                password: user.password,
                phoneNumber: user.phoneNumber,
                address: user.address,
                city: user.city,
                region: user.region,
                zipCode: user.zipCode
            };

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
        }
    },

    // Fonction pour valider le token
    async validateAuthJWT(request, response, next) {
        // On récupère le token dans le header d'autorization
        const token = request.headers.authorization;

        // Si on ne récupère pas le token, on renvoit une erreur du client (400)
        if (! token) {
            response.status(400).json({
                error: {
                    name: "missing-auth-token",
                }
            });
            return;
        }

        try {
            // Vérifier que le token reçu est bien valide
            const userData = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            response.locals.user = await userDataMapper.findUserByEmail(userData.mail);
            next();
        } catch (error) {
            response.status(401).json({
                error: {
                    name: "authentification_error",
                    detail: "bad-credentials"
                }
            });
        }
    },
}; 