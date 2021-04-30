// On récupère le package 'jsonwebtoken' qui permet d'implémenter les JSON Web Tokens pour envoyer des infos qui peuvent
// être vérifiées grâce à une signature digitale faite côté serveur
const jsonwebtoken = require('jsonwebtoken');
// On importe les fonctions du fichier connectDataMapper
const { insertUser, findUserByEmail } = require('../dataMappers/connectDataMapper');
// On récupère la librairie bcrypt qui permet de hasher les mots de passe
const bcrypt = require('bcrypt');

// On export nos fonctions
module.exports = {    
    // Récupère et renvoit sous format JSON les informations du nouvel utilisateur qui s'est inscrit
    async signup (request, response, next) {
        try {
            // Hash le mot de passe
            const hashedPassword = await bcrypt.hash(request.body.password, 10);

            // Récupère les infos du nouvel utilisateur
            const newUser = await insertUser (
                request.body.user_type,
                request.body.establishment,
                request.body.rpps,
                request.body.finess,
                request.body.adeli,
                request.body.email, 
                hashedPassword,
                request.body.phone_number,
                request.body.address,
                request.body.city, 
                request.body.region,
                request.body.zip_code
            );

            // Si on ne récupère pas de nouvel utilisateur, on renvoit une erreur indiquant que le serveur n'a pas trouvé 
            // la requête demandée (404)
            if (!newUser) {
                next();
                
            } else {
                // Envoit une réponse avec un statut de succès
                response.status(201).json({ newUser });
            }
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    },

    // Lorsqu'un utilisateur essaye de se connecter, on vérifie que les données entrées sont valides
    async login (request, response, next) {
        try {            
            // Voir dans ma base de données si j'ai un utilisateur avec cet email
            const user = await findUserByEmail(request.body.emailConnexion);
        
            // Si aucun utilisateur a cet email, on renvoit une erreur d'authentification (401)
            if (!user) {
                response.status(401).json({
                    error: {
                        name: "authentification_error",
                        detail: "bad-credentials"
                    }
                });
                return;

            // Sinon, je vérifie que le mot de passe haché qui est enregistré dans ma base de données correspond au mot de passe donnée 
            // par l'utilisateur
            } else if (await bcrypt.compare(request.body.passwordConnexion, user.password)) {
                // On extrait les données de l'utilisateur qui sont stockés en base de données
                const userData = {
                    user
                };

                // Génère un token qui dure 30 minutes
                const accessToken = jsonwebtoken.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m',  algorithm: 'HS256' });

                // Renvoit notre token avec les infos de l'utilisateur au front
                response.status(200).json({ 
                    status: "success",
                    user, 
                    accessToken
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
        // S'il y a une erreur au niveau du serveur, on renvoit le statut d'erreur 500
        } catch (error) {
            next(error);
        }
    }, 
}; 